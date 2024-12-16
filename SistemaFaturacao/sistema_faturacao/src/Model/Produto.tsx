export class Produto {
  private id?:number;
  private nome: string;
  private preco: number;
  private estoque: number;
  private codigoBarra: string;
  private descricao: string;
  
  constructor(nome: string,preco:number,estoque:number,codigoBarra:string,descricao:string) {
    this.nome=nome;
    this.preco=preco;
    this.estoque=estoque;
    this.codigoBarra=codigoBarra;
    this.descricao=descricao;
  }
  public getId(): number|null|undefined {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getNome(): string {
    return this.nome;
  }
  public setNome(nome: string) {
    this.nome = nome;
  }
  public getPreco(): number {
    return this.preco;
  }
  public setPreco(preco: number) {
    this.preco = preco;
  }

  public getEstoque():number{
    return this.estoque;
  }
  public setEstoque(estoque:number){
    return this.estoque=estoque;
  }

  public getCodigoBarra():string{
    return this.codigoBarra;
  }
  public setCodigoBarra(codigoBarra:string){
    return this.codigoBarra=codigoBarra;
  }
  public getDescricao():string{
    return this.descricao;
  }
  public setDescricao(descricao:string){
    return this.descricao=descricao;
  }
}
