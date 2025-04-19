import { NextResponse } from "next/server";
import { completeRegistration } from "@/app/actions/email-actions";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await completeRegistration(formData);
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
