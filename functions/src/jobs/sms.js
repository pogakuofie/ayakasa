const admin = require('firebase-admin')
const functions = require('firebase-functions')
const axios = require('axios')

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

const db = admin.firestore()

module.exports = functions.firestore
  .document('/users/{userId}/sms/{msgId}')
  .onWrite(async (change, context) => {
    const data = change.after.data()

    const { recipientNumber, smsBody } = data

    console.log(context.params.userId)

    const { userId } = context.params

    const userData = db.collection('users').doc(`${userId}`)
    const doc = await userData.get()
    if (doc.exists) {
      const { name } = doc.data()

      const smsFullBody = `From ${name},\n\n${smsBody}\n\nSent from ayakasa.com, send SMS for free!`

      console.log(functions.config().mnotify.key)

      const url = `https://apps.mnotify.net/smsapi?key=${
        functions.config().mnotify.key
      }&to=${recipientNumber.substr(1)}&msg=${smsFullBody}&sender_id=${'ayakasa'}`

      axios
        .get(url)
        .then((res) => {
          const { data } = res
          console.log(data)
          return ''
        })
        .catch((e) => {
          console.log(e)
        })
    }
  })
