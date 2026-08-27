// import*as faceapi from "face-api.js";
// export const getFaceDescriptor = async (
//     video: HTMLVideoElement
// )=> {
// const detection = await faceapi
// .detectSingleFace(
//     video,
//     new faceapi.TinyFaceDetectorOptions()
// )
// .withFaceLandmarks()
// .withFaceDescriptor()

// if (!detection){
//     return null;
// }
// return detection.descriptor;
// };
// export const compareFaces = (
//   descriptor1: Float32Array,
//   descriptor2: Float32Array
// ) => {
//   const distance = faceapi.euclideanDistance(
//     descriptor1,
//     descriptor2
//   );

//   return distance;
// };
import * as faceapi from "face-api.js";

export const getFaceDescriptor = async (
  video: HTMLVideoElement
) => {
  const detection = await faceapi
    .detectSingleFace(
      video,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.4,
      })
    )
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) {
    return null;
  }

  return detection.descriptor;
};

export const compareFaces = (
  descriptor1: Float32Array,
  descriptor2: Float32Array
) => {
  const distance = faceapi.euclideanDistance(
    descriptor1,
    descriptor2
  );

  return distance;
};