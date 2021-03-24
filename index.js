const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');

const workspace = process.env.GITHUB_WORKSPACE;
const installDir = `${workspace}/bin`;
const CT_CLI_VERSION = `0.1.2`;

try {
  cliInstall();
} catch (error) {
  core.setFailed(error.message);
}

async function cliInstall() {
  switch (process.platform) {
    case "win32": {
      const installDir = `${workspace}\\bin`;
      const url = `https://github.com/cloudtruth/cloudtruth-cli/releases/download/${CT_CLI_VERSION}/cloudtruth-${CT_CLI_VERSION}-x86_64-pc-windows-msvc.zip`;
      const ctPath = `${installDir}\\cloudtruth-${CT_CLI_VERSION}-x86_64-pc-windows-msvc`;
      await zip(url, ctPath, installDir);  
      break;
    }
    case "linux": {
      const url =  `https://github.com/cloudtruth/cloudtruth-cli/releases/download/${CT_CLI_VERSION}/cloudtruth-${CT_CLI_VERSION}-x86_64-unknown-linux-musl.tar.gz`
      const ctPath = `${installDir}/cloudtruth-${CT_CLI_VERSION}-x86_64-unknown-linux-musl`;
      await tar(url, ctPath, installDir);   
      break;
    }
    case "darwin": {
      const url = `https://github.com/cloudtruth/cloudtruth-cli/releases/download/${CT_CLI_VERSION}/cloudtruth-${CT_CLI_VERSION}-x86_64-apple-darwin.tar.gz`;      
      const ctPath = `${installDir}/cloudtruth-${CT_CLI_VERSION}-x86_64-apple-darwin`;
      await tar(url, ctPath, installDir);
      break;
    }
    default: {
      throw new Error(`Unsupported platform '${process.platform}'`);
    }
  }
}

async function zip(url, ctPath, installDir) {
  await io.mkdirP(installDir);
  const downloadPath = await tc.downloadTool(url);
  await tc.extractZip(downloadPath, installDir);
  core.addPath(ctPath);  
}

async function tar(url, ctPath, installDir) {
  await io.mkdirP(installDir);
  const downloadPath = await tc.downloadTool(url);    
  await tc.extractTar(downloadPath, installDir);
  core.addPath(ctPath);  
}