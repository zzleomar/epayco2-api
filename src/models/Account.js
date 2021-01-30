import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema(
    {
        token: { type: String, required: true },
        user: { type: String, ref: 'User' },
        balance: { type: Number },
    },
    {
        timestamps: true,
    }
)

const model = mongoose.model('Account', accountSchema)

module.exports = model
