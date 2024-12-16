;
export class Pagamento{
  private dataPagamento:Date;
  private valorPago:number;
  private metodoPagamento:string;
  private troco:number;
  private divida:number;
  private idFatura:number
  
  constructor(dataPagamento:Date,valorPago:number,metodoPagamento:string,troco:number,divida:number,idFatura:number){
    this.dataPagamento=dataPagamento;
    this.valorPago = valorPago;
    this.metodoPagamento = metodoPagamento;
    this.troco = troco;
    this.divida = divida 
    this.idFatura=idFatura;
  }
  public getDataPagamento():Date{
    return this.dataPagamento;
  }
  public setDataPagamento(dataPagamento:Date){
    this.dataPagamento = dataPagamento;
  }
  public getValorPago():number{
    return this.valorPago;
  }
  public setValorPago(valorPago:number){
    this.valorPago = valorPago;
  }
  public getMetodoPagamento():string{
    return this.metodoPagamento;
  }
  public setMetodoPagamento(metodoPagamento:string){
    this.metodoPagamento = metodoPagamento;
  }
  public getTroco():number{
    return this.troco;
  }
  public setTroco(troco:number){
    this.troco = troco;
  }
  public getDivida():number{
    return this.divida;
  }
  public setDivida(divida:number){
    this.divida = divida;
  }
  public getIdFatura():number{
    return this.idFatura;
  }
  public setIdFatura(idFatura:number){
    this.idFatura = idFatura;
  }

 


}