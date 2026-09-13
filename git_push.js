const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);

async function pushToGitHub() {
  const token = process.argv[2] || process.env.GITHUB_TOKEN || '';
  if (!token) {
    console.error('Please provide your GitHub token: node git_push.js <GITHUB_TOKEN>');
    process.exit(1);
  }

  try {
    const branchToPush = (await git.currentBranch({ fs, dir, fullname: false })) || 'main';
    console.log('Pushing branch:', branchToPush);

    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: branchToPush,
      remoteRef: 'main',
      force: true,
      onAuth: () => ({ username: token })
    });

    console.log('Push completed successfully!', pushResult.ok ? 'Status: OK' : '');
  } catch (err) {
    console.error('Push error:', err);
  }
}

pushToGitHub();
