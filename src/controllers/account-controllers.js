/* eslint-disable class-methods-use-this */
// import dotenv from 'dotenv'
// import _ from 'lodash'

class AccountController {
    async create(req, res) {
        res.send({ status: 'ok', data: req.body })
    }

    async query(req, res) {
        res.send({ status: 'ok', data: req.body })
    }

    async recharge(req, res) {
        res.send({ status: 'ok', data: req.body })
    }

    async requestPayment(req, res) {
        res.send({ status: 'ok', data: req.body })
    }

    async pay(req, res) {
        res.send({ status: 'ok', data: req.body })
    }
}

const accountController = new AccountController()
export default accountController
