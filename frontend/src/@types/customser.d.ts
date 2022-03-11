export interface CustomerData {
  _id: string;
  name: string;
  cpf_cnpj: string;
  telephone: string;
  date_contract: Date;
  number_contract: number;
  value_contract: number;
  contract_status: string;
  action: string;
}

export interface CustomerForm {
  name: string;
  cpf_cnpj: string;
  telephone: string;
  date_contract: Date;
  number_contract: number;
  value_contract: number;
  contract_status: string;
  action: string;
}

export interface CreateOrUpdateCustomer {
  name: string;
  cpf_cnpj: string;
  telephone: string;
  date_contract: Date;
  number_contract: number;
  value_contract: number;
  contract_status: string;
  action: string;
}