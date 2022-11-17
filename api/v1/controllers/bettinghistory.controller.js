const axios = require('axios');
const autho = require('../middlewares/autholize.middleware')
const date = require('../const/date')
const getPromo = require('../middlewares/getPromo.middleware')
const asyncHandller = require('../middlewares/async.middleware')
const manualadjust = require('../middlewares/manualadjust.middleware')
module.exports = {
    gethistory: async(req,res,next)=>{
      finalize = []
      let authorization = await autho()
      let promoInfo = await getPromo(req.query.promoid)
      let startTime = date[promoInfo.startTime]
      let endTime = date[promoInfo.endTime]
      let validateTimeStart = date[promoInfo.validateTimeStart]
      let validateTimeEnd = date[promoInfo.validateTimeEnd]
      let producttype = promoInfo.producttype
      let condition = promoInfo.condition
      console.log(date.date)
      var config = {
        method: 'get',
        url: 'https://boapi.hi88admin.com/sandsv-ims/api/v1/reports/betting?'
        +'&starttime='+startTime
        +'&endtime='+endTime
        +'&searchtime=resulttime'
        +'&jpbetinequality=1'
        +'&jpwininequality=1'
        +'&stakeinequality=1'
        +'&tipinequality=1'
        +'&validbetinequality=1'
        +'&winlossinequality=1'
        +'&producttype='+producttype
        +promoInfo.method+req.query.id,
        headers: { 
          'accept': ' */*', 
          'accept-encoding': ' gzip, deflate, br', 
          'accept-language': ' en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7', 
          'authorization': authorization, 
          'origin': ' https://bo.hi88admin.com',  
          'referer': ' https://bo.hi88admin.com/', 
        }
      };
      axios(config)
      .then( async(response)=> {
        console.log(config.url)
        let result = response.data
        let calculateValue = eval(promoInfo.calculateValue)
        console.log(calculateValue)
        let checkResult = []
        await manualadjust(validateTimeStart,validateTimeEnd,promoInfo.remark,checkResult,result.data[0].playerid,authorization)
        console.log(checkResult[0])
        if(checkResult[0]==false){
          if(calculateValue!=null){
            let avoidMethod = eval(promoInfo.avoidMethod)
            console.log(avoidMethod)
            console.log(promoInfo.avoidValue)
            if(promoInfo.avoidValue.indexOf(avoidMethod)==-1){
              console.log(eval(promoInfo.avoidMethod))
              let validDate = promoInfo.date.indexOf(date.date)!=-1
              if(validDate==true){
                let checkResult = [false]
                if(checkResult[0]==false){
                  eval(promoInfo.condition)
                  var condifunction = promoInfo.conditionValue.indexOf(finalize[0])
                  console.log(condifunction)
                  if(condifunction!=-1){
                    let bonus = promoInfo.bonus[condifunction]
                    let calculateMethod = eval(promoInfo.calculateMethod)
                    let score = Math.round(calculateMethod * 100) / 100
                    console.log("this is the score: "+score)
                    console.log(result.data[0].gamename['id-ID'])
                    let limit
                    eval(promoInfo.limit)
                    let limitResult = limit(result)
                    if(score!=''){
                      if(score<=limitResult-1){
                        success(res,result,score,promoInfo,calculateValue)
                      }else{
                        score = limitResult
                        success(res,result,score,promoInfo,calculateValue)
                      }
                    }else{
                      document.getElementsByClassName('results-area')[0].innerHTML='<h3 style="width:100%;text-align: center;">Vui Lòng chờ Đến ngày 8/18/28 Để Nhận Thưởng</h3>'
                    }
                  }else{
  
                  }
                }else{
                  console.log('Quý Khách Đã Nhận Khuyến Mãi Này')
                }
              }else{
                console.log('Vui Lòng chờ đến thời gian nhận thưởng')
              }
            }else{
              failure(res,200,'Vé cược không hợp lệ')
            }
          }else{
            failure(res,200,"Quý khách chưa đủ điều kiện nhận khuyên mãi")
          }
        }else{
          failure(res,200,"Quý khách đã nhận khuyến mãi này")
        }
      }).catch(function (error) {
        res.json(error);
      });
    }  
}

function success(res,result,score,promoInfo,calculateValue){
  res.json({
    promoName: promoInfo.promoName,
    promotionTile: promoInfo.promotionTile,
    playerid: result.data[0].playerid,
    score: calculateValue,
    bonus: score,
    subject: promoInfo.subject,
    content: promoInfo.content,
    startTime:promoInfo.startTime,
    endTime:promoInfo.endTime
  })
}

function failure(res,code,reason){    
  res.json({
    code:code,
    mess:reason
  })
}

//
