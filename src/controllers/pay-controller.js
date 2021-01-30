/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
// import dotenv from 'dotenv'
// import _ from 'lodash'
import mongoDbUser from '../models/User'
import mongoDbAccount from '../models/Account'
import mongoDbHistory from '../models/History'
import mailgunEmail from '../lib/MailgunEmail'
import { readFileSync } from 'fs'

class PayController {
    async requestPayment(req, res) {
        const { document, phone, amount } = req.body
        const result = await mongoDbUser.getUserByDocumentAndPhone(
            document,
            phone
        )
        if (result) {
            const account = await mongoDbAccount.getAccountByUser(result._id)
            if (account.balance >= parseFloat(amount)) {
                const transaction = await mongoDbHistory.createHistory({
                    amount: parseFloat(amount),
                    type: 'Payment',
                    status: 'Pending',
                    account,
                })
                let html = readFileSync(
                    'src/lib/templateEmails/confirmPayment.html',
                    'UTF-8'
                )
                html = html.replace(/VAR_TOKEN/i, transaction.token)
                const err = await mailgunEmail.send({
                    from: process.env.MAILGUNFROM_EMAIL,
                    to: account.user.email,
                    subject: 'Confirmación de pago',
                    html,
                })
                if (err) {
                    return res.send({
                        status: 'Error',
                        data: {
                            message:
                                'Ocurrio un error al enviar el correo electronico con los datos para confirmar el pago',
                        },
                    })
                }
                return res.send({ status: 'Ok', data: account })
            }
            return res.send({
                status: 'Error',
                data: {
                    message: 'Saldo insuficiente',
                },
            })
        }
        return res.send({
            status: 'Error',
            data: {
                message:
                    'Los datos ingresados no coinciden con las de un usuario registrado',
            },
        })
    }

    async confirm(req, res) {
        const { token, uuid } = req.body
        let history = await mongoDbHistory.getHistoryByToken(token)
        if (history && history.status === 'Pending') {
            let accountDestiny = await mongoDbAccount.getAccountByUuid(uuid)
            if (accountDestiny) {
                let { account } = history
                account.balance -= history.amount
                account = await mongoDbAccount.updateAccout(account)

                accountDestiny.balance += history.amount
                accountDestiny = await mongoDbAccount.updateAccout(
                    accountDestiny
                )

                history.status = 'Success'
                history = await mongoDbHistory.updateHistory(history)
                return res.send({ status: 'Ok', data: history })
            }
            return res.send({
                status: 'Error',
                data: {
                    message:
                        'uuid invalido, debe ingresar el uuid de la cuenta del usuario que recibe el pago',
                },
            })
        }
        return res.send({
            status: 'Error',
            data: {
                message: 'Token invalido',
            },
        })
    }
}

const payController = new PayController()
export default payController
