export class Cliente {
  private id: number=0;
  private nome: string;
  private bi: string;
  private telefone: number;
  private endereco: string;

  public constructor(
    nome: string,
    bi: string,
    telefone: number,
    endereco: string
  ) {
    this.nome = nome;
    this.bi = bi;
    this.telefone = telefone;
    this.endereco = endereco;
  }
  public getId(): number {
    return this.id;
  }
  public getNome(): string {
    return this.nome;
  }
  public getBi(): string {
    return this.bi;
  }
  public getTelefone(): number {
    return this.telefone;
  }
  public getEndereco(): string {
    return this.endereco;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public setNome(nome: string): void {
    this.nome = nome;
  }
  public setBi(bi: string): void {
    this.bi = bi;
  }
  public setTelefone(telefone: number): void {
    this.telefone = telefone;
  }
  public setEndereco(endereco: string): void {
    this.endereco = endereco;
  }
}
