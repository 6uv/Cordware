var fs = require('fs');

CordAPI = 
{
    Logging: 
    {
        Log: function(text) { 
            console.log("%c[Cord%cware]", "color: navy", "color: teal", text);
        },
        Error: function(text) {
            console.info('%c[Cordware]', 'color: #ff0000', text); 
        },
        Success(text) { 
            console.info('%c[Cordware]', 'color: #00ff00', text); 
        }
    },
    Modding:
    {
        InjectedPlugins: [],
        GetPlugins: function() {
            return this.InjectedPlugins;
        },
        GetClientDirectory: function() {
            return process.env.ClientDirectory;
        },
        GetPluginsDirectory: function() {
            return `${process.env.ClientDirectory}\\Plugins`;
        },
        FilterWebpackModule: function(item)
        {
            var req = window.webpackJsonp.push([[], {'__extra_id__': (module, exports, req) => module.exports = req}, [['__extra_id__']]]);

            for (const in1 in req.c) {
                if (req.c.hasOwnProperty(in1)) {
                    const m = req.c[in1].exports;
                    if (m && m.__esModule && m.default && m.default[item]) return m.default;
                    if (m && m[item]) return m;
                }
            }
        },
        LoadPlugin: function(path)
        {
            try 
            {
                var plugin = require(path);
                this.InjectedPlugins[plugin.Name] = plugin;
                CordAPI.Logging.Log(`Loaded ${plugin.Name} by ${plugin.Author} v${plugin.Version}`);
            }
            catch (error) {
                CordAPI.Logging.Error(`Failed to load plugins\nException: ${error}\nMake an issue report with this on the github.`);
            }
        },
        LoadPlugins: function()
        {
            try 
            {
                var files = fs.readdirSync(this.GetPluginsDirectory());
                for(var i = 0; i < files.length; i++)
                {
                    var plugin = files[i];
                    if (plugin.includes(".cord.js")) {
                        this.LoadPlugin(`${this.GetPluginsDirectory()}\\${plugin}`);
                    }
                }
                CordAPI.Logging.Success("Loaded All Plugins");
            }
            catch (error) {
                CordAPI.Logging.Error(`Failed to load plugins\nException: ${error}\nMake an issue report with this on the github.`);
            }
        }
    },
    Requests:
    {
        MakeGetRequest(url, callback)
        {
            var request = new XMLHttpRequest();
            request.addEventListener("load", () => {
                callback(request.responseText);
            });
            request.open("GET", `https://cors-anywhere.herokuapp.com/${url}`);
            request.send();
        }
    }
};

module.exports = CordAPI;