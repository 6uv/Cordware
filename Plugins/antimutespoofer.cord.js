var Plugin = require('./plugin');
var CordAPI = require('../API/API');

module.exports = new Plugin({
    Name: "Anti Mute Spoofer",
    Author: "Yaekith",
    Description: "This plugin prevents the usage of the ws mute spoofer thing, since it's fucking annoying as fuck.",
    Version: 1.0,
    OriginURL: "",
    OnInjection: new function() {
        try 
        {
            var dispatch = CordAPI.Modding.FilterWebpackModule("dispatch");
            CordAPI.Modding.PatchMethod(dispatch, "dispatch", (result) => 
            {
                switch(result.methodArguments[0].type)
                {
                    case "SPEAKING":
                        //so when we receive the speaking gateway event, we can check who is speaking, then check if they are muted over the gateway.
                        var us = CordAPI.Modding.FilterWebpackModule("getCurrentUser").getCurrentUser();
                        var userId = result.methodArguments[0].userId;
                        var user = CordAPI.Modding.FilterWebpackModule("getUser").getUser(userId);
                        var guildId = window.location.toString().split("/")[4];
                        var voiceStates = CordAPI.Modding.FilterWebpackModule("getVoiceStates").getVoiceStates(guildId);
                        var theirVoiceState = voiceStates[userId];
                        var isLocallyMuted = CordAPI.Modding.FilterWebpackModule("isLocalMute").isLocalMute(userId);
                        if (guildId && theirVoiceState && userId != us.id)
                        {
                            if (theirVoiceState.selfMute && !isLocallyMuted) 
                            {
                                //how the fuck can you talk when 'self muted' :troll: (detected exploiter)
                                CordAPI.Modding.FilterWebpackModule("toggleLocalMute").toggleLocalMute(userId);
                                CordAPI.Logging.Log(`(ANTI MUTE SPOOFER) ${user.username} tried to use the ws-mute-exploit in your current call. Locally muted them.`);
                            }
                        }
                    break;
                }
                
                return result.callOriginalMethod(result.methodArguments);
            });
        }
        catch(err) {}
    }
})
