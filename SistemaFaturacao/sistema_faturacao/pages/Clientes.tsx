import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Clientes() {
  const [clientes, setClientes] = useState<any>([]);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/pagamentos`);

      if (response.status === 200) {
        // produtos carregados com sucesso
        setClientes(response.data);
        console.log("Produtos carregados com sucesso:", response.data);
      } else {
        console.error("Erro ao buscar produtos:", response.data);
        // Exiba uma mensagem de erro para o usuário
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      // Trate o erro de forma mais específica para o usuário
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {clientes.map((cliente: any) => (
          <li key={cliente.id}>
            <p>
              {cliente.id} - {cliente.nome}-{cliente.descricao}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
