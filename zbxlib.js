const axios = require('axios')

var common = {
    axios : require('axios'),

    init : function() {
        axios.defaults.headers.post['content-type'] = 'application/json';
    },
    model : {
        reqId : 0,
        getBase : function() {
            var retval = {
                jsonrpc : "2.0",
                method : null,
                params : {},
                id : this.reqId++,
                auth : null
            }
            return retval;
        },
        getLoginRequest : function(uid, passwd) {
            var req = this.getBase();
            req.method = "user.login";
            req.params.user = uid;
            req.params.password = passwd;
            return req;
        },
        createHostRequest : function() {
            var req = this.getBase();
            req.method = "host.create";
            req.params.host = "";
            req.params.interfaces = [{
                type: 1,
                main: 1,
                useip: 1,
                ip: "",
                dns: "",
                port: "10050"
            }];
            req.params.groups = [{
                groupid : ""
            }];
            req.params.templates = 
            [{
                templateid : ""
            }];
            req.params.inventory_mode = 0;
            req.params.inventory = {};
            return req;
        }
    },
    Session : function(zbxUrl) {
        this.serverUrl = zbxUrl;
        this.token = null;
    
        this.login = async function(uid, passwd) {
            var req = common.model.getLoginRequest(uid, passwd);
            console.debug("login().request: " + JSON.stringify(req, null, 3));

            await axios.post(this.serverUrl, req).then(function (response) {
                console.debug("login().response: " + JSON.stringify(response.data, null, 3));
                this.token = response.data.result;

                if (typeof response.data.error !== "undefined" ) {
                    console.error("Request ERROR: " + response.data);
                }
            }).catch(function (error) {
                console.log(error);
            });

        },
        this.addHost =  (hostname, ip, hostGroup, template) => {
            hostname = hostname == null? ip: hostname;
            var req = common.model.createHostRequest();
            req.params.host = hostname;
            req.params.interfaces[0].dns = hostname;
            req.params.interfaces[0].ip = ip;
            req.params.groups[0].groupid = hostGroup;
            req.params.templates[0].templateid = template;
            req.auth = this.token;

            console.debug("addHost().request: " + JSON.stringify(req, null, 3));

            axios.post(this.serverUrl, req).then(function (response) {
                console.debug(JSON.stringify(response.data, null, 3));

                if (typeof response.data.error !== "undefined" ) {
                    console.error("Request ERROR: " + JSON.stringify(response.data));
                }
                return response.data.result.hostids[0];
            }).catch(function (error) {
                console.log(error);
            });

        }
    }
};

module.exports = common;

