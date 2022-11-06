const isInjectionString = (str: string) => {
  const injectionStrings = ["'", "select", "drop", "delete", "insert"];
  return injectionStrings.some((injectionString) =>
    str.includes(injectionString)
  );
};

const isInjectionRegex = (str: string) => {
  const regex = /['|";]/;
  return regex.test(str);
};

export const isStringValid = (str: string) => {
  return !isInjectionString(str) && !isInjectionRegex(str);
};
