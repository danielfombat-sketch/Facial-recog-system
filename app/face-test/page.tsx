// // import FaceScanner from "../../components/face/FaceScanner";

// // export default function FaceTestPage() {
// //   return (
// //     <main>
// //       <h1>Face Recognition Test</h1>

// //       <FaceScanner />
// //     </main>
// //   );
// // }
// "use client";

// import FaceCapture from "../../components/face/FaceCapture";

// export default function FaceTestPage() {
//   return (
//     <main>
//       <h1>Face Capture Test</h1>

//       <FaceCapture
//         onCapture={(descriptor) => {
//           console.log("Face descriptor captured:", descriptor);
//         }}
//       />
//     </main>
//   );
// }
"use client";

import FaceScanner from "../../components/face/FaceScanner";

export default function FaceTestPage() {
  return (
    <main>
      <h1>Face Recognition Test</h1>

      <FaceScanner />
    </main>
  );
}