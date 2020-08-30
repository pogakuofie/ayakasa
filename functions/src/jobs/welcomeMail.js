const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

module.exports = functions.firestore
  .document('users/{userId}')
  .onWrite(async (change, context) => {
    const data = change.after.data()
    const { email, name } = data

    const { address, pass, smtp } = functions.config().noreplyemail

    const transporter = nodemailer.createTransport({
      host: smtp,
      port: 465,
      secure: true,
      auth: {
        user: address,
        pass,
      },
    })

    const nicename = name.trim()

    const info = await transporter.sendMail({
      from: `"Ayakasa 📟" ${address}`,
      to: `${email}`,
      subject: `Ayakasa: Akwaaba, ${nicename}, Thanks for choosing us!`,
      text: 'Welcome to ayakasa',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="utf-8" />
      <link
      href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap"
      rel="stylesheet"
      />
      <link
      href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap"
      rel="stylesheet"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
      body {
        font-family: "Major Mono Display", monospace;
      }
      </style>
      </head>
      <body>
      <h3>Hi, ${name}</h3>

      <p style="line-height: 30px; font-family: Quicksand;">
      Thanks for signing up to Ayakasa, we glad to have you here!
      </p>

      <p style="line-height: 30px;">
      Ayakasa is the best choice for the every joe and experienced developers
      alike.<br />
      Our mission is to help every business / organisation / individuals to
      connect to their audience.
      </p>

      <p style="line-height: 30px;">
      We have the vision to roll out a number of tools that will enable our
      clients to achieve that.
      </p>

      <p style="line-height: 30px;">
      In the meanwhile hop on <a href="http://ayakasa.com">Ayakasa</a> and
      start sending sms for free.
      </p>
      <br />

      <i>Regards</i>
      <br /><br />
      <b>Aya Abayie</b>
      <p>Client Relation Spoc</p>
      </body>
      </html>
`,
    })

    return 0
  })
