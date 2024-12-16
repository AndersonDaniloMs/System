import style from "./Login.module.css";
import axios from "axios";
import { TfiAlert, TfiLoop } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Administrador } from "@/Model/Administrador";
import spin from "../img/icons8-spinner.gif";
import Image from "next/image";

export default function Login() {
  const [userAdmin, setUserAdmin] = useState([]);
  const [Message, setMessage] = useState<any>("");
  const [autenthicated, setAutenthicated] = useState<boolean>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const administradorModel = new Administrador();

  useEffect(() => {
    const estaAutenticado = localStorage.getItem("authenticated") === "true";
    if (estaAutenticado) {
      router.push("/Vender"); // Redireciona automaticamente se já estiver autenticado
    }
  }, [router]);

  const handleLogin = async (data: any) => {
    const { username, senha } = await data;
    administradorModel.setUsername(username);
    administradorModel.setSenha(senha);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/administrador/Login",
        administradorModel
      );

      if (response.status === 200) {
        localStorage.setItem("authenticated", "true"); // Define autenticado como true no localStorage
        setAutenthicated(true);
        setMessage(
          <>
            <Image src={spin} alt="Loading..." width={15} height={15} /> Logando
          </>
        );
        setTimeout(() => {
          setMessage("");
          router.push("/Vender");
        }, 3000);
      } else {
        setAutenthicated(false);
        setMessage(
          <>
            <TfiAlert /> Credenciais erradas
          </>
        );
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setAutenthicated(false);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage(
        <>
          <TfiAlert /> Credenciais erradas
        </>
      ); // Mensagem de erro genérico
    }
  };

  return (
    <main className={style.component_Login}>
      <section className={style.container_logger}>
        <h1>Sistema de Faturação</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className={style.Form_Logger}
        >
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            placeholder="Username"
            className={errors?.username && style.inputError}
            {...register("username", { required: true })}
          />
          {errors?.username?.type === "required" && (
            <p className={style.errorMessage}>Por favor, preencha o campo</p>
          )}

          <label htmlFor="Senha">Senha</label>
          <input
            type="password"
            placeholder="senha"
            className={errors?.senha && style.inputError}
            {...register("senha", {
              required: true,
              validate: (value) => administradorModel.getSenha() !== value,
            })}
          />
          {errors?.senha?.type === "required" && (
            <p className={style.errorMessage}>Por favor, preencha o campo</p>
          )}

          <button type="submit">Entrar</button>
          {autenthicated ? (
            <p
              className={
                " flex justify-center items-center gap-2 text-center text-md text-green-600"
              }
            >
              {Message}
            </p>
          ) : (
            <p
              className={
                " flex justify-center items-center gap-2 text-center text-md text-red-600"
              }
            >
              {Message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
