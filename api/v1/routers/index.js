const addpoint = require('./addpoint.router')
const authorization = require('./authorization.router')
const bettinghistory = require('./bettinghistory.router')
const rule = require('./rule.router')
const test = require('./test')

const router = (app)=>{
    app.use('/addpoint', addpoint)
    app.use('/autho', authorization)
    app.use('/bettinghistory', bettinghistory)
    app.use('/rule', rule)
    app.use('/test',test)
}

module.exports = router
