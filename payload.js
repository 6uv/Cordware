var electron = require('electron');

class BrowserWindow extends electron.BrowserWindow {
    constructor(originalOptions) {
        if (!originalOptions || !originalOptions.webPreferences || !originalOptions.title) return super(originalOptions);
        const originalPreloadScript = originalOptions.webPreferences.preload;
        
        originalOptions.webPreferences.nodeIntegration = true;
        originalOptions.webPreferences.enableRemoteModule = true;
        originalOptions.webPreferences.contextIsolation = false;
        originalOptions.webPreferences.preload = `${process.env.ClientDirectory}\\client.js`
        originalOptions.webPreferences.transparency = true;
        
        super(originalOptions);
        this.__preload = originalPreloadScript;
    }
}

module.exports = BrowserWindow;