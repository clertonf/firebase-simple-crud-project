import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  VStack,
  Text,
  Center,
  Heading,
  ScrollView,
  KeyboardAvoidingView,
  Icon,
  useToast,
} from 'native-base';

import firestore from '@react-native-firebase/firestore';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
  name: string;
  course: string;
  salary: number;
};

const signUpSchema = yup.object({
  name: yup
    .string()
    .required('Informe seu nome.')
    .min(2, 'Mínimo 2 caracteres')
    .max(30, 'Máximo 30 caracteres'),
  course: yup
    .string()
    .required('Informe seu curso.')
    .min(2, 'Mínimo 2 caracteres')
    .max(30, 'Máximo 30 caracteres'),
  salary: yup.number().required('Informe seu salário.'),
});

export function RegisterTeacher() {
  const navigation = useNavigation();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({ name, course, salary }: FormDataProps) {
    setLoading(true);
    firestore()
      .collection('teacher')
      .add({
        name,
        course,
        salary,
      })
      .then(() => {
        navigation.goBack();
        toast.show({
          title: 'Estudante cadastrado com sucesso',
          placement: 'top',
          bgColor: 'green.500',
        });
      })
      .catch((err) => {
        console.log(err);
        return toast.show({
          title: 'Houve um erro interno no sistema',
          placement: 'top',
          bgColor: 'red.500',
        });
      });
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView>
        <VStack
          px={8}
          bg="gray.600"
          pt={16}
          flexDirection="row"
          justifyContent="space-between"
        >
          <TouchableOpacity onPress={handleGoBack}>
            <Icon
              as={Feather}
              name="arrow-left"
              color="white"
              size={6}
              mb={6}
            />
          </TouchableOpacity>

          <Text color="gray.100" fontSize="lg" fontFamily="body">
            Professor
          </Text>

          <Icon
            as={FontAwesome5}
            name="university"
            color="gray.300"
            size={6}
            mb={6}
          />
        </VStack>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          backgroundColor="gray.700"
          showsVerticalScrollIndicator={false}
        >
          <VStack flex={1} px={10}>
            <Center>
              <Heading
                color="gray.100"
                fontSize="xl"
                mt={16}
                mb={6}
                fontFamily="heading"
              >
                Cadastrar professor
              </Heading>

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                    autoCorrect={false}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="course"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Curso"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.course?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="salary"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Salário"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value as any}
                    errorMessage={errors.salary?.message}
                  />
                )}
              />

              <Button
                title="Cadastrar"
                onPress={handleSubmit(handleSignUp)}
                isLoading={loading}
              />
            </Center>

            <Center flex={1} justifyContent="flex-end" mt={3} mb={12}>
              <Button title="Voltar" variant="outline" onPress={handleGoBack} />
            </Center>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
