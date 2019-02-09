const axios = require('axios');

const getAuthToken = axios({
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
}).then(res => console.log(res.data))
.catch(err => console.log("Error"))

// export default getAuthToken;
// 09a850484a75022fb143a9c726870662