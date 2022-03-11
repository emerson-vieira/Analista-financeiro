import { ChangeEventHandler, forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import CurrencyInput from "react-currency-input";

import { ReactCurrencyInputProps } from "../@types/types";

interface InputCurrencyProps extends ChakraInputProps, ReactCurrencyInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  error?: string;
  helperText?: string;
  value?: string | number;
  onValueChange?: (event: ChangeEventHandler<HTMLInputElement>) => void;
}

export const InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>(
  ({
    name, label, isRequired, error, helperText, value, onValueChange, ...rest
  }: InputCurrencyProps, ref) => (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error}
      marginTop="4"
    >
      {label && (
      <FormLabel
        htmlFor={name}
        fontSize="sm"
        fontWeight="medium"
        color="gray.700"
      >
        {label}
      </FormLabel>
      )}
      <ChakraInput
        id={name}
        name={name}
        ref={ref}
        as={CurrencyInput}
        decimalSeparator=","
        thousandSeparator="."
        precisin={2}
        value={value}
        onChangeEvent={onValueChange}
        {...rest}
      />
      {helperText && (
        <FormHelperText
          fontSize="xs"
          color="gray.400"
        >
          {helperText}
        </FormHelperText>
      )}
      <FormErrorMessage fontSize="xs" marginTop="0">{error}</FormErrorMessage>
    </FormControl>
  ),
);

InputCurrency.defaultProps = {
  label: "",
  isRequired: false,
  onValueChange: undefined,
  value: undefined,
  error: "",
  helperText: "",
};
