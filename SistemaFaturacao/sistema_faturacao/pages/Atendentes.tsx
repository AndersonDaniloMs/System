import ListaAtendentes from "@/Components/ListaAtendentes";
import NavAdm from "@/Components/NavAdm";

export default function Atendentes() {
  return (
    <>
      <NavAdm nome="Serpente" />
      <ListaAtendentes name="Lista de Atendentes" />
    </>
  );
}
