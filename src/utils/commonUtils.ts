export function snakeToCamel(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );
}

export function convertObjectKeysToCamel(obj: Record<string, any>) {
  const convertedObj: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const keyValue = obj[key];
    const camelCaseKey = snakeToCamel(key);

    convertedObj[camelCaseKey] =
      typeof keyValue === "object" && !Array.isArray(keyValue)
        ? convertObjectKeysToCamel(keyValue)
        : keyValue;
  });

  return convertedObj;
}
