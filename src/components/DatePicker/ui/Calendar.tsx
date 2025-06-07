import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../Button";

import sc from "@styles/components/Calendar.module.scss";

interface CalendarProps {
  value: string;
  onChange: (value: string) => void;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar({ value, onChange }: CalendarProps) {
  const [year, setYear] = useState<number>(parseInt(value.slice(0, 4)));
  const [month, setMonth] = useState<number>(parseInt(value.slice(5, 7)) - 1);
  const selectedDay = parseInt(value.slice(8, 10));

  useEffect(() => {
    onChange(
      `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    );
  }, [year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleDayClick = (day: number) => {
    onChange(
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    );
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  return (
    <div className={sc.calendar}>
      <div className={sc.header}>
        <Button type="icon" onClick={handlePrevMonth}>
          <ChevronLeft />
        </Button>
        <span>
          {months[month]} {year}
        </span>
        <Button type="icon" onClick={handleNextMonth}>
          <ChevronRight />
        </Button>
      </div>
      <div className={sc.days}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`${sc.day} ${day === selectedDay ? sc.selected : ""}`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
