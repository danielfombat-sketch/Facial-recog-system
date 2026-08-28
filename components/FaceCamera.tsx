"use client";

import { useRef, useState } from "react";

export default function FaceCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraOn(true);
    } catch (error) {
      console.error("Camera error:", error);
      alert("Could not access the camera.");
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="400"
      />

      <br />

      <button type="button" onClick={startCamera}>
        {cameraOn ? "Camera On" : "Start Camera"}
      </button>
    </div>
  );
}