import ListaProdutos from "@/Components/ListaProdutos";
import NavAdm from "@/Components/NavAdm";

export default function Products() {
  return (
    <>
      <NavAdm nome="Serpente" />
      <ListaProdutos name="Lista de Produtos" />
    </>
  );
}
