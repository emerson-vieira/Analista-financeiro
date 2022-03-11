import { useEffect } from "react";
import { Box, Button, Flex, FormLabel, Grid, Heading, HStack, Select, useToast } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Input } from "../../components/Input";
import { InputCurrency } from "../../components/InputCurrency";
import { InputMask } from "../../components/InputMask";
import { InputDate } from "../../components/InputDate";

import { getCustomer, updateCustomer } from "../../services/customer.service";
import { CustomerForm } from "../../@types/customser";
import { strings } from "../../utils/strings";
import cleanMask from "../../utils/cleanMask";
import transformStringToNumber from "../../utils/transformStringToNumber";

export function UpdateCustomer() {
  const toast = useToast();
  const navigate = useNavigate()
  const { id } = useParams();
  const {
    register, handleSubmit, reset, control, formState: { errors },
  } = useForm<CustomerForm>();

  async function getCustomerById(customerId: string) {
    try {
      const data = await getCustomer(customerId);
      if (data) {
        reset({
          name: data.name,
          cpf_cnpj: data.cpf_cnpj,
          telephone: data.telephone,
          date_contract: new Date(data.date_contract),
          number_contract: data.number_contract,
          value_contract: data.value_contract,
          contract_status: data.contract_status,
          action: data.action,
        });
      }
    } catch (error) {
      toast({
        title: "Cliente não encotrato!",
        position: "top-right",
        status: "error",
        isClosable: true,
      });
      navigate("/");
    }
  }

  useEffect(() => {
    (async () => {
      if(id) {
        await getCustomerById(id)
      }
    })()
  }, [id]);

  async function onSubmit(customer: CustomerForm) {
    console.log(customer)
    try {
      await updateCustomer(id!, {
        ...customer,
        telephone: cleanMask(customer.telephone),
        value_contract: transformStringToNumber(customer.value_contract),
      });
      toast({
        title: "Cliente atualizado com sucesso!",
        position: "top-right",
        status: "success",
        isClosable: true,
      })
      navigate("/")
    } catch (error) {
      toast({
        title: "Erro ao criar cliente!",
        position: "top-right",
        status: "error",
        isClosable: true,
      }) 
    }
  }

  return (
    <Box>
      <Heading
        margin="4"
        fontSize="3xl"
        fontWeight="semibold"
      >
        Adicionar clientes
      </Heading>
      <Flex
        width="full"
        justifyContent="center"
      >
        <Box
          as="form"
          width="full"
          maxWidth={"950px"}
          onSubmit={handleSubmit(onSubmit)}
        >
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
          gap={{ base: 0, lg: 6 }}
        >
          <Input 
            label="Nome"
            placeholder="Nome"
            {...register("name", {
              required: strings.isRequired,
            })}
            error={errors.name?.message}
          />
          <Input 
            label="CPF/CNPJ"
            placeholder="CPF/CNPJ"
            {...register("cpf_cnpj", {
              required: strings.isRequired,
            })}
            error={errors.name?.message}
          />
          <Controller
            name="telephone"
            control={control}
            rules={{ required: strings.isRequired }}
            render={({
              field: {
                name, value, onChange,
              },
              fieldState: { error },
            }) => (
              <InputMask
                label="Telefone"
                mask="(99) 99999-9999"
                placeholder="Telefone"
                name={name}
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          </Grid>
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
            gap={{ base: 0, lg: 6 }}
          >
            <Input 
              label="Número de contrato"
              type="number"
              placeholder="Número de contrato"
              {...register("number_contract", {
                required: strings.isRequired,
              })}
              error={errors.name?.message}
            />
            <Controller
              name="date_contract"
              control={control}
              rules={{ required: strings.isRequired }}
              render={({
                field: {
                  name, value, onChange,
                },
                fieldState: { error },
              }) => (
                <InputDate 
                  label="Data de contrato"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="value_contract"
              control={control}
              rules={{ required: strings.isRequired }}
              render={({
                field: {
                  name, value, onChange,
                },
                fieldState: { error },
              }) => (
                <InputCurrency
                  label="Valor de contrato"
                  placeholder="R$ 0000,00"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </Grid>
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
            gap={{ base: 0, lg: 6 }}
          >
            <Box marginTop="4">
              <FormLabel
                htmlFor="contract_status"
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
              >
                Situação contrato
              </FormLabel>
              <Select 
                placeholder="Selecione uma situação"
                {...register("contract_status")}
              >
                <option value='Em Atraso'>Em Atraso</option>
                <option value='Dentro do Prazo'>Dentro do Prazo</option>
                <option value='Pago'>Pago</option>
              </Select>
            </Box>
            <Box marginTop="4">
              <FormLabel
                htmlFor="action"
                fontSize="sm"
                fontWeight="medium"
                color="gray.700"
              >
                Ação
              </FormLabel>
              <Select 
                placeholder="Selecione um ação"
                {...register("action")}
              >
                <option value='Agradecer Pagamento'>Agradecer Pagamento</option>
                <option value='Cobrar'>Cobrar</option>
                <option value='Cancelar Contrato'>Cancelar Contrato</option>
              </Select>
            </Box>
          </Grid>
          <HStack 
            justifyContent="flex-end"
            spacing={4}
            marginTop={9}
          >
            <Button variant="outline" onClick={() => navigate("/")} >
              Cancelar  
            </Button>
            <Button type="submit">
              Salvar alteração
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}