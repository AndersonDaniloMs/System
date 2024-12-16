import { IInputs } from "@/Interfaces/IInputs";
import { Categoria } from "@/Model/Categoria";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import { FaPlus,FaX} from "react-icons/fa6";
import style from "./Categoria.module.css";
import { useCallback } from "react";



export default function AdicionarCategoria(props:IInputs){
  const{register,handleSubmit,formState:{errors},watch}=useForm();
  let nomeCategoria:string=watch('novaCategoria');
  const regex = /^[A-Za-z]+$/;
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mensagem,setMensagem]=useState("")
  const[Categorias,setCategorias]=useState<Categoria[]>([]);


const addCategory = useCallback(async () => {
  const categoria = new Categoria(nomeCategoria);
  try {
    const response = await axios.get(`http://localhost:3001/api/categorias`);
    const categorias = response.data;
    setCategorias(categorias);
    const categoryName = categoria.getNomeCategoria().toLowerCase();
    const singularOrPluralRegex = new RegExp(`^${categoryName.replace(/s$/, '')}(s)?$`, 'i');
    const existingCategory = categorias.find((cat: any) => singularOrPluralRegex.test(cat.nomeCategoria.toLowerCase()));

    if (existingCategory) {
      setMensagem("Categoria já registrada");
      setMostrarMensagem(true);
      setTimeout(() => {
        setMostrarMensagem(false);
      }, 3000);
    } else {
      try {
        const responsePost = await axios.post(`http://localhost:3001/api/categorias`, {
          nomeCategoria: categoria.getNomeCategoria(),
        });
        if (responsePost.status === 201 || responsePost.status === 200) {
          setMensagem("Categoria registrada com sucesso");
          setCategorias([...categorias, responsePost.data]);
          setMostrarMensagem(true);
          setTimeout(() => {
            setMostrarMensagem(false);
          }, 3000);
        } else {
          alert("Erro ao Registrar categoria");
        }
      } catch (error) {
        console.log("Erro ao Registrar categoria", error);
      }
    }
  } catch (error) {
    console.log("Erro ao buscar categorias", error);
  }
}, [nomeCategoria]); // Dependência de nomeCategoria



  useEffect(() => {
    if (nomeCategoria) {
      addCategory();
    }
  }, [nomeCategoria,addCategory]);


    return(
      <div className=" w-full bg-[#00000075] flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 z-999">
      <form onSubmit={handleSubmit(addCategory)}
        className="max-w-full m-8 p-8 flex flex-col justify-center items-center rounded-lg gap-5 shadow-2xl border bg-white"
      >
        {/*@Para Exibir a mensagem de sucesso */}
        {mostrarMensagem && (
          <p className=" text-[#36bc8d] text-lg font-light text-center">{mensagem}</p>
        )}

        <span className=" border flex justify-end text-[#1c4b9bd4] hover:bg-[#000000d4] hover:text-[#fff] p-3 rounded-full"
          onClick={props.closeModel}> <FaX />
        </span>

        <h1 className="max-w-full text-[#1c4b9bd4]  text-center font-bold p-2 text-2xl border-b border-b-[#0000002b]">
          Adicionar Categoria
        </h1>

        {/* @ Input Nova Categoria */}
        <div className=" flex flex-col gap-1">
          <label htmlFor="Categoria">Nova Categoria</label>
          <input placeholder="Nome da categoria" className={` w-[300px] p-2 rounded-md border border-[#0000003a] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors?.novaCategoria ? style.inputError:style.inputSucess}`} type={props.text} id="novaCategoria" {...register("novaCategoria",{required:true,validate:(validateRegex)=>regex.test(validateRegex),minLength:3,maxLength:50})} />

          {errors?.novaCategoria?.type === "required" && ( <p className={style.errorMessage}>Preencha o campo com nome da categoria</p>)}
          {errors?.novaCategoria?.type === "validate" && ( <p className={style.errorMessage}>Apenas letras e espaços</p>)}
          {errors?.novaCategoria?.type === "minLength" && ( <p className={style.errorMessage}>Nome deve ter no mínimo 3 caracteres</p>)}
          {errors?.novaCategoria?.type === "maxLength" && ( <p className={style.errorMessage}>Nome deve ter no maxímo 50 caracteres</p>)}
        </div>

        <div className="w-full justify-end">
          <button type="submit"
            className="max-w-full flex  items-center justify-end border gap-1 float-end px-5 py-1 rounded-lg bg-[#1c4b9bd4] text-white hover:bg-[#263652ef]">
            <FaPlus />Categoria 
          </button>
        </div>
        
      </form>
    </div>
  ); 
}


     {/*@Para Exibir a mensagem de sucesso
         {!mostrarMensagem && (
          <p className=" text-[#c34040] text-xl font-semibold text-center">Categoria já registrada</p>
        )}
           */}