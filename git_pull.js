const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);

async function pullFromGitHub() {
  try {
    console.log('Fetching latest changes from origin/main...');
    await git.fetch({
      fs,
      http,
      dir,
      url: 'https://github.com/naimtv90-art/DPO.git',
      ref: 'main',
      singleBranch: true,
      depth: 20
    });

    const remoteOid = await git.resolveRef({ fs, dir, ref: 'refs/remotes/origin/main' });
    console.log('Latest Remote Commit:', remoteOid);

    await git.writeRef({
      fs,
      dir,
      ref: 'refs/heads/main',
      value: remoteOid,
      force: true
    });

    await git.checkout({
      fs,
      dir,
      ref: 'main',
      force: true
    });

    console.log('Successfully pulled and updated all files to the latest version on main branch!');
  } catch (err) {
    console.error('Pull error:', err);
  }
}

pullFromGitHub();
