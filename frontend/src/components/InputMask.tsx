import { forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  FormHelperText,
  ResponsiveValue,
} from "@chakra-ui/react";
import ReactInputMask, { BeforeMaskedStateChangeStates, InputState } from "react-input-mask";

export type Union<T> = T | (string & {})

interface InputWithMaskProps extends ChakraInputProps {
  name: string;
  label?: string;
  marginTop?: ResponsiveValue<Union<string | number | (string & {})>> | undefined;
  mask: string | Array<(string | RegExp)>;
  beforeMaskedStateChange?(states: BeforeMaskedStateChangeStates): InputState;
  maskPlaceholder?: string | null | undefined;
  isRequired?: boolean;
  error?: string;
  helperText?: string;
}

export const InputMask = forwardRef<HTMLInputElement, InputWithMaskProps>(
  ({
    name, label, mask, isRequired, error, marginTop,
    helperText, beforeMaskedStateChange, maskPlaceholder, ...rest
  }: InputWithMaskProps, ref) => (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error}
      marginTop={marginTop || "4"}
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
        as={ReactInputMask}
        mask={mask}
        maskPlaceholder={maskPlaceholder}
        beforeMaskedStateChange={beforeMaskedStateChange}
      />
      {helperText && (
        <FormHelperText
          fontSize="xs"
          color="gray.400"
        >
          {helperText}
        </FormHelperText>
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  ),
);

InputMask.defaultProps = {
  label: "",
  marginTop: "4",
  isRequired: false,
  error: "",
  helperText: "",
  beforeMaskedStateChange: undefined,
  maskPlaceholder: undefined,
};
