import { ISelected } from "@/Interfaces/ISelected";
export default function componenteSelect(props:ISelected){
  return(
  <div className=" w-full flex flex-col justify-start">
      <label htmlFor="categorias" >Categorias</label>
      <select name="categoria" id="categoria"value={props.value}onChange={props.eventOnchange}
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
  <option value="">Selecione uma categoria</option>
  {props.array.map((categoria: any) => (
    <option key={categoria.id} value={categoria.id} className="text-[#263652e]">
      {categoria.nomeCategoria}
    </option>
  ))}
</select>

  </div>
  )
}