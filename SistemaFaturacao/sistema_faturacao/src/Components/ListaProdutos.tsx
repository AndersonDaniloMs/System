import style from "./ProdutList.module.css";
//import iconFilter from "../img/sort (1).png";
import { FaTrash, FaEdit, FaSearch, FaPlus } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelectedProducts } from "@/Hooks/SelectProdutsContext";
import AdicionarProdutos from "./AdicionarProduto";
import AdicionarCategoria from "./Categorias/AdicionarCategoria";
import { Produto } from "@/Model/Produto";
import EditarProduto from "./Produto/EditarProduto";


export default function ListaProdutos(props: any) {
  const [produtos, setProdutos] = useState([]);
  const [filtrar, setFiltrar] = useState("");
  const [isAddProdut, setAddProdut] = useState(false);
  const [isAddCategory, setAddCategory] = useState(false);
  const [isEditarProduto, setEditarProduto] = useState(false);
  const [prodEditado, setprodEditado] = useState<any>([]);
  const{FormatarNumero}=  useSelectedProducts();

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/produtos`);
      if (response.status === 200) {
        // produtos carregados com sucesso
        setProdutos(response.data);
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

  const RemoverProduto = async (produtoId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/produtos/${produtoId}`
      );
      if (response.status === 200) {
        console.log("Produto removido com sucesso id:" + response.data.id);
        //Atualiza a lista de produtos
        fetchProdutos();
      } else {
        console.error("Erro ao remover produto" + response.data);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };


  const editarProduto = async (produtoId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/produtos/${produtoId}`
      );
      if (response.status === 200) {
        console.log("Produto Editado com sucesso id:" + response.data.id);
        //Atualiza a lista de produtos
        fetchProdutos();
      } else {
        console.error("Erro ao remover produto" + response.data);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const produtosPorId = async (produtoId: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/produtos/${produtoId}`);
      if (response.status === 200) {
        //produto carregado com sucesso
        setprodEditado(response.data)
        setEditarProduto(true);
        //console.log("Produto carregado com sucesso:",prodEditado);
      } else {
        console.error("Erro ao buscar produto:", response.data.id);
        // Exiba uma mensagem de erro para o usuário
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      // Trate o erro de forma mais específica para o usuário
    }
  };

  useEffect(() => {
    console.log("Produto carregado com sucesso:", prodEditado);
  }, [prodEditado]);
  
  useEffect(() => {
    fetchProdutos();
  }, []);

  const ativeModelProduct= () => {
    setAddProdut(!isAddProdut);
  };
  const ativeModelCategory = () => {
    setAddCategory(!isAddCategory);
  };
  const ativeModelEditarProduto = () => {
    setEditarProduto(!isEditarProduto);
  };

  // Função para atualizar o valor de pesquisa
  const handleFiltrarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltrar(event.target.value);
  };

  // Filtrando produtos com base no codigo de barra
  const filteredProdutos = produtos.filter((produto: any) =>
    String(produto.codigoBarra).toLowerCase().includes(filtrar.toLowerCase())
  );

  return (
    
    <main className={style.container}>
      <div className={style.conteiner_allprodutosList}>
        <h1>{props.name}</h1>
        <div className="flex justify-center items-center my-2 p-5 gap-x-3">
          <label
            className="p-3 bg-[#1c4b9bd4] rounded-full cursor-pointer"
            htmlFor=""
          >
            <FaSearch color="#fff" />
          </label>
          <input
          type="search"
          className="w-[280px] rounded-md border py-2 px-5 outline-none focus:ring-1 focus:ring-[#1c4b9bd4] focus:border-transparent"
          placeholder="Pesquisar produto pelo Codigo"
          value={filtrar}
          onChange={handleFiltrarChange}
        />

        </div>
      </div>
      <section className={style.conteiner_produtosList}>
        <table className={style.table}>
          <tr>
            <th># Produto</th>
            <th>Código de Barras</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço Unitario</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
          {filteredProdutos.length > 0 ? (
            filteredProdutos.map((produto: any) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.codigoBarra}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao || "Descrição não disponível"}</td>
                <td>{FormatarNumero(produto.precoUnitario)} Kz</td>
                <td>{produto.estoque}</td>
                <td>{produto.estado}</td>
                <td>
                  {new Date(produto.createdAt).toISOString().split("T")[0]}
                </td>
                <td>
                  <button className="bg-[#1c4b9bd4] text-center" onClick={()=>produtosPorId(produto.id)}>
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-700"
                    onClick={() => RemoverProduto(produto.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p className="my-5 font-medium ">Nenhum produto registrado.</p>
          )}
        </table>

        <div className=" w-full flex justify-between">
          <button
            className="flex items-center fixed bottom-5 gap-2 mt-5 bg-[#1c4b9bd4] text-[#fff] p-2 rounded-[5px] hover:bg-[#263652ef]"
            onClick={ativeModelProduct}
          >
            <FaPlus />
            Novo Produto
          </button>
          <button
            className="flex items-center fixed left-[200px] bottom-5 gap-2 mt-5 bg-[#1c4b9bd4] text-[#fff] p-2 rounded-[5px] hover:bg-[#263652ef]"
            onClick={ativeModelCategory}
          >
            <FaPlus />
            Nova Categoria
          </button>
        </div>
        {isAddProdut && (
          <AdicionarProdutos
            placeHnome="Nome do produto"
            placeHcodigoBarra="Código de Barra"
            placeHestoque="Quantidade no estoque"
            placeHpreco="Preço unitário"
            placeHdescricao="Descrição do produto"
            closeModel={ativeModelProduct}

          />
        )}

        {isAddCategory && (
            <AdicionarCategoria text="text" closeModel={ativeModelCategory}/>
        )}
        
        {isEditarProduto &&(
          <EditarProduto closeModel={ativeModelEditarProduto} produtObject={prodEditado} />
        )}
      </section>
    </main>
  );
}
