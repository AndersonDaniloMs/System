import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Teste() {
  const doc: any = useRef();
  const handleGerarPDF = useReactToPrint({
    content: () => doc.current,
  });
  return (
    <div>
      <button
        className="border px-16 py-2 my-5 text-[#fff] bg-slate-900"
        onClick={handleGerarPDF}
      >
        Imprimir
      </button>
      <section ref={doc}>
        <h1>Teste</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis,
          dolorum numquam non aperiam omnis odit quod veniam odio neque quidem,
          quas, rerum nihil fugit libero hic optio similique impedit distinctio.
        </p>
      </section>
    </div>
  );
}





/*

const buscarFaturas = async () => {
  try {
    const responseFatura = await axios.get("http://localhost:3001/api/Fatura");
    responseFatura.data.forEach((fatura:any)=>{
      const convertDataApi=new Date(fatura.dataEmissao).toISOString;
      const convertDataFatura=new Date(DadosFatura.getDataEmissao()).toISOString;

      if(convertDataApi === convertDataFatura){
       const dadosPagamento = new Pagamento(DadosFatura.getDataEmissao(), valorPago, "Cash", Troco, 0, fatura.id);
       criarPagamento(dadosPagamento);
      }
      else{
        console.log("Erro ao buscar Faturas"); 
      }
    })
  } catch (error) {
    console.log(error);
    console.log("Erro ao buscar Faturas");
  }
};

const criarPagamento = async (dadosPagamento:any) => {
  try {
    const novoPagamento = {
      dataPagamento: dadosPagamento.getDataPagamento(),
      valorPago: dadosPagamento.getValorPago(),
      metodoPagamento: dadosPagamento.getMetodoPagamento(),
      troco: dadosPagamento.getTroco(),
      divida: dadosPagamento.getDivida(),
      fatura_id: dadosPagamento.getIdFatura(),
    };
  
    const response = await axios.post("http://localhost:3001/api/pagamentos", novoPagamento);
    if (response.status === 201) {
      setPagamentos([...pagamentos, response.data]);
      console.log("Pagamento registrado com sucesso");
    } else {
      console.log("Erro ao registrar pagamento");
    }
  } catch (error) {
    console.log(error);
    console.log("Erro ao registrar pagamento");
  }
};

*/