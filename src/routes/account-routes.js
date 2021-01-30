import express from 'express'
import accountController from '../controllers/account-controllers'

const router = express.Router()

router.post('/create', (req, res) => {
    accountController.create(req, res)
})
router.post('/query', (req, res) => {
    accountController.query(req, res)
})
router.post('/recharge', (req, res) => {
    accountController.recharge(req, res)
})
router.post('/requestPayment', (req, res) => {
    accountController.requestPayment(req, res)
})
router.post('/pay', (req, res) => {
    accountController.pay(req, res)
})

export default router
