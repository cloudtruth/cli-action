const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');

const workspace = process.env.GITHUB_WORKSPACE;
const installDir = `${workspace}/bin`;

try {
  version();
} catch (error) {
  core.setFailed(error.message);
}

async function version() {
  switch (process.platform) {
    case "win32": {
      const installDir = `${workspace}\\bin`;
      const url = 'https://github.com/cloudtruth/cloudtruth-cli/releases/download/0.1.1/cloudtruth-0.1.1-x86_64-pc-windows-msvc.zip';

      await io.mkdirP(installDir);
      const downloadPath = await tc.downloadTool(url);
      await tc.extractZip(downloadPath, installDir);
      const ctPath = `${installDir}\\cloudtruth-0.1.1-x86_64-pc-windows-msvc`;
      core.addPath(ctPath);  
      break;
    }
    case "linux": {
      const url =  "https://github.com/cloudtruth/cloudtruth-cli/releases/download/0.1.2/cloudtruth-0.1.2-x86_64-unknown-linux-musl.tar.gz"

      await io.mkdirP(installDir);
      const downloadPath = await tc.downloadTool(url);   
      core.setOutput("downloadPath", downloadPath)      
      await tc.extractTar(downloadPath, installDir);
      const ctPath = `${installDir}/cloudtruth-0.1.2-x86_64-unknown-linux-musl`;
      core.addPath(ctPath);  
      break;
    }
    case "darwin": {
      const url = "https://github.com/cloudtruth/cloudtruth-cli/releases/download/0.1.1/cloudtruth-0.1.1-x86_64-apple-darwin.tar.gz";      

      await io.mkdirP(installDir);
      const downloadPath = await tc.downloadTool(url);    
      await tc.extractTar(downloadPath, installDir);
      const ctPath = `${installDir}/cloudtruth-0.1.1-x86_64-apple-darwin`;
      core.addPath(ctPath);  
      break;
    }
    default: {
      throw new Error(`Unsupported platform '${process.platform}'`);
    }
  }
}