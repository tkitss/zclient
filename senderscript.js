var ZabbixSender = require('node-zabbix-sender');
var Sender = new ZabbixSender({ host: "" });

Sender.addItem("","","");

Sender.send(function(err, res) { 
    if(err) {
        throw err;
    }

    console.log(res)
});