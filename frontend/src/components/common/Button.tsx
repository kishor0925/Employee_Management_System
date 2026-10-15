import type { ButtonHTMLAttributes } from "react";

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}

export default Button;