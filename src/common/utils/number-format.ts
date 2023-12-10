export const currencyFormat = (
  value = 0,
  currency = "IDR",
  localeString = "id-ID"
) => {
  const numberedValue = Number(value);

  return numberedValue
    .toLocaleString(localeString, {
      style: "currency",
      currency,
    })
    .slice(0, -3);
};

export const compactNumber = (value?: string | number) => {
  const newValue = Number(value || 0);
  const formatter = new Intl.NumberFormat("id-ID", { notation: "compact" });
  return formatter.format(newValue);
};

export const thousandsFormat = (value: number | string, separator?: string) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator || ",");
};
