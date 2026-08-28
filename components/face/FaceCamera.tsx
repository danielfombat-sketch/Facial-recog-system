"use client";

import { useEffect, useRef } from "react";

interface FaceCameraProps {
  onVideoReady?: (video: HTMLVideoElement) => void;
}

export default function FaceCamera({
  onVideoReady,
}: FaceCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();

            if (videoRef.current && onVideoReady) {
              onVideoReady(videoRef.current);
            }
          };
        }
      } catch (error) {
        console.error("Camera access error:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current
          .srcObject as MediaStream;

        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onVideoReady]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      width={400}
    />
  );
}