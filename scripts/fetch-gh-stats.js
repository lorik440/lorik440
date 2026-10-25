#!/usr/bin/env node
/**
 * fetch-gh-stats.js
 * Fetches public GitHub stats for the profile user and writes data/gh-stats.json
 * ({publicRepos, followers, following, joined, stars, languages}).
 *
 * Run by .github/workflows/build-daily.yml (daily). Uses GITHUB_TOKEN if present
 * for a higher rate limit; works unauthenticated on public data.
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
        if (res.statusCode >= 400) { reject(new Error(`${res.statusCode} from ${url}`)); return; }
        try { resolve(JSON.parse(body)); }
        catch { reject(new Error('JSON parse failed: ' + body.slice(0, 120))); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const user  = await httpsGet(`https://api.github.com/users/${username}`);
  const repos = await httpsGet(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

  // language bytes across non-fork repos
  const langBytes = {};
  for (const repo of repos.filter(r => !r.fork)) {
    if (repo.language) langBytes[repo.language] = (langBytes[repo.language] || 0) + (repo.size || 1);
  }
  const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langBytes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([lang, bytes]) => ({ name: lang, pct: Math.round((bytes / totalBytes) * 100) }));

  const stars = repos.filter(r => !r.fork).reduce((s, r) => s + (r.stargazers_count || 0), 0);

  const stats = {
    publicRepos: user.public_repos,
    followers:   user.followers,
    following:   user.following,
    joined:      (user.created_at || '').slice(0, 7).replace('-', '.'),
    stars,
    languages,
  };

  const out = path.join(__dirname, '..', 'data', 'gh-stats.json');
  fs.writeFileSync(out, JSON.stringify(stats, null, 2) + '\n', 'utf8');
  console.log('Wrote', out);
  console.log(JSON.stringify(stats, null, 2));
}

main().catch(e => { console.error('fetch-gh-stats failed:', e.message); process.exit(1); });
