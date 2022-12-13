import React from 'react';

import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

type ButtonProps = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
};

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      w="full"
      h={12}
      mb={2}
      bg={variant === 'outline' ? 'transparent' : 'blue.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="blue.500"
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'blue.500',
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? '#3399ff' : 'white'}
        fontFamily="heading"
        fontSize="sm"
        textAlign="center"
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
