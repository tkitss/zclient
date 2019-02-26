var ZabbixSender = require('node-zabbix-sender');
var Sender = new ZabbixSender({ host: "192.168.0.20" });

Sender.addItem("192.168.0.10","icmpping",1);

Sender.send(function(err, res) { 
    if(err) {
        throw err;
    }

    console.log(res)
});