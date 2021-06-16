import React from 'react';
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles'

interface ICategory {
  name: string
  icon: string
}

export interface ITransactionCardData {
  type: "positive" | "negative"
  title: string
  amount: string
  category: ICategory
  date: string
}

interface ITransactionCard {
  data: ITransactionCardData
}

export function TransactionCard({ data }: ITransactionCard) {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === "negative" && "- " }
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon}/>
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}