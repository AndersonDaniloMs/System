import axios from "axios";
import { useEffect,useState } from "react";
import style from "@/pages/Vender.module.css";
import { useSelectedProducts } from '@/Hooks/SelectProdutsContext';

export default function CardProduto() {
  const { addProduct ,produts,setProduts } = useSelectedProducts();
  const [categories, setCategories] = useState([]);


  const FormatarNumero=(Numeros:number):string=>{
    const formattedPayment = new Intl.NumberFormat("pt-PT", {
      style: "decimal",
      minimumFractionDigits: 2,
    }).format(Numeros);
    return formattedPayment;
  }

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/categorias");
      if (response.status === 200) {
        setCategories(response.data);
        console.log("categorias carregados:", response.data);
      } else {
        console.log("Categorias não carregadas - ", "status:", response.status);
      }
    } catch (error: any) {
      console.log("Erro na requisição na api/categorias:", error);
    }
  };

  const getProduts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/produtos");
      if (response.status === 200) {
        setProduts(response.data);
        console.log("Produtos carregados:", response.data);
      } else {
        console.log("produtos não carregadas - ", "status:", response.status);
      }
    } catch (error: any) {
      console.log("Erro na requisição na api/produtos:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getProduts();
  }, []);

  const categoryProduts = (idProduts: number): string => {
    let nomeCategoria: string = "";
    categories.map((category: any) => {
      if (category.id === idProduts) {
        nomeCategoria = category.nomeCategoria;
      }
    });
    return nomeCategoria;
  };

  return (
    <div className={style.conteinerCards}>
      {produts.map((produto: any) => (
        <section key={produto.id} className={style.cards}>
          <h1 className="text-[25px] font-medium text-[#263652ef]">Produto: {produto.nome} </h1>
          <p className="text-[15px] font-normal"><span className="font-medium">Descrição:</span>  {produto.descricao}</p>
          <p className="text-[15px] font-normal"><span className="font-medium">Preço:</span>  { FormatarNumero(Number(produto.precoUnitario))} Kz</p>
          <p className="text-[15px] font-normal"><span className="font-medium">Quantidade disponível:</span>  {produto.estoque}</p>
          <p className="text-[15px] font-normal"><span className="font-medium">Categoria: </span> {categoryProduts(produto.categoria_id)}</p>
          <button 
            onClick={() => addProduct(produto)}
            className="border py-1 px-5 m-2 bg-[#ffffff] text-[#000] border-[#1a3f68] rounded-md hover:bg-[#1a3f68] hover:text-[#fff] transition-all">
            Adicionar
          </button>
        </section>
      ))}
    </div>
  );
};
