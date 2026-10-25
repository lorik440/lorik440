#!/usr/bin/env node
/**
 * fetch-gitlog.js
 * Fetches the latest commit from the user's most recently pushed non-fork repos
 * and writes data/commits.json (array of {repo, message, hash}).
 *
 * Run by .github/workflows/build-gitlog.yml every 5 min. Uses GITHUB_TOKEN if
 * present for a higher rate limit; works unauthenticated on public data.
 */
const fs   = require('fs');
const path = require('path');
const https = require('https');

const identity = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'identity.json'), 'utf8'));
const username = identity.username || 'lorik440';
const token = process.env.GITHUB_TOKEN || '';

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const headers = { 'User-Agent': 'lorik440-profile' };
    if (token) headers.Authorization = `Bearer ${token}`;
    https.get(url, { headers }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode === 404) { reject(new Error('404')); return; }
        if (res.statusCode >= 400) { reject(new Error(`${res.statusCode} from ${url}`)); return; }
        try { resolve(JSON.parse(body)); }
        catch { reject(new Error('JSON parse failed: ' + body.slice(0, 120))); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const repos = await httpsGet(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

  const top = repos
    .filter(r => !r.fork && r.pushed_at && r.name !== username)
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 5);

  const recent = [];
  for (const r of top) {
    try {
      const commits = await httpsGet(`https://api.github.com/repos/${username}/${r.name}/commits?per_page=1`);
      const c = Array.isArray(commits) && commits[0];
      if (c) {
        recent.push({
          repo:    r.name,
          message: (c.commit.message.split('\n')[0] || '').slice(0, 52),
          hash:    (c.sha || '').slice(0, 7),
        });
        continue;
      }
    } catch {}
    // fallback if the per-repo commits call fails
    recent.push({
      repo:    r.name,
      message: `update ${r.name.toLowerCase()}`,
      hash:    (r.pushed_at || '').slice(2, 4) + (r.pushed_at || '').slice(5, 7) + (r.pushed_at || '').slice(8, 10) + 'a',
    });
  }

  const out = path.join(__dirname, '..', 'data', 'commits.json');
  fs.writeFileSync(out, JSON.stringify(recent, null, 2) + '\n', 'utf8');
  console.log('Wrote', out);
  console.log(JSON.stringify(recent, null, 2));
}

main().catch(e => { console.error('fetch-gitlog failed:', e.message); process.exit(1); });
