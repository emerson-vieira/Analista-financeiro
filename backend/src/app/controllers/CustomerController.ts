import { Request, Response } from "express"
import Customer from "../models/Customer"
export default {
    async index(request: Request, response: Response) {
        const { contract_status } = request.query;
        let query = {};

        if(contract_status) {
            query = {...query, contract_status};
        }
        console.log(query)
        const cutomers = await Customer.find(query);
        return response.json(cutomers);
    },

    async find(request: Request, response: Response) {
        const { id } = request.params;
        const cutomer = await Customer.findOne({ _id: id });
        return response.json(cutomer);
    },

    async store(request: Request, response: Response){
        const {    
            name,
            cpf_cnpj,
            telephone,
            number_contract,
            date_contract,
            value_contract,
        } = request.body;

        const cutomer = await Customer.create({
            name,
            cpf_cnpj,
            telephone,
            number_contract,
            date_contract,
            value_contract,
        })

        return response.json(cutomer).status(201);
    },

    async update(request: Request, response: Response){
        const {    
            name,
            cpf_cnpj,
            telephone,
            number_contract,
            date_contract,
            value_contract,
            contract_status,
            action,
        } = request.body;
        const { id } = request.params;

        const cutomer = await Customer.updateOne({ _id: id }, {
            name,
            cpf_cnpj,
            telephone,
            number_contract,
            date_contract,
            value_contract,
            contract_status,
            action,
        })
        return response.json(cutomer).status(200);
    },

    async destroy(request: Request, response: Response){
        const { id } = request.params;
        await Customer.deleteOne({ _id: id });

        return response.send().status(200);
    }

}