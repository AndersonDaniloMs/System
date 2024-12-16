export class Categoria{
  private id?:number|null;
  private nomeCategoria:string;
  
  public constructor(nomeCategoria:string){
    this.nomeCategoria=nomeCategoria;
  }
  public getNomeCategoria():string{
    return this.nomeCategoria;
  }
  public setNomeCategoria(nomeCategoria:string){
    this.nomeCategoria=nomeCategoria;
  }
  public getId():number | null | undefined{
    return this.id ;
  }
  public setId(id:number){
    this.id=id;
  }


}