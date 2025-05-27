import React from "react";
import sc from "../styles/components/Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className={sc.button}>
      <span className={sc.buttonText}>{children}</span>
    </button>
  );
}
