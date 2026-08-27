// "use client";

// import { useState } from "react";
// import FaceCamera from "./FaceCamera";
// import { getFaceDescriptor } from "../../lib/face/face-utils";

// interface FaceCaptureProps {
//   onCapture?: (descriptor: Float32Array) => void;
// }

// export default function FaceCapture({
//   onCapture,
// }: FaceCaptureProps) {
//   const [video, setVideo] = useState<HTMLVideoElement | null>(null);
//   const [message, setMessage] = useState(
//     "Position your face in front of the camera."
//   );

//   const captureFace = async () => {
//     if (!video) {
//       setMessage("Camera is not ready.");
//       return;
//     }

//     setMessage("Scanning face...");

//     const descriptor = await getFaceDescriptor(video);

//     if (!descriptor) {
//       setMessage("No face detected. Try again.");
//       return;
//     }

//     setMessage("Face captured successfully.");

//     if (onCapture) {
//       onCapture(descriptor);
//     }
//   };

//   return (
//     <div>
//       <FaceCamera onVideoReady={setVideo} />

//       <button onClick={captureFace}>
//         Capture Face
//       </button>

//       <p>{message}</p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import FaceCamera from "./FaceCamera";
import { getFaceDescriptor } from "../../lib/face/face-utils";
import { loadFaceModels } from "../../lib/face/face-api";

interface FaceCaptureProps {
  onCapture?: (descriptor: Float32Array) => void;
}

export default function FaceCapture({
  onCapture,
}: FaceCaptureProps) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [message, setMessage] = useState(
    "Loading face models..."
  );

  useEffect(() => {
    const loadModels = async () => {
      try {
        await loadFaceModels();

        setModelsLoaded(true);
        setMessage(
          "Position your face in front of the camera."
        );
      } catch (error) {
        console.error("Model loading error:", error);
        setMessage("Could not load face models.");
      }
    };

    loadModels();
  }, []);

  const captureFace = async () => {
    if (!modelsLoaded) {
      setMessage("Face models are still loading.");
      return;
    }

    if (!video) {
      setMessage("Camera is not ready.");
      return;
    }

    setMessage("Scanning face...");

    try {
      const descriptor = await getFaceDescriptor(video);

      if (!descriptor) {
        setMessage("No face detected. Try again.");
        return;
      }

      // setMessage("Face captured successfully.");

      // if (onCapture) {
      //   onCapture(descriptor);
      // }
      const descriptorArray = Array.from(descriptor);

const response = await fetch("/api/face/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    descriptor: descriptorArray,
  }),
});

const data = await response.json();

if (!response.ok) {
  setMessage(data.error || "Face registration failed.");
  return;
}

setMessage("Face registered successfully.");

if (onCapture) {
  onCapture(descriptor);
}
    } catch (error) {
      console.error("Face capture error:", error);
      setMessage("Face scanning failed. Try again.");
    }
  };

  return (
    <div>
      <FaceCamera onVideoReady={setVideo} />

      <button
        onClick={captureFace}
        disabled={!modelsLoaded}
      >
        {modelsLoaded ? "Capture Face" : "Loading..."}
      </button>

      <p>{message}</p>
    </div>
  );
}