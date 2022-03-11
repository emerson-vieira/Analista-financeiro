import API from "./api";
import { CreateOrUpdateCustomer, CustomerData } from "../@types/customser";

async function getAllCustomers(contract_status?: string) {
  const { data } = await API.get<CustomerData[]>("/customers", {
    contract_status: contract_status
  });
  return data;
}

async function getCustomer(id: string) {
  const { data } = await API.get<CustomerData>(`/customers/${id}`);
  return data;
}

async function createCustomer(customer: CreateOrUpdateCustomer) {
  const { data } = await API.post("/customers", customer);
  return data;
}

async function updateCustomer(id: string, customer: CreateOrUpdateCustomer) {
  const { data } = await API.put(`/customers/${id}`, customer);
  return data;
}

async function deleteCustomer(id: string) {
  const { data } = await API.delete(`/customers/${id}`);
  return data;
}

export {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
}