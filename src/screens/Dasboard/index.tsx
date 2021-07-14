import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, ITransactionCardData } from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles'

export interface IDataList extends ITransactionCardData {
  id: string
}

export function Dashboard() {
  const data: IDataList[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de Site",
      amount: "R$12.000,00",
      category:{
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "13/04/2021"
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgeria",
      amount: "R$59,00",
      category:{
        name: "Alimentação",
        icon: "coffee"
      },
      date: "12/04/2021"
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel Apartamento",
      amount: "R$1.500,00",
      category:{
        name: "Casa",
        icon: "shopping-bag"
      },
      date: "10/04/2021"
    },
  ]

  return (
    <Container>
      <Header>

        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://avatars.githubusercontent.com/u/41197767?v=4"}}/>

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Victor</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}} >
            <Icon name="power"/>
          </LogoutButton>
        </UserWrapper>

      </Header>

      <HighlightCards>
        <HighlightCard 
        title="Entrada"
        amount="R$420.69"
        lastTransaction="Última entrada dia 13 de Abril"
        type="up"
        />
        <HighlightCard 
        title="Saída"
        amount="R$1.259,00"
        lastTransaction="Última saída dia 1 de Abril"
        type="down"
        />
        <HighlightCard 
        title="Total"
        amount="R$696.969,20"
        lastTransaction="01 à 16 de Abril"
        type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  )
}