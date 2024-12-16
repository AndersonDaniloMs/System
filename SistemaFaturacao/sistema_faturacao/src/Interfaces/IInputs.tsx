export interface IInputs {
  type?: string;
  name?: string;
  text?: string;
  id?: string;
  value?: any;
  eventOnchange?: React.ChangeEventHandler<HTMLInputElement> | any;
  placeholder?: any;
  cols?: number;
  rows?: number;
  array?: any;
  closeModel?: any;

  produtObject?: {
    id: number;
    estoque: string;
    codigoBarra: string;
    nome: string;
    descricao: string;
    precoUnitario: string;
    categoria: string;
    categoria_id:number
    // Add other properties as needed
  };
}
