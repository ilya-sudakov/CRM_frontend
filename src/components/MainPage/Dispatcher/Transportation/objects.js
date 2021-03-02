export const transportationDefaultInputs = [
  { name: "date", defaultValue: new Date(), isRequired: true, isValid: true },
  { name: "cargo", defaultValue: "", isRequired: true },
  { name: "quantity", defaultValue: "" },
  {
    name: "sender",
    defaultValue: "ЦехЛЭМЗ",
    isRequired: true,
    isValid: true,
  },
  {
    name: "recipient",
    defaultValue: "ЦехЛЭМЗ",
    isRequired: true,
    isValid: true,
  },
  { name: "driver", defaultValue: "", isRequired: true },
];
