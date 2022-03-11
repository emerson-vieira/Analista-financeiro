import { forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  marginTop?: string;
  isRequired?: boolean;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    name, label, isRequired, error, helperText, marginTop, ...rest
  }: InputProps, ref) => (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error}
      marginTop={marginTop}
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
        {...rest}
        ref={ref}
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

Input.defaultProps = {
  label: "",
  marginTop: "4",
  isRequired: false,
  error: "",
  helperText: "",
};
