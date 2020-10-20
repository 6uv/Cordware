var Plugin = require('./plugin');

module.exports = new Plugin({
    Name: "No Build Override",
    Author: "Yaekith",
    Description: "This plugin should get rid of the shitty build override embeds in channel topics.",
    Version: 1.0,
    OriginURL: "",
    OnInjection: new function() {
        setInterval(() => {
            var topic = document.querySelector("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > section > div.children-19S4PO > div.topic-TCb_qw.expandable-9fI_e3");
            
            if (topic) {
                var children = topic.children;

                if (children.length > 0) {
                    for(var i = 0; i < children.length; i++) {
                        var child = children[i];
    
                        if (child.className == "wrapper-3o7UcG") {
                            child.remove();
                        }
                    }
                }
            }
        }, 1);
    }
})