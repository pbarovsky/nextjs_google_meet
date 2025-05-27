"use client";

import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import sc from "../styles/components/Loader.module.scss";
import { nanoid } from "nanoid";
import { getToken } from "./actions";

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className={sc.loader_container}>
        <Loader2 className={sc.loader} />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}

function useInitializeVideoClient() {
  const { user, isLoaded: userLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );

  useEffect(() => {
    if (!userLoaded) return;

    let streamUser: User;

    if (user?.id) {
      streamUser = {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      };
    } else {
      const id = nanoid();
      streamUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    if (!process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY) {
      throw new Error("Missing Stream API key");
    }

    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: streamUser,
      tokenProvider: user?.id ? getToken : undefined,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user?.id, user?.username, user?.imageUrl, userLoaded]);

  return videoClient;
}
