import { forwardRef, SyntheticEvent } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Select,
  IconButton,
  InputProps,
} from "@chakra-ui/react";
import { getMonth, getYear } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import rangeOfNumbers from "../utils/rangeOfNumbers";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/components/InputDate.css";
import { InputMask } from "./InputMask";

interface InputDateProps {
  name: string;
  label?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  error?: string;
  helperText?: string;
  value?: Date | null | undefined;
  onChange?: (
    date: Date | [Date | null, Date | null] | null,
    event: SyntheticEvent<any> | undefined,
  ) => void;
  minDate?: Date;
}

interface HeaderProps {
  date: Date
  changeYear: (year: number) => void
  changeMonth: (month: number) => void
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
}

registerLocale("pt-BR", ptBR);
setDefaultLocale("pt-BR");
function Header({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: HeaderProps) {
  const years = rangeOfNumbers(1990, getYear(new Date()));
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      padding="2"
      backgroundColor="white"
    >
      <IconButton
        aria-label="Search database"
        variant="ghost"
        icon={(
          <i className="material-icons-outlined">
            chevron_left
          </i>
        )}
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <Select
        size="sm"
        maxWidth="28"
        padding="0"
        fontWeight="500"
        fontSize="sm"
        lineHeight="5"
        border="hidden"
        value={months[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </Select>
      <Select
        size="sm"
        maxWidth="20"
        padding="0"
        fontWeight="500"
        fontSize="sm"
        lineHeight="5"
        border="hidden"
        value={getYear(date)}
        onChange={({ target: { value } }) => changeYear(+value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </Select>
      <IconButton
        aria-label="Search database"
        variant="ghost"
        icon={(
          <i className="material-icons-outlined">
            chevron_right
          </i>
        )}
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </Flex>
  );
}

const ForwardedInputMask = forwardRef<HTMLInputElement, InputProps>(({
  ...rest
}: InputProps, ref) => (
  <InputMask
    marginTop="0"
    name=""
    mask="99/99/9999"
    ref={ref}
    {...rest}
  />
));

export function InputDate({
  name, label, isRequired, isDisabled, isReadOnly, error,
  helperText, onChange, value, minDate, ...rest
}: InputDateProps) {
  return (
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
      <DatePicker
        {...rest}
        id={name}
        name={name}
        selected={value}
        minDate={minDate}
        onChange={(date, event) => { if (onChange) onChange(date, event); }}
        readOnly={isReadOnly}
        placeholderText="Selecionar data"
        locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        customInput={<ForwardedInputMask />}
        disabled={isDisabled}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <Header
            date={date}
            changeYear={changeYear}
            changeMonth={changeMonth}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
            prevMonthButtonDisabled={prevMonthButtonDisabled}
            nextMonthButtonDisabled={nextMonthButtonDisabled}
          />
        )}
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
  );
}

InputDate.defaultProps = {
  label: "",
  minDate: undefined,
  isReadOnly: false,
  isDisabled: false,
  isRequired: false,
  error: "",
  helperText: "",
  value: undefined,
  onChange: undefined,
};
