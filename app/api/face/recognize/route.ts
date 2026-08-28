// // import { NextResponse } from "next/server";

// // export async function POST(request: Request) {
// //   try {
// //     const body = await request.json();

// //     const { descriptor, registeredDescriptor } = body;

// //     if (!descriptor || !Array.isArray(descriptor)) {
// //       return NextResponse.json(
// //         { error: "Face descriptor is required." },
// //         { status: 400 }
// //       );
// //     }

// //     if (
// //       !registeredDescriptor ||
// //       !Array.isArray(registeredDescriptor)
// //     ) {
// //       return NextResponse.json(
// //         { error: "Registered face descriptor is required." },
// //         { status: 400 }
// //       );
// //     }

// //     if (descriptor.length !== registeredDescriptor.length) {
// //       return NextResponse.json(
// //         { error: "Face descriptors are incompatible." },
// //         { status: 400 }
// //       );
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       message: "Face descriptors received for recognition.",
// //     });
// //   } catch (error) {
// //     console.error("Face recognition error:", error);

// //     return NextResponse.json(
// //       { error: "Invalid request." },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const { descriptor, registeredDescriptor } = body;

//     if (!descriptor || !Array.isArray(descriptor)) {
//       return NextResponse.json(
//         { error: "Face descriptor is required." },
//         { status: 400 }
//       );
//     }

//     if (!registeredDescriptor || !Array.isArray(registeredDescriptor)) {
//       return NextResponse.json(
//         { error: "Registered face descriptor is required." },
//         { status: 400 }
//       );
//     }

//     if (descriptor.length !== registeredDescriptor.length) {
//       return NextResponse.json(
//         { error: "Face descriptors are incompatible." },
//         { status: 400 }
//       );
//     }

//     // Calculate Euclidean distance between the two face descriptors
//     let sum = 0;

//     for (let i = 0; i < descriptor.length; i++) {
//       const difference = descriptor[i] - registeredDescriptor[i];
//       sum += difference * difference;
//     }

//     const distance = Math.sqrt(sum);

//     // Face-api.js commonly uses 0.6 as a general matching threshold.
//     const threshold = 0.6;

//     const recognized = distance < threshold;

//     return NextResponse.json({
//       success: true,
//       recognized,
//       distance,
//       message: recognized
//         ? "Face recognized."
//         : "Face not recognized.",
//     });
//   } catch (error) {
//     console.error("Face recognition error:", error);

//     return NextResponse.json(
//       { error: "Invalid request." },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { descriptor } = body;

    if (!descriptor || !Array.isArray(descriptor)) {
      return NextResponse.json(
        { error: "Face descriptor is required." },
        { status: 400 }
      );
    }

    if (descriptor.length === 0) {
      return NextResponse.json(
        { error: "Face descriptor cannot be empty." },
        { status: 400 }
      );
    }

    // Get all registered faces
    const faceRecords = await prisma.faceRecord.findMany({
      include: {
        user: true,
      },
    });

    if (faceRecords.length === 0) {
      return NextResponse.json({
        success: true,
        recognized: false,
        message: "No registered faces found.",
      });
    }

    let bestMatch = null;
    let bestDistance = Infinity;

    // Compare the current face with every registered face
    for (const faceRecord of faceRecords) {
      const registeredDescriptor = faceRecord.descriptor;

      if (registeredDescriptor.length !== descriptor.length) {
        continue;
      }

      let sum = 0;

      for (let i = 0; i < descriptor.length; i++) {
        const difference =
          descriptor[i] - registeredDescriptor[i];

        sum += difference * difference;
      }

      const distance = Math.sqrt(sum);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestMatch = faceRecord;
      }
    }

    // Recognition threshold
    const threshold = 0.25;

    if (!bestMatch || bestDistance >= threshold) {
      return NextResponse.json({
        success: true,
        recognized: false,
        distance: bestDistance === Infinity ? null : bestDistance,
        message: "Face not recognized.",
      });
    }

    return NextResponse.json({
      success: true,
      recognized: true,
      distance: bestDistance,
      user: {
        id: bestMatch.user.id,
        name: bestMatch.user.name,
        email: bestMatch.user.email,
      },
      message: "Face recognized.",
    });
  } catch (error) {
    console.error("Face recognition error:", error);

    return NextResponse.json(
      { error: "Face recognition failed." },
      { status: 500 }
    );
  }
}