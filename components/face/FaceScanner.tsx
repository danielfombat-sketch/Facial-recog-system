"use client";

import { useEffect, useRef, useState } from "react";
import { loadFaceModels } from "@/lib/face/face-api";
import { getFaceDescriptor } from "@/lib/face/face-utils";

export default function FaceScanner() {
  const userId = "cmtb5thng0001zsgqpdulpi2w";
  const videoRef = useRef<HTMLVideoElement>(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [message, setMessage] = useState("Loading face models...");

  useEffect(() => {
    const startCamera = async () => {
      try {
        await loadFaceModels();
        setModelsLoaded(true);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setMessage("Camera ready. Register your face.");
      } catch (error) {
        console.error("Camera error:", error);
        setMessage("Could not start camera.");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;

        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const registerTestFace = async () => {
    if (!modelsLoaded || !videoRef.current) {
      setMessage("Face models are not ready.");
      return;
    }

    setMessage("Capturing face...");

    try {
      const descriptor = await getFaceDescriptor(videoRef.current);

      if (!descriptor) {
        setMessage("No face detected. Try again.");
        return;
      }

      const response = await fetch("/api/face-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          descriptor: Array.from(descriptor),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Registration failed.");
        return;
      }

      setMessage("Face registered successfully ✅");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Could not connect to registration API.");
    }
  };

  const recognizeFace = async () => {
    if (!modelsLoaded || !videoRef.current) {
      setMessage("Face models are not ready.");
      return;
    }

    setMessage("Scanning face...");

    try {
      const currentDescriptor = await getFaceDescriptor(
        videoRef.current
      );

      if (!currentDescriptor) {
        setMessage("No face detected. Try again.");
        return;
      }

      const response = await fetch("/api/face/recognize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descriptor: Array.from(currentDescriptor),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Recognition failed.");
        return;
      }

      if (data.recognized) {
        setMessage(
          `Face recognized ✅ ${data.user.name} — Distance: ${data.distance.toFixed(
            3
          )}`
        );
      } else {
        setMessage(
          `Face not recognized ❌${
            data.distance !== null
              ? ` Distance: ${data.distance.toFixed(3)}`
              : ""
          }`
        );
      }
    } catch (error) {
      console.error("Recognition error:", error);
      setMessage("Could not connect to recognition API.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full max-w-md rounded-lg"
      />

      <p className="text-center">{message}</p>

      <div className="flex gap-3">
        <button
          onClick={registerTestFace}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Register Test Face
        </button>

        <button
          onClick={recognizeFace}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          Recognize Face
        </button>
      </div>
    </div>
  );
}