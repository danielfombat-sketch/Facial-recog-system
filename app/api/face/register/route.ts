// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const { descriptor } = body;

//     if (!descriptor || !Array.isArray(descriptor)) {
//       return NextResponse.json(
//         { error: "Face descriptor is required." },
//         { status: 400 }
//       );
//     }

//     if (descriptor.length === 0) {
//       return NextResponse.json(
//         { error: "Face descriptor cannot be empty." },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Face descriptor received successfully.",
//       descriptor,
//     });
//   } catch (error) {
//     console.error("Face registration error:", error);

//     return NextResponse.json(
//       { error: "Invalid request." },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { memberId, descriptor } = body;

    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required." },
        { status: 400 }
      );
    }

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

    return NextResponse.json({
      success: true,
      message: "Face descriptor received successfully.",
      memberId,
      descriptor,
    });
  } catch (error) {
    console.error("Face registration error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 500 }
    );
  }
}