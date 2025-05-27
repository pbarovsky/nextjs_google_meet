import React from "react";
import sc from "../styles/components/Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={sc.button} onClick={onClick}>
      <span className={sc.buttonText}>{children}</span>
    </button>
  );
}
