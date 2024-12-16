import axios from "axios";
import { useState, useEffect } from "react";
//@Icons
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
//@Interfaces
import { IPlaceholdersProdutos } from "@/Interfaces/IPlaceholders";
//@InputsProdutos
import Input from "./InputAddProduts/Input";
import Textarea from "./InputAddProduts/Textarea";
import Select from "./InputAddProduts/Select";
import { Produto } from "@/Model/Produto";

export default function AdicionarProdutos(props: IPlaceholdersProdutos) {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [codigoBarra, setCodigoBarra] = useState<string>("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [estoque, setEstoque] = useState("");
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [Mensagem, setMensagem] = useState("");
  const [produtos,setProdutos]=useState<Produto[]>([]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
      case "codigoBarra":
        setCodigoBarra(value);
        break;
      case "nome":
        setNome(value);
        break;
      case "descricao":
        setDescricao(value);
        break;
      case "precounitario":
        setPrecoUnitario(value);
        break;
      case "estoque":
        setEstoque(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleAdicionarProduto;
  });

  const handleAdicionarProduto = async (event: any) => {
    event.preventDefault();
    const novoProduto = {
      nome: nome,
      codigoBarra: codigoBarra,
      descricao: descricao,
      precoUnitario: precoUnitario,
      estoque: estoque,
      estado: "Dísponivel",
      categoria_id: selectedCategoria,
    };

    try {
      const responseGet = await axios.get(`http://localhost:3001/api/produtos`);
      
      if(responseGet.status===200){
        console.log(responseGet.data);
        setProdutos(responseGet.data);
        const ExisteProduto=produtos.find((prod:any)=>prod.codigoBarra===novoProduto.codigoBarra || prod.nome.toLowerCase().replace(/s$/, '') === novoProduto.nome.toLowerCase().replace(/s$/, ''));
          if(ExisteProduto){
            setMensagem("Produto já registrado");
            setMostrarMensagem(true);
            setTimeout(() => {
              setMostrarMensagem(false);
            }, 3000);
          }
          else{
            try {
              const responsePost = await axios.post("http://localhost:3001/api/produtos",novoProduto);
              if (responsePost.status === 200 || responsePost.status===201) {
                // Produto adicionado com sucesso
                setProdutos([...produtos,responseGet.data]);
                setMensagem("Produto adicionado com sucesso");
                setMostrarMensagem(true);
                // Oculte a mensagem após 3 segundos
                setTimeout(() => {
                  setMostrarMensagem(false);
                }, 3000);

                // Limpe os campos do formulário
                setNome("");
                setCodigoBarra("");
                setDescricao("");
                setPrecoUnitario("");
                setEstoque("");
              } else {
                console.error("Erro ao registrar produto:", responsePost.data);
                // Exiba uma mensagem de erro para o usuário
              }
            } catch (error) {
              console.error("Erro na requisição para registrar produto:", error);
            }
          }
      }else{
        console.log("Erro ao buscar produtos");
      }
    } catch (error) {
      console.error("Erro na requisição para registrar produto:", error);
    }
  };
  
  useEffect(() => {
    const buscarCategoria = async () => {
      try{
        const response = await axios.get("http://localhost:3001/api/categorias");
        if (response.status === 200) {
          setCategorias(response.data);
          console.log("Categorias buscadas com sucesso", response.data);
        }
        else {
          console.error("Erro ao buscar categorias:", response.data);
        }
      }catch (error) {
        console.error("Erro na requisição:", error);
        // Trate o erro de forma mais específica para o usuário
        console.error("Erro ao buscar categorias:", error);
      }
    };
    buscarCategoria();
  }, []);

  const handleCategoriaChange = (event: any) => {
    setSelectedCategoria(event.target.value);
  };

  return (
    <div className=" w-full bg-[#00000075] flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 z-999">
      <form
        onSubmit={handleAdicionarProduto}
        className="max-w-full m-8 p-8 flex flex-col justify-center items-center rounded-lg gap-5 shadow-2xl border bg-white"
      >
        {/*@Para Exibir a mensagem de sucesso */}
        {mostrarMensagem && (
          <p className=" text-[#36bc8d] text-lg font-light text-center">
            {Mensagem}
          </p>
        )}
        <span
          className=" border flex justify-end text-[#1c4b9bd4] hover:bg-[#000000d4] hover:text-[#fff] p-3 rounded-full"
          onClick={props.closeModel}
        >
          <FaX />
        </span>

        <h1 className="max-w-full text-[#1c4b9bd4]  text-center font-bold p-2 text-2xl border-b border-b-[#0000002b]">
          Adicionar Novo Produto
        </h1>
        {/* @Componente Inputs Nome Produto e Codigo de barra */}
        <div className=" flex gap-6">
          <Input
            type="text"
            name="nome"
            text="Nome Produto"
            id="nome"
            value={nome}
            eventOnchange={handleInputChange}
            placeholder={props.placeHnome}
          />
          <Input
            type="text"
            name="codigoBarra"
            text="Codigo de Barra"
            id="codigoBarra"
            value={codigoBarra}
            eventOnchange={handleInputChange}
            placeholder={props.placeHcodigoBarra}
          />
        </div>
        {/* @Componente Inputs Preço e Estoque */}
        <div className="flex gap-6">
          <Input
            type="text"
            name="precounitario"
            text="Preço Unitário"
            id="precounitario"
            value={precoUnitario}
            eventOnchange={handleInputChange}
            placeholder={props.placeHpreco}
          />
          <Input
            type="text"
            name="estoque"
            text="Estoque"
            id="estoque"
            value={estoque}
            eventOnchange={handleInputChange}
            placeholder={props.placeHestoque}
          />
        </div>

        <Select
          text="Selecione a categoria"
          value={selectedCategoria}
          eventOnchange={handleCategoriaChange}
          array={categorias}
        />

        {/* @Componente Textarea */}
        <div className="flex flex-col ">
          <Textarea
            name="descricao"
            text="Descrição"
            value={descricao}
            eventOnchange={handleInputChange}
            cols={58}
            rows={4}
            placeholder={props.placeHdescricao}
          />
        </div>

        <div className="w-full justify-end">
          <button
            type="submit"
            className="max-w-full flex  items-center justify-end border gap-2 float-end p-2 rounded-lg bg-[#1c4b9bd4] text-white hover:bg-[#263652ef]"
          >
            <FaPlus /> Adicionar produto
          </button>
        </div>
      </form>
    </div>
  );
}
