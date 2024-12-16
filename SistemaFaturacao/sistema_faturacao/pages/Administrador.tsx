import NavAdm from "@/Components/NavAdm";
import style from "./Administrador.module.css";
import ListaProdutos from "@/Components/ListaProdutos";
import ListaAtendentes from "@/Components/ListaAtendentes";
export default function Administrador() {
  return (
    <main className={style.Administrador}>
      <NavAdm nome="" />
      <ListaAtendentes name="Todos Atendentes" />
    </main>
  );
}
