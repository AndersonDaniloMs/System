export interface ISelected {
  array:  { id: string | number; nome: string }[];
  text: string;
  value: string | number;
  eventOnchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
