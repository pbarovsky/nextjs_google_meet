import sc from "../styles/components/Radio.module.scss";

interface RadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export default function Radio({ checked, onChange, label }: RadioProps) {
  return (
    <div className={sc.radio_сontent}>
      <label className={sc.radio_label}>
        <input
          className={sc.radio}
          type="radio"
          checked={checked}
          onChange={onChange}
        />
        <div className={sc.transition}></div>
      </label>
      <label className={sc.text_desc} onClick={onChange}>
        {" "}
        {label}
      </label>
    </div>
  );
}
