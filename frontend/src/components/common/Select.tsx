import type { SelectHTMLAttributes } from "react";


function Select(props : SelectHTMLAttributes<HTMLSelectElement>){
    return <select {...props}/>
}

export default Select;