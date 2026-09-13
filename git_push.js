const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);

async function commitAll(token) {
  try {
    console.log('Initializing repository...');
    await git.init({ fs, dir });

    console.log('Listing files...');
    const filesToStage = [];
    
    function scanDir(currentPath, relPath = '') {
      const items = fs.readdirSync(currentPath);
      for (const item of items) {
        if (item === 'node_modules' || item === '.git' || item === '.user_uploaded' || item.endsWith('.log')) continue;
        const fullPath = path.join(currentPath, item);
        const rel = relPath ? `${relPath}/${item}` : item;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanDir(fullPath, rel);
        } else {
          filesToStage.push(rel);
        }
      }
    }

    scanDir(dir);
    console.log(`Adding ${filesToStage.length} files...`);

    for (const file of filesToStage) {
      await git.add({ fs, dir, filepath: file });
    }

    console.log('Committing changes...');
    const sha = await git.commit({
      fs,
      dir,
      message: 'Update DPO website: Add 3D dynamic animations, Dark/Light mode, Node.js API, AngularJS CMS, and 500ml milk packet product',
      author: {
        name: 'naimtv90-art',
        email: 'naimtv90@gmail.com'
      }
    });

    console.log('Committed with SHA:', sha);

    // Set remote
    try {
      await git.addRemote({
        fs,
        dir,
        remote: 'origin',
        url: 'https://github.com/naimtv90-art/DPO.git',
        force: true
      });
    } catch (e) {
      // Remote might exist
    }

    if (token) {
      console.log('Pushing to GitHub...');
      const pushResult = await git.push({
        fs,
        http,
        dir,
        remote: 'origin',
        ref: 'main',
        force: true,
        onAuth: () => ({ username: token })
      });
      console.log('Push result:', pushResult);
      return { success: true, sha, pushed: true };
    } else {
      console.log('No token provided yet. Commit succeeded locally.');
      return { success: true, sha, pushed: false };
    }
  } catch (err) {
    console.error('Git error:', err);
    return { success: false, error: err.message };
  }
}

const tokenArg = process.argv[2] || process.env.GITHUB_TOKEN || '';
commitAll(tokenArg);
