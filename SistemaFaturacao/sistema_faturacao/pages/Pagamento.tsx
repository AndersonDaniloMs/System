import axios from "axios";
import { useState, useEffect, useRef } from "react";
import style from "@/Components/ProdutList.module.css";
import { useSelectedProducts } from "@/Hooks/SelectProdutsContext";
import NavAdm from "../src/Components/NavAdm";
import { FaPlus } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";

export default function Pagamento() {
  const [pagamentos, setPagamentos] = useState([]);
  const { FormatarNumero } = useSelectedProducts();
  const printFatura: any = useRef();

  const handleGeneratePrintPagamentos = useReactToPrint({
    content: () => printFatura.current,
  });

  useEffect(() => {
    const buscarTodosPagamentos = async () => {
      try {
        const responseGetAll = await axios.get("http://localhost:3001/api/pagamentos");
        if (responseGetAll.status === 200) {
          setPagamentos(responseGetAll.data);
        } else {
          console.log("Erro ao buscar as faturas.");
        }
      } catch (error) {
        console.log("Erro na requisição para buscar as faturas.");
      }
    };
    buscarTodosPagamentos();
  }, []);

  return (
    <main className="">
      <NavAdm />

      <section className={style.conteiner_Fatura}>
        <h1 className="text-center font-medium text-[25px] m-5 p-3 bg-[#263652ef] text-[#fff]">
          Pagamentos
        </h1>

        {pagamentos.length > 0 ? (
          <table className={style.table}>
            <thead>
              <tr>
                <th>#ID Pagamento</th>
                <th>Valor Pago</th>
                <th>Data Pagamento</th>
                <th>Método Pagamento</th>
                <th>Troco</th>
                <th>Dívida</th>
                <th>ID Fatura</th>
              </tr>
            </thead>
            <tbody>
              {pagamentos.map((pag: any) => (
                <tr key={pag.id}>
                  <td>{pag.id}</td>
                  <td>{pag.valorPago}</td>
                  <td>{new Date(pag.dataPagamento).toISOString().split("T")[0]}</td>
                  <td>{pag.metodoPagamento}</td>
                  <td>{FormatarNumero(pag.troco)} Kz</td>
                  <td>{FormatarNumero(pag.divida)} Kz</td>
                  <td>{pag.fatura_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="my-5 font-medium">Nenhum pagamento registrado.</p>
        )}

        <div className="w-full flex justify-start">
          <button
            className="flex items-center gap-2 mt-5 bg-[#263652ef] text-[#fff] p-2 rounded-[5px] hover:bg-[#263652ef]"
            onClick={handleGeneratePrintPagamentos}
          >
            <FaPlus />
            Gerar Relatório
          </button>
        </div>
      </section>
    </main>
  );
}
