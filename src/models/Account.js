/* eslint-disable no-underscore-dangle */
import Database from '../lib/database'
import { v4 as uuid4 } from 'uuid'

class MongoDb extends Database {
    constructor() {
        super()
        this.schema = this.mongoose.Schema(
            {
                uuid: { type: String, required: true },
                user: { type: String, ref: 'User' },
                balance: { type: Number },
            },
            {
                timestamps: true,
            }
        )
        this.Account = this.mongoose.model('Account', this.schema)
    }

    async createAccount(user) {
        const uuid = uuid4()
        await this.Account.create({
            uuid,
            user: user._id,
            balance: 0,
        })
        const result = this.getAccountByUuid(uuid)
        return result
    }

    async getAccountByUser(user) {
        const response = await this.Account.findOne({ user }).populate('user')
        return response
    }

    async updateAccout(account) {
        await this.Account.updateOne({ _id: account._id }, account)
        const response = await this.getAccountByUuid(account.uuid)
        return response
    }

    async getAccountByUuid(uuid) {
        const response = await this.Account.findOne({ uuid }).populate('user')
        return response
    }
}

const mongoDb = new MongoDb()
export default mongoDb
