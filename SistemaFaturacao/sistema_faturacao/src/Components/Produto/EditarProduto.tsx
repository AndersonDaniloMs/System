import { useForm } from "react-hook-form";
import { FaX } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { IInputs } from "@/Interfaces/IInputs";
import style from "./Editar.module.css";
import { useRouter } from "next/router";

export default function EditarProduto(props: IInputs) {
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [Mensagem, setMensagem] = useState("");
  const RegexNumeros = /^[1-9]\d*$/;
  const RegexCaracters = /^[A-Za-z\s]+$/;
  const RegexDecimais = /^\d+(\.\d{1,2})?$/;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: props.produtObject });
  const [categorias, setCategorias] = useState([]);

  const concluirEdicao = async () => {
    const produtoEditado = {
      nome: watch("nome"),
      estoque: watch("estoque"),
      codigoBarra: watch("codigoBarra"),
      descricao: watch("descricao"),
      preco: watch("precoUnitario"),
      categoria_id: watch("categoria_id"),
    };
    try {
      const response = await axios.put(
        `http://localhost:3001/api/produtos/${props.produtObject?.id}`,
        produtoEditado
      );
      if (response.status === 200) {
        setMostrarMensagem(true);
        setMensagem("Produto editado com sucesso!");
        setTimeout(() => {
          setMostrarMensagem(false);
          router.reload();
        }, 3000);
      } else {
        console.error("Erro ao editar produto:", response.data);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      // Trate o erro de forma mais específica para o usuário
      console.error("Erro ao editar produto:", error);
    }
  };

  useEffect(() => {
    const buscarCategoria = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categorias"
        );
        if (response.status === 200) {
          const categoriasData: [] = response.data;
          if (Array.isArray(categoriasData)) {
            setCategorias(categoriasData);
          } else {
            console.error("Erro ao buscar categorias: resposta não é um array");
          }
        } else {
          console.error("Erro ao buscar categorias:", response.data);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        // Trate o erro de forma mais específica para o usuário
        console.error("Erro ao buscar categorias:", error);
      }
    };
    buscarCategoria();
  }, []);

  return (
    <>
      <div className=" w-full bg-[#00000075] flex flex-col justify-center items-center fixed top-0 bottom-0 left-0 z-999">
        <form
          onSubmit={handleSubmit(concluirEdicao)}
          className="max-w-full m-8 p-8 flex flex-col justify-center items-center rounded-lg gap-5 shadow-2xl border bg-white"
        >
          {/*@Para Exibir a mensagem de sucesso */}
          {mostrarMensagem && (
            <p className="text-[#36bc8d] text-lg font-light text-center">
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
            Editar produto {""}
          </h1>
          {/* @Componente Inputs Nome Produto e Codigo de barra */}
          <div className=" flex gap-6">
            <div className=" flex flex-col">
              <label htmlFor="">Nome Produto</label>
              <input
                type="text"
                className={`${
                  errors?.nome && style.inputError
                } w-[200px] gap-1 float-end p-2 rounded-md border border-[#0000003a] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                {...register("nome", {
                  required: true,
                  validate: (nomeProd) => RegexCaracters.test(nomeProd),
                })}
                placeholder={"Novo nome do produto"}
              />
              {errors?.nome?.type === "required" && (
                <p className={style.errorMessage}>Preencha o campo </p>
              )}
              {errors?.nome?.type === "validate" && (
                <p className={style.errorMessage}>Digite apenas letras</p>
              )}
            </div>
            <div className=" flex flex-col">
              <label htmlFor="">Codigo de Barra</label>
              <input
                type="text"
                placeholder={"Novo código de Barra"}
                className={` ${
                  errors?.codigoBarra && style.inputError
                } w-[200px] gap-1 float-end p-2 rounded-md border border-[#0000003a] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                {...register("codigoBarra", {
                  required: true,
                  validate: (codBarra) => RegexNumeros.test(codBarra),
                  maxLength: 12,
                })}
              />
              {errors?.codigoBarra?.type === "required" && (
                <p className={style.errorMessage}>Preencha o campo </p>
              )}
              {errors?.codigoBarra?.type === "validate" && (
                <p className={style.errorMessage}>Digite apenas numeros</p>
              )}
              {errors?.codigoBarra?.type === "maxLength" && (
                <p className={style.errorMessage}>
                  Codigo de barra deve ter no maxímo 12 caracteres
                </p>
              )}
            </div>
          </div>

          {/* @Componente Inputs Preço e Estoque */}
          <div className="flex gap-6">
            <div className=" flex flex-col">
              <label htmlFor="">Preço</label>
              <input
                type="text"
                placeholder="Novo Preço"
                className={` ${
                  errors?.precoUnitario && style.inputError
                } w-[200px] gap-1 float-end p-2 rounded-md border border-[#0000003a] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                {...register("precoUnitario", {
                  required: true,
                  validate: (preco) => RegexNumeros.test(preco),
                })}
              />
              {errors?.precoUnitario?.type === "required" && (
                <p className={style.errorMessage}>Preencha o campo </p>
              )}
              {errors?.precoUnitario?.type === "validate" && (
                <p className={style.errorMessage}>
                  Preço deve ser um número positivo
                </p>
              )}
            </div>
            <div className=" flex flex-col">
              <label htmlFor="">Estoque</label>
              <input
                type="text"
                placeholder={"Novo estoque"}
                className={` ${
                  errors?.estoque && style.inputError
                } w-[200px] gap-1 float-end p-2 rounded-md border border-[#0000003a] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                {...register("estoque", {
                  required: true,
                  validate: (estoque) => RegexNumeros.test(estoque),
                })}
              />
              {errors?.estoque?.type === "required" && (
                <p className={style.errorMessage}>Preencha o campo </p>
              )}
              {errors?.estoque?.type === "validate" && (
                <p className={style.errorMessage}>
                  {" "}
                  estoque apenas numeros positivos{" "}
                </p>
              )}
            </div>
          </div>

          <div className=" w-full flex flex-col justify-start">
            <label htmlFor="categorias">Categorias</label>

            <select
              {...register("categoria", {
                required: true,
                validate: (value) => {
                  return value != "0";
                },
              })}
              className={`${errors?.categoria && style.inputError} 
            block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value={"0"}>Selecione uma nova categoria</option>
              {Array.isArray(categorias) &&
                categorias.map((categoria: any) => (
                  <option
                    key={categoria.id}
                    value={categoria.id}
                    className="text-[#263652e]"
                  >
                    {categoria.nomeCategoria}
                  </option>
                ))}
            </select>
          </div>

          {/* @Componente Textarea */}
          <div className="flex flex-col ">
            <label htmlFor="">Descrição</label>
            <textarea
              cols={58}
              rows={4}
              {...register("descricao", { required: true, maxLength: 50 })}
              placeholder={"Nova descrição do produto"}
              className={` ${
                errors?.descricao && style.inputError
              } p-2 rounded-md border border-[#0000003a] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
            />
            {errors?.descricao?.type === "maxLength" && (
              <p className={style.errorMessage}>
                Codigo de barra deve ter no maxímo 50 caracteres
              </p>
            )}
          </div>

          <div className="w-full justify-end">
            <button
              type="submit"
              className="max-w-full flex  items-center justify-end border gap-2 float-end p-2 rounded-lg bg-[#1c4b9bd4] text-white hover:bg-[#263652ef]"
            >
              <FaEdit /> Editar produto
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
