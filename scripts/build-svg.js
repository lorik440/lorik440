#!/usr/bin/env node
/**
 * build-svg.js
 * Reads data/ files + about.txt and writes lorik-os.svg.
 *
 * No live API calls happen here. The dynamic data (commits.json, gh-stats.json)
 * is kept fresh on separate schedules by scripts/fetch-gitlog.js and
 * scripts/fetch-gh-stats.js, run from .github/workflows/. This script only
 * renders, so it is fast and never hits the network.
 *
 * Usage:
 *   node scripts/build-svg.js
 */

const fs   = require('fs');
const path = require('path');

// ── helpers ──────────────────────────────────────────────────────────────────

function readJSON(rel) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', rel), 'utf8'));
}

function readText(rel) {
  return fs.readFileSync(path.join(__dirname, '..', rel), 'utf8').trim();
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// pad a string to a fixed display length using spaces
function pad(str, len) {
  const s = String(str);
  return s + ' '.repeat(Math.max(0, len - s.length));
}

// ── SVG builder ───────────────────────────────────────────────────────────────

function buildSVG({ identity, projects, skills, aboutLines, gh }) {
  const C = {
    bg:      '#030806',
    bg2:     '#07120D',
    prompt:  '#3AA374',
    cmd:     '#8EFFC6',
    green1:  '#27FF9C',
    green2:  '#4FDC91',
    green3:  '#6DEBAA',
    text:    '#C8FFE0',
    dim:     '#1a4a2e',
    divider: '#0d2a1a',
  };

  // lang bar colours in order
  const barColors = [C.green1, C.green2, C.green3, '#3AA374'];

  let y = 44; // current y cursor
  const LH = 22; // line height

  function prompt(cmd) {
    const out = `  <text x="28" y="${y}" font-size="13" fill="${C.prompt}">lorik@lorik-os:~$  <tspan fill="${C.cmd}">${esc(cmd)}</tspan></text>\n`;
    y += LH;
    return out;
  }

  function line(text, color = C.text, indent = 28) {
    const out = `  <text x="${indent}" y="${y}" font-size="13" fill="${color}">${text}</text>\n`;
    y += LH;
    return out;
  }

  function gap(px = 14) { y += px; return ''; }

  function divider(label) {
    const out =
      `  <line x1="0" y1="${y}" x2="900" y2="${y}" stroke="${C.divider}" stroke-width="1"/>\n` +
      `  <text x="28" y="${y + 18}" font-size="11" fill="${C.dim}" letter-spacing="2">// ${esc(label)} ${'─'.repeat(90)}</text>\n` +
      `  <line x1="0" y1="${y + 26}" x2="900" y2="${y + 26}" stroke="${C.divider}" stroke-width="1"/>\n`;
    y += 36;
    return out;
  }

  let svg = '';

  // ── whoami ──
  gap(0);
  svg += prompt('whoami');
  svg += `  <text x="28" y="${y}" font-size="15" font-weight="700" fill="${C.green1}">${esc(identity.name)}</text>\n`;
  y += 26;
  svg += line(esc(identity.tagline), C.green3);
  gap();

  // ── ls projects/ ──
  gap();
  svg += prompt('ls projects/');
  for (const p of projects) {
    const name = pad(p.name, 15);
    const lang = pad(p.lang, 6);
    svg += `  <text x="28" y="${y}" font-size="13" fill="${C.cmd}">${esc(name)}<tspan fill="${C.green3}">${esc(lang)}</tspan><tspan fill="${C.text}">${esc(p.desc)}</tspan></text>\n`;
    y += LH;
  }
  gap();

  // ── cat about.txt ──
  gap();
  svg += prompt('cat about.txt');
  const aboutColors = [C.text, C.text, C.green3];
  aboutLines.forEach((l, i) => {
    svg += line(esc(l), aboutColors[i] || C.text);
  });
  gap();

  // ── cat skills.txt ──
  gap();
  svg += prompt('cat skills.txt');
  for (const [cat, items] of Object.entries(skills)) {
    const key = pad(cat, 11);
    svg += `  <text x="28" y="${y}" font-size="13" fill="${C.green3}">${esc(key)}<tspan fill="${C.text}">${esc(items.join('  '))}</tspan></text>\n`;
    y += LH;
  }
  gap();

  // ── git log ──
  gap();
  svg += prompt(`git log --oneline -${gh.recentPushes.length}`);
  for (const c of gh.recentPushes) {
    svg += `  <text x="28" y="${y}" font-size="13" fill="${C.green3}">${esc(c.hash)}  <tspan fill="${C.text}">${esc(c.repo.toLowerCase())}: ${esc(c.message)}</tspan></text>\n`;
    y += LH;
  }
  gap();

  // ── live prompt + blink ──
  gap();
  svg += `  <text x="28" y="${y}" font-size="13" fill="${C.prompt}">lorik@lorik-os:~$</text>\n`;
  svg += `  <rect x="198" y="${y - 14}" width="9" height="15" fill="${C.green1}">\n`;
  svg += `    <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>\n`;
  svg += `  </rect>\n`;
  y += 30;

  // ── stats divider ──
  gap(10);
  svg += divider('system.stats');
  gap(10);

  // ── stats — left col ──
  const statsTop = y;
  svg += `  <text x="28" y="${y}" font-size="11" fill="${C.prompt}" letter-spacing="1">GITHUB STATS</text>\n`;
  y += 24;

  const statsRows = [
    ['repos',        gh.publicRepos],
    ['stars',        gh.stars],
    ['followers',    gh.followers],
    ['following',    gh.following],
    ['member since', gh.joined],
    ['status',       null],
  ];
  for (const [label, val] of statsRows) {
    const lpad = pad(label, 13);
    if (val === null) {
      svg += `  <text x="28" y="${y}" font-size="13" fill="${C.green3}">${esc(lpad)}<tspan fill="${C.green1}">●</tspan><tspan fill="${C.text}"> online</tspan></text>\n`;
    } else {
      svg += `  <text x="28" y="${y}" font-size="13" fill="${C.green3}">${esc(lpad)}<tspan fill="${C.text}">${esc(val)}</tspan></text>\n`;
    }
    y += LH;
  }

  const statsBot = y;

  // ── vertical separator ──
  svg += `  <line x1="320" y1="${statsTop - 10}" x2="320" y2="${statsBot + 20}" stroke="${C.divider}" stroke-width="1"/>\n`;

  // ── stats — right col (language bars) ──
  y = statsTop;
  svg += `  <text x="348" y="${y}" font-size="11" fill="${C.prompt}" letter-spacing="1">TOP LANGUAGES</text>\n`;
  y += 24;

  const barW = 504;
  for (let i = 0; i < gh.languages.length; i++) {
    const lang = gh.languages[i];
    const fill = barColors[i % barColors.length];
    const fillW = Math.round((lang.pct / 100) * barW);
    const namepad = pad(lang.name, 14);
    svg += `  <text x="348" y="${y}" font-size="12" fill="${C.green3}">${esc(namepad)}<tspan fill="${C.text}">${esc(lang.pct)}%</tspan></text>\n`;
    y += 16;
    svg += `  <rect x="348" y="${y}" width="${barW}" height="10" rx="3" fill="${C.bg2}"/>\n`;
    svg += `  <rect x="348" y="${y}" width="${fillW}" height="10" rx="3" fill="${fill}"/>\n`;
    y += 22;
  }

  y = Math.max(y, statsBot) + 20;

  // ── streak divider ──
  gap(10);
  svg += divider('system.streak');
  gap(10);

  // ── streak counters ──
  const cols = [
    { label: 'REPOS',     value: gh.publicRepos, unit: 'public',    color: C.green1, x: 150 },
    { label: 'STARS',     value: gh.stars,       unit: 'total',     color: C.green2, x: 450 },
    { label: 'FOLLOWERS', value: gh.followers,   unit: 'following', color: C.cmd,    x: 750 },
  ];

  for (let i = 0; i < cols.length; i++) {
    const c = cols[i];
    svg += `  <text x="${c.x}" y="${y}" font-size="11" fill="${C.green3}" text-anchor="middle" letter-spacing="1">${esc(c.label)}</text>\n`;
    svg += `  <text x="${c.x}" y="${y + 34}" font-size="32" font-weight="700" fill="${c.color}" text-anchor="middle">${esc(c.value)}</text>\n`;
    svg += `  <text x="${c.x}" y="${y + 52}" font-size="11" fill="${C.prompt}" text-anchor="middle">${esc(c.unit)}</text>\n`;
    if (i < cols.length - 1) {
      svg += `  <line x1="${c.x + 150}" y1="${y - 10}" x2="${c.x + 150}" y2="${y + 62}" stroke="${C.divider}" stroke-width="1"/>\n`;
    }
  }

  y += 72;

  // ── assemble full SVG ──
  const height = y + 20;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 900 ${height}" width="900" height="${height}"
     role="img" aria-label="lorik440 — terminal profile">
  <title>lorik440</title>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&amp;display=swap');
      text { font-family: 'JetBrains Mono','Cascadia Code','Fira Code',ui-monospace,Menlo,monospace; }
    </style>
  </defs>
  <rect width="900" height="${height}" fill="${C.bg}"/>
${svg}</svg>
`;
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const identity = readJSON('data/identity.json');
  const projects = readJSON('data/projects.json');
  const skills   = readJSON('data/skills.json');
  const about    = readText('about.txt').split('\n').filter(l => l.trim()).slice(0, 4);

  // Dynamic data, kept fresh by the scheduled workflows — no live API here.
  // Missing files fall back to empty/zero so a first run never crashes.
  let ghStats = {};
  try { ghStats = readJSON('data/gh-stats.json'); } catch {}
  let commits = [];
  try { commits = readJSON('data/commits.json') || []; } catch {}

  const gh = {
    publicRepos:  ghStats.publicRepos ?? 0,
    followers:    ghStats.followers   ?? 0,
    following:    ghStats.following   ?? 0,
    joined:       ghStats.joined      ?? '',
    stars:        ghStats.stars       ?? 0,
    languages:    Array.isArray(ghStats.languages) ? ghStats.languages : [],
    recentPushes: commits.slice(0, 5),
  };

  const svg = buildSVG({ identity, projects, skills, aboutLines: about, gh });
  const out = path.join(__dirname, '..', 'lorik-os.svg');
  fs.writeFileSync(out, svg, 'utf8');
  console.log('Written:', out, `(${svg.length} bytes)`);
}

main().catch(e => { console.error(e); process.exit(1); });
