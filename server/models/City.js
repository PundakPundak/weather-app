const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const Expense = mongoose.model("expense", expenseSchema)
module.exports = Expense