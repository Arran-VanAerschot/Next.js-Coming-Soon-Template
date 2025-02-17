import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid email" },
        { status: 400 }
      );
    }

    // TODO: Save 'email' to your DB, or call external service here
    // For demonstration, we'll just log it
    console.log("New email subscribed:", email);

    // Return success
    return NextResponse.json({ success: true, message: "Email subscribed!" });
  } catch (error) {
    console.error("Error in /api/subscribe route:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
