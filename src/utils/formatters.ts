export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(price);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  }).format(value / 100);
};

export const formatInputPrice = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, "");

  const parts = cleanValue.split(".");
  if (parts.length > 2) {
    parts.splice(2, parts.length - 2);
  }

  if (parts[1]?.length > 3) {
    parts[1] = parts[1].slice(0, 3);
  }

  return parts.join(".");
};

export const parseInputPrice = (value: string): number => {
  return Number(value.replace(/[^\d.]/g, ""));
};
