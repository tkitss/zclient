
// var zbx = require('./zbxlib');
const axios = require('axios');

// async function go() {
//     var session = new zbx.Session("http://192.168.31.93/zabbix/api_jsonrpc.php");
//     await session.login("Admin","zabbix");
    
//     var hostId = await session.addHost("Test_Cam1", "192.168.31.1", "5", "10186");
// }

// let authToken = "";

const hosts = require('./hostReqList.json');

const Session = {
    login() {
        // console.log("Login function")
        return axios({
            method: 'post',
            headers: { 'Content-Type' : "application/json-rpc" },
            url: "http://192.168.31.93/zabbix/api_jsonrpc.php",
            data: {
                "jsonrpc" : "2.0",
                "method" : "user.login",
                "params" : {
                    "user" : "Admin",
                    "password" : "zabbix"
                },
                "id": 1,
                "auth": null,
            }
        })
    },

    addHost(authToken, hostname, groupID, ip_address, templateID) {
        const url = "http://192.168.31.93/zabbix/api_jsonrpc.php";
        // hostname = hostname == null? ip_address: hostname;
        // let ip_address = "";
        // let groupID = 0;
        // let templateID = 0;

        axios.post(url, {
            "auth" : authToken,
            "id": "1",
            "jsonrpc" : "2.0",
            "method" : "host.create",
            "params": {
                "host": hostname,
                "interfaces": [
                    {
                        "type": 1,
                        "main": 1,
                        "useip": 1,
                        "ip": ip_address,
                        "dns": "",
                        "port": "10050"
                    }
                ],
                "groups": [
                    {
                        "groupid": groupID
                    }
                ],
                "templates": [
                    {
                        "templateid": templateID
                    }
                ],
            }
        }).then(res => console.log(res.data))
    }
}

Session.login().then(res => {
    hosts.forEach(host => {
        Session.addHost(res.data.result, "NA", 5, host.params.interfaces[0].ip, 10186)
    });
});

// console.log(hosts.length);