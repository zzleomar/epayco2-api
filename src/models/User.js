/* eslint-disable no-underscore-dangle */
import Database from '../lib/database'

class MongoDb extends Database {
    constructor() {
        super()
        this.schema = this.mongoose.Schema(
            {
                fullName: { type: String, required: true },
                document: { type: String, required: true },
                phone: { type: String, required: true },
                email: {
                    type: String,
                    required: true,
                    unique: true,
                },
            },
            {
                timestamps: true,
            }
        )
        this.User = this.mongoose.model('User', this.schema)
    }

    async createUser(user) {
        const result = await this.User.create(user)
        return result
    }

    async getUserByEmail(email) {
        const response = await this.User.findOne({ email })
        return response
    }

    async getUserByDocumentAndPhone(document, phone) {
        const response = await this.User.findOne({ document, phone })
        return response
    }
}

const mongoDb = new MongoDb()
export default mongoDb
