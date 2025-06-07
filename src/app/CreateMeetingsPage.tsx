"use client";

import { useUser } from "@clerk/nextjs";
import { Copy } from "lucide-react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useId, useState } from "react";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Link from "next/link";
import InputToggle from "@/components/InputToggle";
import DatePicker from "@/components/DatePicker/DatePicker";
import Loader from "@/components/Loader";

import sc from "@styles/pages/CreateMeetingsPage.module.scss";

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
    return <Loader />;
  }

  return (
    <div className={sc.meetings}>
      <h1 className={sc.slogan}>
        Connect, collaborate, create — seamless video calls for teams.
      </h1>
      <div className={sc.meetings_container}>
        <h2 className={sc.h2}>Create a new meeting</h2>
        <DescriptionInput
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        <div className={sc.divider}>
          <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />
          <ParticipantInput
            value={participantsInput}
            onChange={setParticipantsInput}
          />
        </div>
        <Button type="primary" onClick={createMeeting}>
          Create meeting
        </Button>
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

  const DescId = useId();

  return (
    <div className={sc.description}>
      <h3 className={sc.h3}>Meetings info:</h3>
      <InputToggle
        label="Add description"
        checked={active}
        onChange={(e) => {
          setActive(e.target.checked);
          onChange("");
        }}
        type="checkbox"
        id={DescId}
      />
      {active && (
        <label>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            label="Description"
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

  const StartMeetDateId = useId();
  const StartMeetImmediatelyId = useId();

  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  )
    .toISOString()
    .slice(0, 16);

  return (
    <div className={sc.startTime}>
      <h3 className={sc.h3}>Meeting start: </h3>
      <div className={sc.radio_wrapper}>
        <InputToggle
          checked={!active}
          type="radio"
          label="Start meeting immediately"
          onChange={() => {
            setActive(false);
            onChange("");
          }}
          id={StartMeetImmediatelyId}
        />
        <InputToggle
          type="radio"
          checked={active}
          onChange={() => {
            setActive(true);
            onChange(dateTimeLocalNow);
          }}
          label="Start meeting at date/time"
          id={StartMeetDateId}
        />
      </div>

      {active && (
        <div className={sc.inputWrapper}>
          <DatePicker value={value} onChange={onChange} />
        </div>
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

  const PublicMeetId = useId();
  const PrivateMeetId = useId();

  return (
    <div className={sc.participants}>
      <h3 className={sc.h3}>Participants:</h3>
      <div className={sc.radio_wrapper}>
        <InputToggle
          type="radio"
          checked={!active}
          onChange={() => setActive(!active)}
          label="Everyone with link can join"
          id={PublicMeetId}
        />
        <InputToggle
          type="radio"
          checked={active}
          onChange={() => setActive(!active)}
          label="Private meeting"
          id={PrivateMeetId}
        />
      </div>
      {active && (
        <Textarea
          value={value}
          placeholder="Enter participants emails separated by commas"
          onChange={(e) => onChange(e.target.value)}
          label="Participants emails"
        />
      )}
    </div>
  );
}

interface MeetingLinkProps {
  call: Call;
}

function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
  };

  return (
    <div className={sc.message_link}>
      <Link
        href={meetingLink}
        target="_blank"
        rel="noopener noreferrer"
        className={sc.link}
      >
        {meetingLink}
      </Link>
      <Button type="icon" onClick={copyToClipboard}>
        <Copy className={sc.copy} />
      </Button>
    </div>
  );
}
