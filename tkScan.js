const evilscan = require('evilscan');


// Set IP range and port list here
let options = {
    target  :'192.168.1.1-192.168.1.254',
    port    :'80, 443',
    status  : 'RO', // Timeout, Refused, Open, Unreachable
    timeout : 3000,
    reverse : true,
    banner  : false
};


var reqId = 801;

function formatHostReq(hostData, authToken, grpId, tmplId) {
    var hostName = (hostData.reverse != null? hostData.reverse: hostData.ip) ;
    var retval = {
        jsonrpc : "2.0",
        method : "host.create",
        params : {
            host: hostName,
            interfaces: [{
                type: 1,
                main: 1,
                useip: 1,
                ip: hostData.ip,
                dns: hostName,
                port: 10050
            }],
            groups: [{
                groupid: grpId.toString()
            }],
            templates: [ {
                templateid: tmplId.toString()
            }],
            inventory_mode: 0,
            inventory: {}
        },
        id : reqId++,
        auth : authToken
    }
    return retval;
}

if (process.argv.length < 5) {
    console.log("3 arguments are required");
    console.log("usage:\n  > node tkScan.js <authToken> <host group Id> <host template Id>\n\n");
    process.exit();
}

var authToken = process.argv[2];
var grpId = process.argv[3];
var templtId = process.argv[4];


let scanner = new evilscan(options);

var list = [];
var hosts = {};

scanner.on('result',function (data) {
    var hostReq = formatHostReq(data, "a638dcd4b8446dc696c77660815cb2aa", 15, 10288);
	list.push(hostReq);
});

scanner.on('error',function (err) {
	throw new Error(data.toString());
});

scanner.on('done',function () {
	console.log( JSON.stringify(list, null, 3) );
});

scanner.run();
