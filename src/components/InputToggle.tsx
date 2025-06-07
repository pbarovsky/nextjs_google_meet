import { ChangeEvent } from "react";
import sc from "@styles/components/InputToggle.module.scss";

interface InputToggleProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: "checkbox" | "radio";
  id: string;
}

export default function InputToggle({
  checked,
  onChange,
  label,
  type,
  id,
}: InputToggleProps) {
  return (
    <div className={sc.toggle_content}>
      <label
        htmlFor={id}
        className={type === "checkbox" ? sc.checkBox : sc.radioLabel}
      >
        <input id={id} type={type} checked={checked} onChange={onChange} />
        <div className={sc.transition}></div>
      </label>

      <label htmlFor={id} className={sc.text}>
        {label}
      </label>
    </div>
  );
}
