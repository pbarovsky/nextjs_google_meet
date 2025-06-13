"use client";

import Button from "@/components/Button";
import Loader from "@/components/Loader";
import { Call, CallControls, SpeakerLayout, StreamCall, StreamTheme, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";

interface MeetingPageProps {
  id: string;
}

export default function MeetingPage({ id }: MeetingPageProps) {
  const [call, setCall] = useState<Call>();

  const client = useStreamVideoClient();

  if (!client) {
    return <Loader />;
  }

  if (!call) {
    return (
      <Button
        onClick={async () => {
          const call = client.call("private-meeting", id);
          await call.join();
          setCall(call);
        }}
      >
        Join meeting
      </Button>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme className="">
        <SpeakerLayout />
        <CallControls />
      </StreamTheme>
    </StreamCall>
  )
}
