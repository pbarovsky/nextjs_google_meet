import React, { ChangeEvent } from "react";
import sc from "../styles/components/Textarea.module.scss";

interface TextareaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  maxLength?: number;
}

export default function Textarea({
  value,
  onChange,
  label,
  placeholder = "Type something...",
  maxLength = 500,
}: TextareaProps) {
  return (
    <label className={sc.label}>
      {label && <span>{label}</span>}
      <textarea
        className={sc.textArea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </label>
  );
}
