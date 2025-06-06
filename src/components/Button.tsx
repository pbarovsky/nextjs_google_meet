import React from "react";
import sc from "../styles/components/Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: "primary" | "icon";
}

export default function Button({
  children,
  onClick,
  type = "primary",
}: ButtonProps) {
  return (
    <button
      className={type === "primary" ? sc.button : sc.button_icon}
      onClick={onClick}
    >
      <span className={sc.buttonText}>{children}</span>
    </button>
  );
}
