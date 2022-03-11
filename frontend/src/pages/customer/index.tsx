import { useEffect, useState } from "react";
import { Box, Button, Flex, FormLabel, Heading, IconButton, Select, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { deleteCustomer, getAllCustomers } from "../../services/customer.service";
import { CustomerData } from "../../@types/customser";
import formatDate from "../../utils/formatDate";

export function Customer() {
  const toast = useToast();
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const {
    register, handleSubmit,
  } = useForm<{ contract_status: string; }>();

  async function getCutomers(contract_status?: string) {
    const data = await getAllCustomers(contract_status);
    setCustomers(data);
  }

  useEffect(() => {
    (async () => {
      await getCutomers();
    })();
  }, []);

  async function handleDelete(id: string) {
    try {
      await deleteCustomer(id)
      toast({
        title: "Cliente deletado com sucesso!",
        position: "top-right",
        status: "success",
        isClosable: true,
      })
      navigate("/")
    } catch (error) {
      toast({
        title: "Erro ao deletar cliente!",
        position: "top-right",
        status: "error",
        isClosable: true,
      }) 
    } finally {
      getCutomers()
    }
  }

  async function onSubmit({ contract_status }: { contract_status: string; }) {
    await getCutomers(contract_status)
  }

  return (
    <Box>
      <Heading
        margin="4"
        fontSize="3xl"
        fontWeight="semibold"
      >
        Clientes
      </Heading>
      <Box
        padding="4"
      >
        <Flex
          justifyContent="space-between"
        >
          <Box
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Flex alignItems="flex-end">
              <Box>
                <FormLabel
                  htmlFor="contract_status"
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.700"
                >
                  Situação contrato
                </FormLabel>
                <Select 
                  borderRadius="0.375rem 0 0 0.375rem"
                  placeholder="Selecione uma situação"
                  {...register("contract_status")}
                >
                  <option value='Em Atraso'>Em Atraso</option>
                  <option value='Dentro do Prazo'>Dentro do Prazo</option>
                  <option value='Pago'>Pago</option>
                </Select>
              </Box>
              <IconButton 
                type="submit"
                aria-label='Pequisar' 
                icon={<SearchIcon />}
                borderRadius="0 0.375rem 0.375rem 0"
              />
            </Flex>
          </Box>
          <Button
            backgroundColor="blue.300"
            onClick={() => navigate("/clientes/add")}
          >
            Adicionar cliente
          </Button>
        </Flex>
        <Table 
          variant='simple'
          padding="4"
          marginTop="6"
        >
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>CPF/CNPJ</Th>
              <Th>Data de contrato</Th>
              <Th>Situação contrato</Th>
              <Th>Editar</Th>
              <Th>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers?.map(customer => (
              <Tr key={customer._id}>
                <Td>{customer.name}</Td>
                <Td>{customer.cpf_cnpj}</Td>
                <Td>{formatDate(new Date(customer.date_contract), "dd/MM/yyyy")}</Td>
                <Td>{customer.contract_status}</Td>
                <Td>
                  <IconButton 
                    aria-label='Editar cliente'
                    variant="ghost" 
                    icon={<EditIcon />} 
                    onClick={() => navigate(`/clientes/update/${customer._id}`)}
                  />
                </Td>
                <Td>
                  <IconButton 
                    aria-label='Deletar cliente'
                    variant="ghost" 
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(customer._id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nome</Th>
              <Th>Telefone</Th>
              <Th>Data de contrato</Th>
              <Th>Situação contrato</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </Box>
  )
}