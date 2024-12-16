export class Fatura{
private id?:number;
  private numeroFatura:string;
  private dataEmissao:Date;
  private subtotal:number
  private total:number;
  private iva :number
  private cliente_id:number;
  
  public constructor(numeroFatura:string,dataEmissao:Date,subtotal:number,total:number,iva:number,cliente_id:number){
    this.numeroFatura=numeroFatura;
    this.dataEmissao=dataEmissao;
    this.subtotal=subtotal;
    this.total=total;
    this.iva=iva;
    this.cliente_id=cliente_id;
  }   
  public getNumeroFatura():string{
    return this.numeroFatura;
  }
  public getDataEmissao():Date{
    return this.dataEmissao;
  }
  public getSubTotal():number{
    return this.subtotal;
  }
  public getTotal():number{
    return this.total;
  }
  public getIva():number{
    return this.iva;
  }
  public setNumeroFatura(numeroFatura:string){
    this.numeroFatura=numeroFatura;
  }
  public setDataEmissao(dataEmissao:Date){
    this.dataEmissao=dataEmissao;
  }
  public setSubTotal(subTotal:number){
    this.subtotal=subTotal;
  }
  public setTotal(total:number){
    this.total=total;
  }
  public setIva(iva:number){
    this.iva=iva;
  }
  public setClientId(cliente_id:number){
    this.cliente_id=cliente_id;
  }
  public getClientId():number{
    return this.cliente_id;
  }



}