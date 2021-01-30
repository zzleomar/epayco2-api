/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
// import dotenv from 'dotenv'
// import _ from 'lodash'
import mongoDbUser from '../models/User'
import mongoDbAccount from '../models/Account'

class AccountController {
    async create(req, res) {
        const { document, phone } = req.body
        const result = await mongoDbUser.getUserByEmail(req.body.email)
        const result2 = await mongoDbUser.getUserByDocumentAndPhone(
            document,
            phone
        )
        if (result || result2) {
            return res.send({
                status: 'Error',
                data: {
                    message:
                        'Ya se encuentra registrado un usuario con la información ingresada',
                },
            })
        }
        const user = await mongoDbUser.createUser(req.body)
        const data = await mongoDbAccount.createAccount(user)
        return res.send({ status: 'Ok', data })
    }

    async query(req, res) {
        res.send({ status: 'Ok', data: req.body })
    }

    async recharge(req, res) {
        const { document, phone, amount } = req.body
        const result = await mongoDbUser.getUserByDocumentAndPhone(
            document,
            phone
        )
        if (result) {
            let account = await mongoDbAccount.getAccountByUser(result._id)
            account.balance += amount
            account = await mongoDbAccount.updateAccout(account)
            return res.send({ status: 'Ok', data: account })
        }
        return res.send({
            status: 'Error',
            data: {
                message:
                    'Los datos ingresados no coinciden con las de un usuario registrado',
            },
        })
    }
}

const accountController = new AccountController()
export default accountController
