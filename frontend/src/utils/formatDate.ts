import { format, Locale } from "date-fns";

interface OptionsProps {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}
export default function formatDate(date: Date, pattern: string, options?: OptionsProps): string {
  if (!date) return "";
  return format(date, pattern, options);
}
