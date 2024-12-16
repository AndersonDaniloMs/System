"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import style from "@/Components/ProdutList.module.css";
import { useSelectedProducts } from "@/Hooks/SelectProdutsContext";
import NavAdm from "../NavAdm";
import { FaPlus } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";

export default function FaturaTabela() {
  const [faturas, setFaturas] = useState([]);
  const { FormatarNumero } = useSelectedProducts();
  const printFatura = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(true); // Indicador de carregamento

  const handleGeneratePrintFatura = useReactToPrint({
    content: () => printFatura.current,
  });

  // Buscar as faturas
  useEffect(() => {
    const buscarTodasFaturas = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/Fatura");
        if (response.status === 200) {
          setFaturas(response.data);
        } else {
          console.error("Erro ao buscar as faturas.");
        }
      } catch (error) {
        console.error("Erro na requisição para buscar as faturas.", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };
    buscarTodasFaturas();
  }, []);

  return (
    <main className="">
      <NavAdm />
      <section className={style.conteiner_produtosList}>
        <h1 className="text-center font-medium text-[25px]">Lista de Faturas</h1>
        {loading ? ( // Exibe carregamento enquanto os dados estão sendo buscados
          <p>Carregando faturas...</p>
        ) : (
          <table className={style.table}>
            <thead>
              <tr>
                <th>#ID Fatura</th>
                <th>Numero Fatura</th>
                <th>Data Emissão</th>
                <th>Iva</th>
                <th>Subtotal</th>
                <th>Total</th>
                <th>ID Cliente</th>
              </tr>
            </thead>
            <tbody>
              {faturas.length > 0 ? (
                faturas.map((fat: any) => (
                  <tr key={fat.id}>
                    <td>{fat.id}</td>
                    <td>{fat.numeroFatura}</td>
                    <td>{new Date(fat.dataEmissao).toISOString().split("T")[0]}</td>
                    <td>{Number(fat.iva).toFixed(2)}%</td>
                    <td>{FormatarNumero(fat.subtotal)} Kz</td>
                    <td>{FormatarNumero(fat.total)} Kz</td>
                    <td>{fat.cliente_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    Nenhuma fatura registrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* Formulário de impressão */}
      <form ref={printFatura} className="bg-[#00000006] mt-10">
        <h1 className="text-center font-medium text-[25px]">Relatório de Faturas</h1>
        <section className={style.conteiner_Fatura}>
          <table className={style.table}>
            <thead>
              <tr>
                <th>#Fatura</th>
                <th>Numero Fatura</th>
                <th>Data Emissão</th>
                <th>Subtotal</th>
                <th>Total</th>
                <th>Iva</th>
                <th>ID Cliente</th>
              </tr>
            </thead>
            <tbody>
              {faturas.length > 0 ? (
                faturas.map((fat: any) => (
                  <tr key={fat.id}>
                    <td>{fat.id}</td>
                    <td>{fat.numeroFatura}</td>
                    <td>{new Date(fat.dataEmissao).toISOString().split("T")[0]}</td>
                    <td>{FormatarNumero(fat.subtotal)} Kz</td>
                    <td>{FormatarNumero(fat.total)} Kz</td>
                    <td>{Number(fat.iva).toFixed(2)}%</td>
                    <td>{fat.cliente_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    Nenhuma fatura registrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
        <div className="w-full flex justify-start">
          <button
            type="button"
            className="flex items-center gap-2 mt-5 bg-[#00000075] text-[#fff] p-2 rounded-[5px] hover:bg-[#263652ef]"
            onClick={handleGeneratePrintFatura}
          >
            <FaPlus />
            Gerar Relatório
          </button>
        </div>
      </form>
    </main>
  );
}
