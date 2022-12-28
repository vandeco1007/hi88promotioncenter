const axios = require('axios');
module.exports = (starttime,endtime,checkValue,checkResult,playerid,authorization)=>{
    var testcase = []
    var config = {
    method: 'get',
    url: "https://boapi.hi88admin.com/sandsv-ims/api/v1/manualadjusts?&starttime="+starttime+"&endtime="+endtime+"&limit=25&offset=0&sort=DESC&sortcolumn=adjusttime&playerid="+playerid,
    headers: { 
        'authorization': authorization, 
        'Cookie': '__cf_bm=mhdBXG.oLIkMHybji3U8Lfju4KbxGkr79SgC4o4ZSxw-1668584499-0-AYTn85IqZMFttET5/lL052CexC1l9ysBtxSt+HCcuBeZGuYOUXoYWh7spKzzC/xe4276iTnlHxgFTu4yM4E/DIY='
    }
    };

    return axios(config)
    .then(function (response) {
        response.data.data.forEach(element => {
            testcase.push(element.remarks.toUpperCase().replace(/\s/g, ''))
        });
        return response.data
    }).then(()=>{
        checkResult[0] =  testcase.includes(checkValue)
    })
    .catch(function (error) {
        console.log(error);
    });
}