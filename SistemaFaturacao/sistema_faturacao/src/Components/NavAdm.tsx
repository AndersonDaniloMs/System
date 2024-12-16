import Link from "next/link";
import style from "./NavAdm.module.css";
import Image from "next/image";
import IconMenu from "../img/IconMenuB.png";
import { FaUser } from "react-icons/fa6";
import { IAdministrador } from "@/Interfaces/IAdministrador";
import { useRouter } from "next/router";

export default function NavAdm(props: IAdministrador) {
  const router = useRouter();
  const toggleMenu = () => {
    document.getElementById("MenuVertical")?.classList.toggle(style.active);
  };
  const handleLogout = () => {
    localStorage.removeItem("authenticated"); // Remove a chave de autenticação do localStorage
    router.push("/"); // Redireciona para a página de login após logout
  };

  return (
    <nav className={style.NavigatorAdm}>
      <div className={style.navigator_text_icon}>
        <Image
          className={style.navigator_icon}
          src={IconMenu}
          alt="logo"
          width={30}
          onClick={toggleMenu}
        />
        <h1>
          <Link  href={"/Administrador"}>Sistema De Faturação | <span className=" text-[0.7em]">{props.nome} </span></Link>
        </h1>
      </div>
      <ul className={style.navLinks_Horizontal}>
        <Link className={style.Link} href="/Vender">
          Vender
        </Link>
        <Link className={style.Link} href="/Fatura">
          Facturas
        </Link>
        <Link className={style.Link} href="/Products">
          Adicionar Produto
        </Link>
        {
          <Link className={style.Link} href="/Pagamento">
            Pagamentos
          </Link>
        }
        <Link className={style.Link} href="/categories">
          Relatórios
        </Link>
      </ul>

      <aside id="MenuVertical" className={style.MenuVertical}>
        <ul className={style.navLinks_Vertical}>
          <Link
            className={style.btnsair}
            href="/"
            onClick={() => handleLogout()}
          >
            Sair
          </Link>
        </ul>
      </aside>
    </nav>
  );
}
