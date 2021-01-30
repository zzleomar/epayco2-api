/* eslint-disable no-unused-vars */
import mailgun from 'mailgun-js'
import dotenv from 'dotenv'

dotenv.config()

class MailgunEmail {
    constructor() {
        this.mailgun = mailgun
        this.mg = mailgun({
            apiKey: process.env.MAILGUNAPIKEY,
            domain: process.env.MAILGUNDOMAIN,
        })
    }

    // { from, to, subject, html } in data
    send(data) {
        return new Promise((resolve, reject) => {
            this.mg.messages().send(data, (err) => {
                if (err) resolve(err)
                resolve(null)
            })
        })
    }
}

const mailgunEmail = new MailgunEmail()
module.exports = mailgunEmail
