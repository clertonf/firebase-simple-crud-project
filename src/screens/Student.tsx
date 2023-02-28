import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Button } from '@components/Button';
import { Card, CardInfoProps } from '@components/Card';

import { Feather } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Heading, Icon, Text, VStack } from 'native-base';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Student() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [students, setStudents] = useState<CardInfoProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection('student')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as CardInfoProps[];
        setStudents(data);
      });

    return () => subscribe();
  }, []);

  async function handleAddNewStudent() {
    navigation.navigate('registerStudent');
  }

  function handleOpen(id: string) {
    navigation.navigate('updateStudent', { id });
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={16}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="white" size={6} mb={6} />
        </TouchableOpacity>
      </VStack>

      <VStack
        p={8}
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Heading
          color="gray.100"
          fontSize="lg"
          flexShrink={1}
          fontFamily="heading"
        >
          Lista de estudantes
        </Heading>

        <Button
          h={16}
          w={24}
          title="Cadastrar aluno"
          variant="outline"
          onPress={handleAddNewStudent}
        />
      </VStack>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            type="Estudante"
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        _contentContainerStyle={{
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há estudantes cadastrados
          </Text>
        )}
      />
    </VStack>
  );
}
