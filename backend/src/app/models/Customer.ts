import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    cpf_cnpj:  { 
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    number_contract:  { 
        type: Number,
        required: true
    },
    date_contract:  { 
        type: Date,
        required: true
    },
    value_contract:  { 
        type: Number,
        required: true
    },
    contract_status: String,
    action: String,
})

export default mongoose.model("Customer", CustomerSchema)