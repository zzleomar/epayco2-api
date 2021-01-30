import express from 'express'
import payController from '../controllers/pay-controller'

const router = express.Router()

router.post('/requestPayment', (req, res) => {
    payController.requestPayment(req, res)
})
router.post('/confirm', (req, res) => {
    payController.confirm(req, res)
})

export default router
