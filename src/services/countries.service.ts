import { Country } from "../interfaces/countries.interface";

export const get = async (): Promise<Array<string>> => {
  const response: Response = await fetch(process.env.REACT_APP_API_URL || "");

  if (!response.ok) return [];

  const { data }: { data: Array<Country> } = await response.json();

  return data
    .map((country: Country): string => country.country)
    .sort((a: string, b: string): number => a.localeCompare(b));
};
