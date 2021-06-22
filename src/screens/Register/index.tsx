import React, { useState } from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { Button } from '../../components/Form/Button'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { Input } from '../../components/Form/Input'
import { InputForm } from '../../components/Form/InputForm'

import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategorySelect } from '../CategorySelect'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'
import { useForm } from 'react-hook-form'

interface IFormData {
  name: string
  amount: string
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required("Nome é obrigatório!"),
  amount: Yup
    .number()
    .typeError("Informe um valor numérico!")
    .positive("O valor não pode ser negativo!")
    .required("O valor é obrigatório!")
})

export function Register() {
  const [transactionType, setTransactionType] = useState("")
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleRegister(form: IFormData) {
    if(!transactionType) {
      return Alert.alert("Selecione o tipo de transação!")
    }

    if(category.key === "category") {
      return Alert.alert("Selecione a categoria!")
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm 
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm 
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}

            />

            <TransactionsTypes>
              <TransactionTypeButton 
                title="Income"
                type="up"
                onPress={() => handleTransactionTypeSelect("up")}
                isActive={transactionType === "up"}
              />
              <TransactionTypeButton 
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelect("down")}
                isActive={transactionType === "down"}
              />
            </TransactionsTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />

          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />

        </Form>

        <Modal
          visible={categoryModalOpen}
        >
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  )
}