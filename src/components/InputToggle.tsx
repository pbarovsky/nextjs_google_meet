import { ChangeEvent } from "react";
import sc from "../styles/components/InputToggle.module.scss";

interface InputToggleProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: "checkbox" | "radio";
}

export default function InputToggle({
  checked,
  onChange,
  label,
  type,
}: InputToggleProps) {
  return (
    <div className={sc.toggle_content}>
      <label className={type === "checkbox" ? sc.checkBox : sc.radioLabel}>
        <input type={type} checked={checked} onChange={onChange} />
        <div className={sc.transition}></div>
      </label>

      <label htmlFor={type} className={sc.text}>
        {label}
      </label>
    </div>
  );
}
