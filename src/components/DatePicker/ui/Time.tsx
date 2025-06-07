import React, { useState, useEffect } from "react";
import Input from "../../Input";
import sc from "@/styles/components/Time.module.scss";

interface TimeProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Time({ value, onChange }: TimeProps) {
  const [hourStr, setHourStr] = useState(value.split(":")[0]);
  const [minuteStr, setMinuteStr] = useState(value.split(":")[1]);

  useEffect(() => {
    const [h, m] = value.split(":");
    setHourStr(h);
    setMinuteStr(m);
  }, [value]);

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  const handleHourChange = (val: string) => {
    if (/^\d{0,2}$/.test(val)) {
      setHourStr(val);
    }
  };

  const handleMinuteChange = (val: string) => {
    if (/^\d{0,2}$/.test(val)) {
      setMinuteStr(val);
    }
  };

  const handleBlur = () => {
    let h = parseInt(hourStr, 10);
    let m = parseInt(minuteStr, 10);

    if (isNaN(h)) h = 0;
    if (isNaN(m)) m = 0;

    h = clamp(h, 0, 23);
    m = clamp(m, 0, 59);

    const hStr = String(h).padStart(2, "0");
    const mStr = String(m).padStart(2, "0");

    setHourStr(hStr);
    setMinuteStr(mStr);

    onChange(`${hStr}:${mStr}`);
  };

  return (
    <div className={sc.time}>
      <Input
        type="text"
        inputMode="numeric"
        value={hourStr}
        onChange={(e) => handleHourChange(e.target.value)}
        onBlur={handleBlur}
        className={sc.timeInput}
        placeholder="HH"
      />
      <span>:</span>
      <Input
        type="text"
        inputMode="numeric"
        value={minuteStr}
        onChange={(e) => handleMinuteChange(e.target.value)}
        onBlur={handleBlur}
        className={sc.timeInput}
        placeholder="MM"
      />
    </div>
  );
}
