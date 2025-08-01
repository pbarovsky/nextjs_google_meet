import sc from "@styles/components/Button.module.scss";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "primary" | "icon";
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "primary",
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`${type === "primary" ? sc.button : sc.button_icon} ${className}`}
      onClick={onClick}
    >
      <span className={sc.buttonText}>{children}</span>
    </button>
  );
}
