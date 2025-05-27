"use client";

import { useUser } from "@clerk/nextjs";
import sc from "../styles/pages/CreateMeetingsPage.module.scss";
import sc_loader from "../styles/components/Loader.module.scss";
import { Loader2 } from "lucide-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";

export default function CreateMeetingsPage() {
  const [description, setDescription] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");

  const client = useStreamVideoClient();

  const { user } = useUser();

  if (!client || !user) {
    return <Loader2 className={sc_loader.loader} />;
  }

  return (
    <div className={sc.meetings}>
      <h1>Welcome {user.username}</h1>
      <div className={sc.meetings_container}>
        <h2>Create a new meeting</h2>
        <DescriptionInput value={description} onChange={setDescription} />
        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />
      </div>
    </div>
  );
}

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

function DescriptionInput({ value, onChange }: DescriptionInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="">
      <div className="">Meetings info:</div>
      <label className={sc.checkbox}>
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            onChange("");
          }}
        />
        Add description
      </label>
      {active && (
        <label>
          <span>Description</span>
          <textarea
            className=""
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
          />
        </label>
      )}
    </div>
  );
}

interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

function StartTimeInput({ value, onChange }: StartTimeInputProps) {
  const [active, setActive] = useState(false);
  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  )
    .toISOString()
    .slice(0, 16);

  return (
    <div>
      <div>Meeting start: </div>
      <label className="">
        <input
          type="radio"
          checked={!active}
          onChange={() => {
            setActive(false);
            onChange("");
          }}
        />
        Start meeting immediately
      </label>
      <label className="">
        <input
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
            onChange(dateTimeLocalNow);
          }}
        />
        Start meeting at date/time
      </label>
      {active && (
        <label>
          <span>Start time</span>
          <input
            type="datetime-local"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className=""
            min={dateTimeLocalNow}
          />
        </label>
      )}
    </div>
  );
}

