/* eslint-disable */
'use strict';

(function($) {

    // Serialize form fields in object
    $.fn.serializeObject = function(){
        let self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)])*$/,
                "key": /[a-zA-Z0-9_]+|(?=\[])/g,
                "push": /^$/,
                "fixed": /^\d+$/,
                "named": /^[a-zA-Z0-9_]+$/
            };

        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if (push_counters[key] === undefined){
                push_counters[key] = 0;
            }

            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function() {
            if(!patterns.validate.test(this.name)) {
                return;
            }

            let k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while ((k = keys.pop()) !== undefined) {
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                if (k.match(patterns.push)) {
                    merge = self.build([], self.push_counter(reverse_key), merge);
                } else if (k.match(patterns.fixed)) {
                    merge = self.build([], k, merge);
                } else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };


    /**
     * Open oauth page for authentication
     * @param options
     */
    $.oauthpopup = function(options) {
        options.windowName = options.windowName || 'ConnectWithOAuth';
        options.windowOptions = options.windowOptions || 'location=0,status=0,width=800,height=400';
        //options.callback = options.callback || (() => window.location.reload());
        options.startCallbackBaseURL = options.startCallbackBaseURL || null;
        console.log(options.path);

        let that = this;
        that._oauthWindow = window.open(options.path, options.windowName, options.windowOptions);
        /*that._oauthInterval = window.setInterval(() => {
            if (that._oauthWindow.closed !== false) {
                window.clearInterval(that._oauthInterval);
                options.callback();
            }
        }, 1000);*/

        let checkLocationChange = function() {
            setTimeout(() => {
                let obj = Object.create(that._oauthWindow.location);

                if (!options.startCallbackBaseURL
                    || that._oauthWindow.location.host.startsWith(options.startCallbackBaseURL)) {
                    console.log('yeasss');
                } else {
                    checkLocationChange();
                }
            }, 500);
        };

        checkLocationChange();
    }


})(jQuery);