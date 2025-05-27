"use client";

import { useUser } from "@clerk/nextjs";
import sc from "../styles/pages/CreateMeetingsPage.module.scss";
import sc_loader from "../styles/components/Loader.module.scss";
import { Loader2 } from "lucide-react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";
import Checkbox from "@/components/Checkbox";
import Radio from "@/components/Radio";
import Textarea from "@/components/Textarea";

export default function CreateMeetingsPage() {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [participantsInput, setParticipantsInput] = useState("");
  const [call, setCall] = useState<Call>();

  const client = useStreamVideoClient();

  const { user } = useUser();

  async function createMeeting() {
    if (!client || !user) {
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          custom: {
            description: descriptionInput,
          },
        },
      });

      setCall(call);
    } catch (error) {
      console.log(error);
      alert("Error creating meeting");
    }
  }

  if (!client || !user) {
    return <Loader2 className={sc_loader.loader} />;
  }

  return (
    <div className={sc.meetings}>
      <h1>Welcome {user.username}</h1>
      <div className={sc.meetings_container}>
        <h2>Create a new meeting</h2>
        <DescriptionInput
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />
        <ParticipantInput
          value={participantsInput}
          onChange={setParticipantsInput}
        />
        <button className="" onClick={createMeeting}>
          Create meeting
        </button>
      </div>
      {call && <MeetingLink call={call} />}
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
      <Checkbox
        checked={active}
        onChange={(e) => {
          setActive(e.target.checked);
          onChange("");
        }}
        label="Add description"
      />
      {active && (
        <label>
          <span>Description</span>
          <Textarea
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
      <Radio
        checked={!active}
        onChange={() => {
          setActive(false);
          onChange("");
        }}
        label="Start meeting immediately"
      />
      <Radio
        checked={active}
        onChange={() => {
          setActive(true);
          onChange(dateTimeLocalNow);
        }}
        label="Start meeting at date/time"
      />
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

interface ParticipantInputProps {
  value: string;
  onChange: (value: string) => void;
}

function ParticipantInput({ value, onChange }: ParticipantInputProps) {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div>Participants:</div>
      <Radio
        checked={!active}
        onChange={() => {
          setActive(false);
          onChange("");
        }}
        label="Everyone with link can join"
      />
      <Radio
        checked={active}
        onChange={() => {
          setActive(true);
          onChange("");
        }}
        label="Private meeting"
      />
      {active && (
        <label>
          <span>Participants emails</span>
          <Textarea
            value={value}
            placeholder="Enter participants emails separated by commas"
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
      )}
    </div>
  );
}

interface MeetingLinkProps {
  call: Call;
}

function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
  return <div>{meetingLink}</div>;
}
