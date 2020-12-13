export const getLngDict = async (locale: string) => {
  const { default: lngDict } = await import(`locales/${locale}.json`);

  return lngDict;
};
