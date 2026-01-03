import type { NextApiRequest, NextApiResponse } from "next";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  // Check origin/referer to prevent unauthorized API usage
  const origin = req.headers.origin || req.headers.referer;
  const host = req.headers.host;

  // Allow requests from same origin (development: localhost, production: your domain)
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [];

  // Also allow requests from the same host
  const isAllowedOrigin =
    !origin || // Allow if no origin header (same-origin requests in some browsers)
    allowedOrigins.some((allowed) => origin.includes(allowed)) ||
    (host && origin.includes(host));

  if (!isAllowedOrigin) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Invalid origin",
    });
  }

  try {
    const { name, email, phone, message }: FormData = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Get EmailJS credentials from environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const userId = process.env.EMAILJS_USER_ID;
    const accessToken = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !userId) {
      console.error("EmailJS environment variables not configured");
      return res.status(500).json({
        success: false,
        message: "Email service not configured",
      });
    }

    // Prepare data for EmailJS
    const emailData = {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      accessToken: accessToken,
      template_params: {
        name,
        email,
        phone,
        message,
      },
    };

    // Send email via EmailJS
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      }
    );

    if (!response.ok) {
      throw new Error(`EmailJS API error: ${response.status}`);
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
}
