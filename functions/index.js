const welcomeMail = require('./src/jobs/welcomeMail')
const sms = require('./src/jobs/sms')
const api = require('./src/routes/api')

exports.api = api
exports.sms = sms
exports.welcomeMail = welcomeMail
