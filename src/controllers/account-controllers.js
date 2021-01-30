/* eslint-disable class-methods-use-this */
// import dotenv from 'dotenv'
// import _ from 'lodash'
import mongoDbUser from '../models/User'
import mongoDbAccount from '../models/Account'

class AccountController {
    async create(req, res) {
        const result = await mongoDbUser.getUserByEmail(req.body.email)
        if (result) {
            res.send({
                status: 'Error',
                data: {
                    message:
                        'El correo electrónico ya se encuentra registrado para un usuario',
                },
            })
        } else {
            const user = await mongoDbUser.createUser(req.body)
            const data = await mongoDbAccount.createAccount(user)
            res.send({ status: 'Ok', data })
        }
    }

    async query(req, res) {
        res.send({ status: 'Ok', data: req.body })
    }

    async recharge(req, res) {
        res.send({ status: 'Ok', data: req.body })
    }

    async requestPayment(req, res) {
        res.send({ status: 'Ok', data: req.body })
    }

    async pay(req, res) {
        res.send({ status: 'Ok', data: req.body })
    }
}

const accountController = new AccountController()
export default accountController
