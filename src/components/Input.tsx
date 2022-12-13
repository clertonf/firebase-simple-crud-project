import React from 'react';

import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from 'native-base';

type InputProps = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage, isInvalid, ...rest }: InputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.100"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray.500"
        fontFamily="body"
        mb={4}
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 2,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'white',
          borderWidth: 3,
          borderColor: 'blue.700',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
