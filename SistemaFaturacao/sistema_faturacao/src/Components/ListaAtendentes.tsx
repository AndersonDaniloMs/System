import { Axios } from "axios";
import style from "./AtendentList.module.css";
import iconFilter from "../img/sort (1).png";
import Image from "next/image";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function ListaAtendentes(props: any) {
  return (
    <main className={style.container}>
      <div className={style.conteiner_allAtendenteList}>
        <h1>{props.nome}</h1>
      </div>
      <section className={style.conteiner_AtendenteList}>
        <table className={style.table}>
          <tbody>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Audair</td>
              <td>Atendente</td>
              <td>
                <button>
                  <FaEdit />
                </button>
                <button>
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
