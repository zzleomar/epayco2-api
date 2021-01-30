import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export default class Database {
    constructor() {
        this.mongoose = mongoose
        mongoose
            .connect(process.env.URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((con, err) => {
                if (err) throw err
                console.log('Mongodb ok!')
            })
    }
}
