import React from 'react';
import { Text, Button } from 'react-native';

import { Container } from "./styles";

const Logon: React.FC = ({ route, navigation }) => {
  const { profile } = route.params;
  console.log(profile)
  return (
    <Container profile={profile}>
       <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Text>
        { profile }
      </Text>
    </Container>
  );
}

export default Logon;