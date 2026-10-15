import type { InputHTMLAttributes } from "react";

function Input(props : InputHTMLAttributes<HTMLInputElement>){
    return <input {...props}/>
}


export default Input;