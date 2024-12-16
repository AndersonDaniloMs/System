import { IInputs } from "@/Interfaces/IInputs";
export default function Textarea(props: IInputs) {
  return (
    <div className=" flex flex-col">
      <label htmlFor={props.name}>{props.text}</label>
      <textarea
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.eventOnchange}
        cols={props.cols}
        rows={props.rows}
        className=" p-2 rounded-lg border border-[#0000003a] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm   "
        placeholder={props.placeholder}
        style={{resize:"none"}}
      />
    </div>
  );
}
