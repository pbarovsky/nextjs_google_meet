import sc from "../styles/components/Radio.module.scss";

interface RadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export default function Radio({ checked, onChange, label }: RadioProps) {
  return (
    <div className={sc.radioContent}>
      <label className={sc.radioLabel}>
        <input type="radio" checked={checked} onChange={onChange} />
        <div className={sc.transition}></div>
      </label>
      <div className={sc.textDesc}>
        <label className={sc.text}>{label}</label>
      </div>
    </div>
  );
}
