import { IInputs } from "@/Interfaces/IInputs";
export default function Input(props: IInputs) {
  return (
    <div className=" flex flex-col">
      <label htmlFor={props.name}>{props.text}</label>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.eventOnchange}
        className="w-[200px] gap-1 float-end p-2 rounded-md border border-[#0000003a] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
        placeholder={props.placeholder}
      />
    </div>
  );
}
