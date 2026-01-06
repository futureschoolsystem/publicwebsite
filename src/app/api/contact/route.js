import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const data = await request.json();

  try {
    await resend.emails.send({
      from: "Future School <onboarding@resend.dev>",
      to: ["futureschoolsystem7@gmail.com"],
      subject: "📩 New Contact Form Message From Website",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Message:</b> ${data.message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
