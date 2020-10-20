class Plugin 
{
    constructor(details) {
        if (!details || !details.OnInjection || !details.Name) return;
        
        Object.assign(this, details);
    }
    OnInjection() { }
    OnEjection() { }
    OnEventCalled(Type, Parameters, Callback) { }
}

module.exports = Plugin;