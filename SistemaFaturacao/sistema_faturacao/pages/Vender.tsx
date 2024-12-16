"Use Client";
import NavAdm from "@/Components/NavAdm";
import style from "./Vender.module.css";
import CardProduto from "@/Components/Cards/CardProduto";
import { useSelectedProducts } from "@/Hooks/SelectProdutsContext";
import { useState, useEffect } from "react";
import { FaX,FaCheck } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Fatura } from "@/Model/Fatura";
import { Cliente } from "@/Model/Cliente";
import axios from "axios";
import { useRouter } from "next/router"; // Importar useRouter

function Vender() {
  //@Context
  const { selectedProducts, removeProduct, setProduts, clearProducts } =useSelectedProducts();

  //@Para ref a fatura e fazer Print
  const printFatura: any = useRef();
  //@Para validar dados de inputs
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Regex: any = /^[0-9]+(\.[0-9]{1,2})?$/;
  const regexBI = /^\d{9}([A-Z]{2})?\d{3}$/;
  const regexTelefone3 = /^9[0-9]{8}$/;
  const RegexEndereço = /^[\w\s,.#-]+$/;
  //@Dados da Fatura
  const [numeroFatura, setNumeroFatura] = useState("");
  const [dataEmissao, setDataEmissao] = useState<Date | any>();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [Total, setTotal] = useState<number>(0);
  const [iva, setIva] = useState(14);
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [Clientes, setClientes] = useState<Cliente[]>([]);

  const [isMostrarFatura, setIsMostrarFatura] = useState<Boolean>(false);

  const [isMostrarMensagem, setIsMostrarMensagem] = useState<Boolean>(false);
  //@Dados do Pagamento
  const watchValorPago: number = watch("valorPago");
  const valorPago = parseFloat(Number(watchValorPago).toFixed(2));
  const [Troco, setTroco] = useState<number>(0);

  const router = useRouter();

  // Função para calcular o subtotal dos produtos selecionados
  const calcularSubtotal = (): number => {
    let subtotal: number = 0;
    selectedProducts.forEach((product) => {
      subtotal += product.quantidade * product.precoUnitario;
    });
    return Number(subtotal.toFixed(2)); // Arredonda para 2 casas decimais
  };

  const calcularTotal = (): number => {
    let Total: number = calcularSubtotal() + calcularSubtotal() * (iva / 100);
    return Total;
  };

  const FormatarNumero = (Numeros: number): string => {
    const formattedPayment = new Intl.NumberFormat("pt-PT", {
      style: "decimal",
      minimumFractionDigits: 2,
    }).format(Numeros);
    return formattedPayment;
  };

  const calcularTroco = (Pagamento: number): number => {
    const total = calcularTotal();
    let troco: number = 0;
    if (Pagamento >= total) {
      troco = Pagamento - total;
      return troco;
    } else {
      return 0;
    }
  };

  const generateNFatura = (): string => {
    const Nfatura: string =
      "000" + String(Math.floor(Math.random() * 10000) + 1);
    return Nfatura;
  };
  const handleGeneratePrintFatura = useReactToPrint({
    content: () => printFatura.current,
  });

  const ExibirFatura = () => {
    setIsMostrarFatura(!isMostrarFatura);
  };

  const ProcederVenda = () => {
    if (selectedProducts.length > 0 && valorPago >= Total) {
      ExibirFatura();
    }
  };
  const activarBtnProceder = (): Boolean => {
    if (selectedProducts.length > 0 && valorPago >= Total) {
      return true;
    } else {
      return false;
    }
  };

  const getDateEmissaoFatura = (): Date => {
    const currentDate = new Date();
    return currentDate;
  };

  const handleRemoveProduct = (product: any) => {
    removeProduct(product);
    setProduts((prevProduts) =>
      prevProduts.map((p) =>
        p.id === product.id ? { ...p, estoque: p.estoque + 1 } : p
      )
    );
  };

  const concluirVenda = async () => {
    try {
      if (selectedProducts.length !== 0) {
        await verificar_RegistarCliente();
        clearProducts;
        setIsMostrarFatura(false);
        setIsMostrarMensagem(true);

  
        setTimeout(() => {
          setIsMostrarMensagem(false);
          router.reload();
        }, 3000);
  
      } else {
        console.log(
          "Nenhum produto selecionado. Não é possível concluir a venda."
        );
      }
    } catch (error) {
      console.log("Erro ao concluir a venda:", error);
    }
  };

  const verificarNfatura = async (NumeroFatura: Fatura): Promise <string | void> => {
      //console.log("Actual NºFatura:", NumeroFatura.getNumeroFatura());
    const existeFatura = faturas.find(fatura => {
      if (fatura instanceof Fatura) {
        return fatura.getNumeroFatura() === NumeroFatura.getNumeroFatura();
      }
      return false;
    });
    
    if (existeFatura) {
      console.log("Número de fatura já existe");
      NumeroFatura.setNumeroFatura(generateNFatura());
      console.log("Novo NºFatura:", NumeroFatura.getNumeroFatura());
      // Verificar novamente se o novo número gerado já existe
      return await verificarNfatura(NumeroFatura);
    } else {
      return NumeroFatura.getNumeroFatura();
    }
  };

  const AtualizarEstoqueProduto = async () => {
    try {
      const promises = selectedProducts.map(async (produto: any) => {
        if (produto.estoque > 0) {
          if (produto.estoque >= produto.quantidade) {
            const EstoqueActualizado = {
              estoque: produto.estoque - produto.quantidade,
            };
            try {
              const response = await axios.patch(
                `http://localhost:3001/api/produtos/${produto.id}/estoque`,
                EstoqueActualizado
              );
              if (response.status === 204 || response.status === 200) {
                //console.log(`Estoque : ${produto.estoque} atualizado com sucesso`);
              } else {
                console.log(
                  `Erro ao atualizar estoque do produto ${produto.nome}: ${response.status} ${response.statusText}`
                );
              }
            } catch (error) {
              console.log(
                `Erro ao atualizar estoque do produto ${produto.nome}: ${error}`
              );
            }
          } else {
            console.log(
              "Quantidade insuficiente em estoque para o produto",
              produto.nome
            );
          }
        } else {
          console.log(`Produto:${produto.nome} sem estoque:${produto.estoque}`);
        }
      });
      await Promise.all(promises);
    } catch (error) {
      console.log("Erro ao atualizar estoque do produto", error);
    }
  };

  const criarFatura = async (id:number) => {
    const DadosFatura = new Fatura(
      numeroFatura,
      dataEmissao,
      subTotal,
      Total,
      iva,
      id
    );
    const numeroFaturaVerificado = await verificarNfatura(DadosFatura);
    const novaFatura = {
      numeroFatura: numeroFaturaVerificado,
      dataEmissao: DadosFatura.getDataEmissao(),
      subtotal: DadosFatura.getSubTotal(),
      total: DadosFatura.getTotal(),
      iva: DadosFatura.getIva(),
      cliente_id: DadosFatura.getClientId(),
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/Fatura",
        novaFatura
      );
      if (response.status === 201) {
        const idFatura:number=response.data.id;
        setFaturas([...faturas, response.data]);
        await RegistraPagamento(idFatura);
        await AtualizarEstoqueProduto();
        handleGeneratePrintFatura();
        console.log("Fatura registrada com sucesso");
      } else {
        console.log("Erro ao registrar fatura");
      }
    } catch (error) {
      console.log(error);
      console.log("Erro ao registrar fatura");
    }
  };

  const verificar_RegistarCliente = async () => {
    const cliente = new Cliente(
      watch("nomeCompleto"),
      watch("bilheteIdentidade"),
      watch("telefone"),
      watch("endereco")
    );
    try {
      const novoCliente = {
        nome: cliente.getNome(),
        telefone: cliente.getTelefone(),
        bi: cliente.getBi(),
        endereco: cliente.getEndereco(),
      };
      const responseGet = await axios.get("http://localhost:3001/api/cliente");
      if (responseGet.status === 200) {
        const Cliente = responseGet.data;
        const existeCliente = Cliente.find(
          (cliente: any) => cliente.bi === novoCliente.bi
        );
  
        if (existeCliente) {
          cliente.setId(existeCliente.id); // Agora é seguro acessar existeCliente.id
          console.log("Cliente já existe");
          await criarFatura(cliente.getId());
        } else {
          await registrarCliente(novoCliente);
          console.log("Cliente registrado com sucesso");
        }
      }
    } catch (error) {
      console.log(error);
      console.log("Erro ao buscar clientes");
    }
  };
  

  const registrarCliente= async(novoCliente:{})=>{
    try {
      const responsePost = await axios.post("http://localhost:3001/api/cliente",novoCliente);
        if (responsePost.status === 201) {
          setClientes([...Clientes,responsePost.data]),
          await criarFatura(responsePost.data.id);
          console.log("Cliente registrado com sucesso");
        } else {
          console.log("Erro ao registrar cliente");
        }
    }catch (error) {
      console.log(error);
      console.log("Erro ao registrar cliente");

    }  
  }

  const RegistraPagamento = async (id:number)=>{
  const novoPagamento={
    metodoPagamento:"cash",
    valorPago:valorPago,
    dataPagamento:dataEmissao,
    troco:Troco,
    subTotal:subTotal,
    total:Total,
    divida:0,
    fatura_id:id
  }
  try {
    const responsePost =await axios.post("http://localhost:3001/api/pagamentos",novoPagamento);
    if(responsePost.status===200){
      console.log("Pagamento registrado com sucesso");
    }
    else{
      console.log("Erro ao registrar pagamento");
    }
  } catch (error) {
    console.log(error);
    console.log("Erro na requisição para registrar pagamento");
    }
  }

  useEffect(() => {
    setSubTotal(calcularSubtotal());
    setTotal(calcularTotal());
    setTroco(calcularTroco(valorPago));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts, valorPago]);

  //Para dados que necessitam atualizar uma vez
  useEffect(() => {
    setNumeroFatura(generateNFatura());
    setDataEmissao(getDateEmissaoFatura());
  }, []);

  return (
    <main className={style.main}>
      <NavAdm />
      <section className={style.conteinerVendas}>
        <aside className={style.asideLeftVender}>
          <section className="w-full flex justify-around mt-2   border-b relative">
            <p className=" text-[20px] text-[#000]">Produto</p>
            <p className="  text-[20px] text-[#000]">Preço</p>
          </section>

          {/*@Cards Itens Selecionados */}
          {selectedProducts.map((produto) => (
            <>
              <section  key={produto.id} className="w-full flex flex-col border rounded-md mt-5 p-2">
                <article className="w-full flex justify-end">
                  <button
                    className="text-[#fff] border bg-[#d23f3f] rounded-full p-1 mt-2"
                    onClick={() => handleRemoveProduct(produto)}
                  >
                    <FaX />
                  </button>
                </article>

                <article
                  key={produto.id}
                  className="w-full flex justify-around"
                >
                  <p>{produto.nome}</p>
                  <p className="text-[#3a8035] text-center">
                    {produto.quantidade * produto.precoUnitario},00 kz
                  </p>
                </article>

                <article>
                  <p className="ml-12">
                    {Number(produto.quantidade)} X{" "}
                    {Number(produto.precoUnitario).toFixed(2)} kz{" "}
                  </p>
                </article>
              </section>
            </>
          ))}

          <form className="w-full my-2" >
            <div className="p-2 flex flex-col justify-start">
              <div className=" flex flex-col justify-center gap-2 ">
                <label className="font-medium" htmlFor="">Nome cliente:</label>
                <input  className={`${errors?.nomeCompleto && style.inputErrorCliente} w-[300px] p-1   border border-[#00000026]`}type="text" {...register("nomeCompleto", { required: true, maxLength: 50, minLength: 3 })} />
                {errors?.nomeCompleto?.type === "required" && <p className={style.errorMessage}>Por favor, preencha o campo</p>}
                {errors?.nomeCompleto?.type === "minLength" && <p className={style.errorMessage}>deve ter no minímo 3 caracteres</p>}
                {errors?.nomeCompleto?.type === "maxLength" && <p className={style.errorMessage}>deve ter no maxímo 20 caracteres</p>}
                {errors?.nomeCompleto?.type !== "minLength" && errors?.nomeCompleto?.type!=="required" && errors?.nomeCompleto?.type!=="maxLength" && watch("nomeCompleto")  &&  <p className={style.errorMessageSucess}><FaCheck/> Nome válido</p>}
              </div>
             
              <div className=" flex  flex-col justify-center  gap-2 ">
                <label className="font-medium" htmlFor="">Telefone:</label>
                <input className={`${errors?.telefone && style.inputErrorCliente} p-1  border border-[#00000026]`} type="tel" {...register("telefone", { required: true, validate: (value) => regexTelefone3.test(value) })} placeholder="9XXXXXXXX" />
            {errors?.telefone?.type === "required" && <p className={style.errorMessage}>Por favor, preencha o campo</p>}
            {errors?.telefone?.type === "validate" && <p className={style.errorMessage}> número de telefone inválido</p>}
            {errors?.telefone?.type !== "validate" && errors?.telefone?.type!=="required" && watch("telefone") && <p className={style.errorMessageSucess}><FaCheck/> Telefone válido</p>}
              </div>

              <div  className="flex  flex-col justify-center  gap-2">
                  <label htmlFor="BI">Bilhete de Identidade <span className={style.asterisk}>*</span></label>
                  <input  className={`${errors?.bilheteIdentidade && style.inputErrorCliente} p-1  border border-[#00000026]`} type="text" {...register("bilheteIdentidade", { required: true, validate: (e) => regexBI.test(e) })} placeholder="insira o nº do seu BI" />
                  {errors?.bilheteIdentidade?.type === "required" && <p className={style.errorMessage}>Por favor, preencha o campo</p>}
                  {errors?.bilheteIdentidade?.type === "validate" && <p className={style.errorMessage}>Bilhete de identidade inválido </p>}
                  {errors?.bilheteIdentidade?.type !== "validate" && errors?.bilheteIdentidade?.type!=="required" && watch("bilheteIdentidade") &&  <p className={style.errorMessageSucess}><FaCheck/> Bilhete de identidade válido</p>}
              </div>

              <div  className="flex  flex-col justify-center  gap-2">
                  <label htmlFor="endereco">Endereço <span className={style.asterisk}>*</span></label>
                  <input  className={`${errors?.endereco && style.inputErrorCliente} p-1  border border-[#00000026]`} type="text" {...register("endereco", { required: true, validate: (e) => RegexEndereço.test(e) })} placeholder="insira o endereço" />
                  {errors?.endereco?.type === "required" && <p className={style.errorMessage}>Por favor, preencha o campo</p>}
                  {errors?.endereco?.type === "validate" && <p className={style.errorMessage}></p>}
                  {errors?.endereco?.type !== "validate" && errors?.endereco?.type!=="required" && watch("endereco") && <p className={style.errorMessageSucess} ><FaCheck/> Endereço válido</p>}
              </div>
            </div>
          </form>

          <article className="w-full justify-start m-5 ">
            <p className="text-[16px] capitalize font-medium ">
              Iva:{" "}
              <span className="text-[15px] capitalize font-normal ">
                {iva}%
              </span>
            </p>

            <p className="text-[16px] capitalize font-medium ">
              sub-Total:{" "}
              <span className="text-[15px] capitalize font-normal ">
                {FormatarNumero(subTotal)} kz
              </span>
            </p>

            <p className="text-[16px] capitalize font-medium ">
              Total:{" "}
              <span className="text-[15px] capitalize font-normal ">
                {FormatarNumero(Total)} Kz
              </span>
            </p>

            <p className="text-[16px] capitalize font-medium ">
              Valor Pago:
              <input
                className={`${
                  errors?.valorPago && style.inputError
                } font-normal ml-1 border`}
                type="text"
                {...register("valorPago", {
                  required: true,
                  validate: (value: string) => Regex.test(value),
                })}
              />
              {errors?.valorPago?.type === "required" && (
                <p className={style.errorMessage}>Pagamento obrigatório</p>
              )}
              {errors?.valorPago?.type === "validate" && (
                <p className={style.errorMessage}>Insira apenas numeros</p>
              )}
            </p>

            <p className="text-[16px] capitalize font-medium ">
              Troco:{" "}
              <span className="text-[15px] capitalize font-normal ">
                {FormatarNumero(Troco)} kz
              </span>
            </p>
          </article>

          {/*-------------------------------*/}
          {activarBtnProceder() ? (
            <button
              className=" text-[#fff] border w-[300px] bg-[#32704e] sticky  mt-5 rounded-lg p-3 hover:bg-[#2e5c43] "
              onClick={() => handleSubmit(ProcederVenda)()}
            >
              Proceder Venda
            </button>
          ) : (
            <button
              className=" text-[#fff] border w-[300px] bg-[#32704e] opacity-50 sticky  mt-5 rounded-lg p-3 hover:bg-[#2e5c43] pointer-events-none "
              onClick={() => handleSubmit(ProcederVenda)()}
            >
              Proceder Venda
            </button>
          )}
        </aside>

        <aside className={style.asideRightVender}>
          <CardProduto />
        </aside>
      </section>

      {isMostrarMensagem && (
        <div className=" w-full flex justify-center items-center bg-[#000000bf] z-[999999] fixed top-0 bottom-0 left-0 right-0">
          <h1 className=" font-bold text-[40px] text-[#46e776] ">
            Venda concluída
          </h1>
        </div>
      )}

      {isMostrarFatura && (
        <main className="w-full h-full flex flex-col items-center justify-center fixed top-0 bottom-0 bg-[#000000be] z-[9999] gap-1 p-4">
          <section className="m-5">
            <FaX
              className="w-[30px] h-[30px] p-1 rounded-full border  text-[#fff] placeholder:hover:scale-125 cursor-pointer"
              onClick={ExibirFatura}
            />
          </section>
          <section
            ref={printFatura}
            className="max-w-[800px] flex flex-col border p-5 bg-white overflow-y-auto rounded-md  "
          >
            <h1 className="text-center text-[20px] font-bold border-b p-5">
              FATURA
            </h1>

            <section className="grid grid-cols-2">
              <article className="w-full m-5">
                <p className="font-medium">
                  NºFatura: <span className="font-normal">{numeroFatura}</span>
                </p>
                <p className="font-medium">Nome: Sr. <span className="font-normal">{watch("nomeCompleto")}</span></p>
                <p className="font-medium">Número: <span  className="font-normal">{watch("telefone")}</span></p>
                <p className="font-medium">BI: <span  className="font-normal">{watch("bilheteIdentidade")} </span>  </p>
              </article>

              <article className="w-full m-5">
                <p className="font-medium">
                  Data de Emissão:{" "}
                  <span className="font-normal">
                    {dataEmissao?.toLocaleString()}
                  </span>
                </p>
              </article>
            </section>

            <article className="flex justify-between gap-5 m-5 font-medium">
              <p>Produto</p>
              <p>Qtd. x Preço</p>
            </article>

            {selectedProducts.map((produto) => (
              <article
                key={produto.id}
                className="max-w-full flex items-center justify-between mx-5 gap-2"
              >
                <p>{produto.nome}</p>
                <p className="w-[300px] border-b border-dashed border-[#000]"></p>
                <p>
                  {produto.quantidade} X {FormatarNumero(produto.precoUnitario)}{" "}
                  Kz
                </p>
              </article>
            ))}

            <article className="m-5">
              <p>
                <span className="font-medium">SubTotal:</span>{" "}
                {subTotal?.toFixed(2).replace(".", ",")} Kz
              </p>
              <p>
                <span className="font-medium">IVA:</span> {iva}%:{" "}
                {FormatarNumero((iva / 100) * subTotal)} Kz
              </p>
              <p>
                <span className="font-medium">Valor Pago:</span>{" "}
                {FormatarNumero(valorPago)} Kz
              </p>
              <p>
                <span className="font-medium">Troco:</span>{" "}
                {FormatarNumero(Troco)} Kz
              </p>
              <p className="text-right">
                <span className="font-medium capitalize text-[20px]">
                  Total:
                </span>{" "}
                {FormatarNumero(Total)} Kz
              </p>
            </article>

            <p className="text-center m-5 capitalize font-medium">
              Obrigado pela Preferência
            </p>
          </section>

          <article className="w-full flex justify-center p-2 relative">
            <button
              className="w-[150px] py-2 bg-[#263652ef] rounded-md text-[#fff] hover:bg-[#fff] transition-all hover:text-[#000]"
              onClick={concluirVenda}
            >
              Concluir venda
            </button>
          </article>
        </main>
      )}
    </main>
  );
}

export default Vender;
