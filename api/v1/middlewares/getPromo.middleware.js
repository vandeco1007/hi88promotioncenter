const promotionRule = require('../models/rule.model')
module.exports = async(promoid)=>{
    let rule = await promotionRule.findOne({promoName: promoid}).exec()
    return rule
}

//changed
//



// let calculateValueFn = (result)=> {
//     let winloss = Math.abs(result.summary.winloss)
//     if(result.summary.validbet>0){
//         if(result.summary.validbet<=winloss){
//             return result.summary.validbet
//         }else if(result.summary.validbet>winloss){
//             return Math.abs(result.summary.betamount)
//         }
//     }else{
//         if(result.summary.winloss>0){
//             if(result.summary.betamount<=winloss){
//                 return result.summary.betamount
//             }else if(result.summary.betamount>winloss){
//                 return Math.abs(result.summary.winloss)
//             }
//         }else{
//             return null
//         }
//     }
// }

// calculateValueFn(result)