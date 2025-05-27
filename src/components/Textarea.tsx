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
  label = "Enter text",
  placeholder = "Type something...",
  maxLength = 500,
}: TextareaProps) {
  return (
    <div className={sc.textAreaWrapper}>
      <label className={sc.label}>{label}</label>
      <textarea
        className={sc.textArea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <span className={sc.focusBorder}></span>
    </div>
  );
}
