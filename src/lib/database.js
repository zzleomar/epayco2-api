import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

class Database {
    constructor() {
        this.connection = mongoose
            .connect(process.env.URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((con, err) => {
                if (err) throw err
                console.log('Mongodb ok!')
            })
        mongoose.set('useCreateIndex', true)
    }
}

const DB = new Database()
module.exports = DB
