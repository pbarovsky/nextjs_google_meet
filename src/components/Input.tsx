import { ChangeEvent, FocusEvent } from "react";
import sc from "@styles/components/Input.module.scss";

interface InputProps {
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  label?: string;
  min?: number;
  max?: number;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "search"
    | "email"
    | "url";
  name?: string;
}

export default function Input({
  value,
  onChange,
  onBlur,
  placeholder = "",
  className = "",
  type = "text",
  label = "",
  min,
  max,
  inputMode,
  name,
}: InputProps) {
  return (
    <label className={sc.label}>
      {label && <span>{label}</span>}
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${sc.input} ${className}`}
        placeholder={placeholder}
        min={min}
        max={max}
        name={name}
      />
    </label>
  );
}
