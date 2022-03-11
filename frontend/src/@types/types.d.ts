export interface Options {
  label: string;
  value: string;
}

export interface ReactCurrencyInputProps {
  decimalSeparator?: string;
  thousandSeparator?: string;
  precision?: string;
  inputType?: string;
  prefix?: string;
  suffix?: string;
  allowNegative?: boolean;
  selectAllOnFocus?: boolean;
}
