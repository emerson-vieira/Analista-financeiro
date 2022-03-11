export default function transformStringToNumber(value: any): number {
  return Number(String(value).replace(/[^\d.,-]+/g, "").replace(/\./g, "").replace(/,/g, "."));
}
