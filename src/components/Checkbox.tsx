import { ChangeEvent } from "react";
import sc from "../styles/components/Checkbox.module.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <div className={sc.checkbox_content}>
      <label className={sc.checkBox}>
        <input type="checkbox" id="ch1" checked={checked} onChange={onChange} />
        <div className={sc.transition}></div>
      </label>
      <div className={sc.textDesc}>
        <label htmlFor="ch1" className={sc.text}>
          {label}
        </label>
      </div>
    </div>
  );
}
