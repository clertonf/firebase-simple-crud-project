import React from 'react';

import { TouchableOpacity } from 'react-native';
import {
  Divider,
  Heading,
  HStack,
  Icon,
  Text,
  useToast,
  VStack,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { Feather, Ionicons } from '@expo/vector-icons';

export type CardInfoProps = {
  id: string;
  name: string;
  course: string;
  salary: number;
  ira: string;
};

type Props = {
  data: CardInfoProps;
  type: 'Estudante' | 'Professor';
  onPress?: () => void;
};

export function Card({ data, type, onPress }: Props) {
  const toast = useToast();

  function handleDelete() {
    if (type === 'Estudante') {
      firestore().collection('student').doc(data.id).delete();
    }
    firestore().collection('teacher').doc(data.id).delete();

    return toast.show({
      title: 'Usuário deletado!',
      placement: 'top',
      bgColor: 'red.500',
    });
  }

  return (
    <>
      <HStack
        w="full"
        px={5}
        py={4}
        mb={3}
        bg="gray.600"
        rounded="md"
        alignItems="center"
        justifyContent="space-between"
      >
        <VStack>
          <VStack w="full" flexDirection="row">
            {type === 'Professor' ? (
              <Icon
                as={Ionicons}
                name="school-outline"
                color="green.300"
                size={5}
                mr={2}
              />
            ) : null}
            <Heading
              color="white"
              fontSize="md"
              textTransform="capitalize"
              fontFamily="heading"
            >
              {type}
            </Heading>
            <Divider
              bg="emerald.500"
              thickness="2"
              mx="2"
              orientation="vertical"
            />
            {type === 'Estudante' ? (
              <Heading
                color="gray.100"
                fontSize="md"
                numberOfLines={3}
                fontFamily="heading"
              >
                IRA: {data.ira}
              </Heading>
            ) : (
              <Heading color="green.300" fontSize="sm" numberOfLines={3}>
                Salário{' - '}
                {new Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(data.salary)}
              </Heading>
            )}
          </VStack>

          <Text
            color="gray.100"
            fontSize="lg"
            flexGrow={1}
            ellipsizeMode="head"
            numberOfLines={2}
          >
            {data.name}
          </Text>

          <Text color="gray.100" fontSize="sm" numberOfLines={3}>
            Curso: {data.course}
          </Text>
        </VStack>
        <HStack>
          <TouchableOpacity onPress={onPress}>
            <Icon as={Feather} name="edit" color="green.300" size={5} mr={4} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Icon as={Feather} name="trash" color="red.300" size={5} />
          </TouchableOpacity>
        </HStack>
      </HStack>
    </>
  );
}
