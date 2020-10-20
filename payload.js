const electron = require('electron');
electron.app.commandLine.appendSwitch("no-force-async-hooks-checks");

electron.session.defaultSession.webRequest.onHeadersReceived(function(details, callback) {
    if (!details.responseHeaders['content-security-policy-report-only'] && !details.responseHeaders['content-security-policy']) {
        return callback({cancel: false});
    }

    delete details.responseHeaders['content-security-policy-report-only'];
    delete details.responseHeaders['content-security-policy'];
    callback({cancel: false, responseHeaders: details.responseHeaders});
});
    
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
        
const electron_path = require.resolve('electron');
Object.assign(BrowserWindow, electron.BrowserWindow);
        
if (electron.deprecate && electron.deprecate.promisify) {
    const originalDeprecate = electron.deprecate.promisify;
    electron.deprecate.promisify = (originalFunction) => originalFunction ? originalDeprecate(originalFunction) : () => void 0;
}
        
const newElectron = Object.assign({}, electron, {BrowserWindow});
delete require.cache[electron_path].exports;
require.cache[electron_path].exports = newElectron;

//Because my unique injection method wouldn't properly work with context isolation, i'll use EnhancedDiscord's injection method.
//ALL CREDITS GOTO ZACK RAUEN (https://github.com/joe27g/EnhancedDiscord/blob/master/injection.js)