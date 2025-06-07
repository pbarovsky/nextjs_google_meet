import React, { useState, useEffect, useRef } from "react";
import Calendar from "./ui/Calendar";
import TimePicker from "./ui/Time";
import sc from "@styles/components/DatePicker.module.scss";
import Button from "../Button";
import { CalendarDays, X } from "lucide-react";
import Input from "../Input";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const formatDateTime = (date: string, time: string) => {
  const [yyyy, mm, dd] = date.split("-");
  return `${dd}.${mm}.${yyyy}, ${time}`;
};

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(value.slice(0, 10)); // YYYY-MM-DD
  const [time, setTime] = useState(value.slice(11, 16)); // HH:mm
  const [inputValue, setInputValue] = useState(
    formatDateTime(value.slice(0, 10), value.slice(11, 16))
  );

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(formatDateTime(date, time));
    onChange(formatDateTime(date, time));
  }, [date, time]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const parseInput = (input: string) => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4}),\s*(\d{2}):(\d{2})$/;
    const match = input.match(regex);

    if (match) {
      const [, dd, mm, yyyy, hh, min] = match;
      const validDate = `${yyyy}-${mm}-${dd}`;
      const validTime = `${hh}:${min}`;
      setDate(validDate);
      setTime(validTime);
      onChange(`${dd}.${mm}.${yyyy}, ${hh}:${min}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    parseInput(newVal);
  };

  return (
    <div className={sc.picker}>
      <div className={sc.wrapper}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="ДД.ММ.ГГГГ, ЧЧ:ММ"
          label="Start time"
        />
        <Button
          type="icon"
          className={sc.calendarBtn}
          onClick={() => setIsOpen(true)}
        >
          <CalendarDays />
        </Button>
      </div>

      {isOpen && (
        <div className={sc.backdrop}>
          <div className={sc.modal} ref={modalRef}>
            <Button
              className={sc.closeBtn}
              type="icon"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </Button>
            <Calendar value={date} onChange={setDate} />
            <TimePicker value={time} onChange={setTime} />
          </div>
        </div>
      )}
    </div>
  );
}
