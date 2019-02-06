# zclient

**Steps to setup:**
This should work on any platform (ideally) following instructions are for Windows but should work on any platform as well.

1. Install nodejs (only use LTS release which is 10.15.1 as of today)
1. Create a work folder. E.g c:\tkWork
1. Create scanner folder inside it: c:\tkWork\evilscan
1. Install evilscan node module
```shell
> npm install evilscan
```

Now our base environmen is ready. Copy file **tkScan.js** from this repo to evilscan folder and open in text editor. Update following section as required:
```javaScript
// Set IP range and port list here
let options = {
    target  :'192.168.1.1-192.168.1.254',
    port    :'80, 443',
    status  : 'RO', // Timeout, Refused, Open, Unreachable
    timeout : 3000,
    reverse : true,
    banner  : false
};
```

Above configuration will scan ip range _192.168.1.1 to 192.168.1.254_ for connectivity (host is available on the network), http and https. Change IP range and ports accordingly.

## Execution
This requires 3 arguments to execute. Run following command on shell/cmd prompt to get help:
```shell
> node tkScan.js

3 arguments are required
usage:
  > node tkScan.js <authToken> <host group Id> <host template Id>

```

_**Arguments:**_
1. **Auth token**: generate this using PostMan or any other http client. This page has reference or how to make login REST call and obtain auth token.https://www.zabbix.com/documentation/4.0/manual/api
1. **Host group Id**: create a host group Id in zabbix and mention the ID (not name) here. To find host group ID, open host groups page then move the mouse over host group link and check it's id in URL at bottom of browser window.
1. **Template Id**: create a template in zabbix using **zabbix traps** (explained earlier) then use its id.

```shell
> node tkScan.js 343453453l43k3l4k34k34k 15 10288 > hostReqList.json 
```

This will output a long JSON document to **hostReqList.json** file.
