/* eslint-disable no-underscore-dangle */
import Database from '../lib/database'

class MongoDb extends Database {
    constructor() {
        super()
        this.schema = this.mongoose.Schema(
            {
                amount: { type: Number },
                type: {
                    type: String,
                    enum: [
                        'CreateAccount',
                        'Recharge',
                        'Payment',
                        'Accredited',
                    ],
                },
                status: {
                    type: String,
                    enum: ['Success', 'Warning', 'Pending'],
                    default: 'Pending',
                },
                account: { type: String, ref: 'Account' },
                token: { type: String },
            },
            {
                timestamps: true,
            }
        )
        this.History = this.mongoose.model('History', this.schema)
    }

    async createHistory(transaction) {
        const token = Math.random().toString(36).substr(2).slice(0, 6)
        transaction.token = token
        const data = await this.History.create(transaction)
        const result = await this.getHistoryById(data._id)
        return result
    }

    async updateHistory(history) {
        await this.History.updateOne({ _id: history._id }, history)
        const response = await this.getHistoryById(history._id)
        return response
    }

    async getHistoryById(id) {
        const response = await this.History.findOne({ _id: id }).populate({
            path: 'account',
            populate: {
                path: 'user',
            },
        })
        return response
    }

    async getHistoryByToken(token) {
        const response = await this.History.findOne({ token }).populate({
            path: 'account',
            populate: {
                path: 'user',
            },
        })
        return response
    }
}

const mongoDb = new MongoDb()
export default mongoDb
