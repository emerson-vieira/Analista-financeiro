import { Box, Button, Flex, Grid, Heading, HStack, useToast } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { InputCurrency } from "../../components/InputCurrency";
import { InputMask } from "../../components/InputMask";
import { InputDate } from "../../components/InputDate";

import { createCustomer } from "../../services/customer.service";
import { CustomerForm } from "../../@types/customser";
import { strings } from "../../utils/strings";
import cleanMask from "../../utils/cleanMask";
import transformStringToNumber from "../../utils/transformStringToNumber";

export function CreateCustomer() {
  const toast = useToast();
  const navigate = useNavigate()
  const {
    register, handleSubmit, control, formState: { errors },
  } = useForm<CustomerForm>();

  async function onSubmit(customer: CustomerForm) {
    try {
      await createCustomer({
        ...customer,
        telephone: cleanMask(customer.telephone),
        value_contract: transformStringToNumber(customer.value_contract),
      });
      toast({
        title: "Cliente criado com sucesso!",
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
            <InputMask
              label="Telefone"
              mask="(99) 99999-9999"
              maskPlaceholder={null}
              placeholder="Telefone"
              {...register("telephone", {
                required: strings.isRequired,
              })}
              error={errors.name?.message}
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
          <HStack 
            justifyContent="flex-end"
            spacing={4}
            marginTop={9}
          >
            <Button variant="outline" onClick={() => navigate("/")} >
              Voltar  
            </Button>
            <Button type="submit">
              Adicionar cliente
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  )
}