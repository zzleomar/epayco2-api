/* eslint-disable no-underscore-dangle */
import Database from '../lib/database'
import { v4 as uuid4 } from 'uuid'

class MongoDb extends Database {
    constructor() {
        super()
        this.schema = this.mongoose.Schema(
            {
                token: { type: String, required: true },
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
            token: uuid,
            user: user._id,
            balance: 0,
        })
        const result = this.getAccountByToken(uuid)
        return result
    }

    async getAccountByToken(token) {
        const response = await this.Account.findOne({ token }).populate('user')
        return response
    }
}

const mongoDb = new MongoDb()
export default mongoDb
