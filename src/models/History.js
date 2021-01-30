import mongoose from 'mongoose'

const historySchema = new mongoose.Schema(
    {
        amount: { type: Number },
        type: {
            type: String,
            enum: ['CreateAccount', 'Recharge', 'Payment', 'Accredited'],
        },
        status: {
            type: String,
            enum: ['Success', 'Warning', 'Pending'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
)

const model = mongoose.model('History', historySchema)

module.exports = model
