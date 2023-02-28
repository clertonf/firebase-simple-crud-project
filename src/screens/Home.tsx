import React from 'react';

import { VStack, Text, Image, ScrollView, Center, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { Button } from '@components/Button';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import LogoUFC from '@assets/logo-ufc.png';
import LogoFirebase from '@assets/firebase.png';
import LogoReactNative from '@assets/react-native.png';

export function Home() {
  const navigate = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateForRegisterStudent() {
    navigate.navigate('student');
  }

  function handleNavigateForRegisterTeacher() {
    navigate.navigate('teacher');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      backgroundColor="gray.700"
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <VStack alignItems="center">
          <Image
            source={LogoUFC}
            defaultSource={LogoUFC}
            alt="Logo da Universidade Federal do Ceará"
            resizeMode="contain"
            position="absolute"
            w={48}
            h={48}
            mt={24}
          />
        </VStack>

        <Center flex={1} mt={48} justifyContent="center" alignItems="center">
          <Text
            color="gray.100"
            fontWeight="bold"
            fontSize="lg"
            textAlign="center"
          >
            Escolha uma das seguintes opções para
            {'\n'} efetuar o cadastro:
          </Text>
          <VStack
            flexDirection="row"
            justifyContent="space-between"
            w="full"
            px="10"
            mt="10"
          >
            <Button
              title="Aluno"
              w="120"
              h="120"
              onPress={handleNavigateForRegisterStudent}
            />
            <Button
              title="Professor"
              w="120"
              h="120"
              onPress={handleNavigateForRegisterTeacher}
            />
          </VStack>

          <VStack
            w="full"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            mt={16}
            px="32"
          >
            <Image
              source={LogoFirebase}
              defaultSource={LogoFirebase}
              alt="Logo do Firebase"
              resizeMode="contain"
              w={16}
              h={16}
            />

            <Image
              source={LogoReactNative}
              defaultSource={LogoReactNative}
              alt="Logo do React Native"
              resizeMode="contain"
              w={16}
              h={16}
            />
          </VStack>
        </Center>
        <HStack
          w="full"
          justifyContent="center"
          alignItems="center"
          mb={getBottomSpace() + 4}
        >
          <Text
            color="gray.100"
            fontWeight="bold"
            fontSize="md"
            textAlign="center"
          >
            developed by: Clerton Filho
          </Text>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
