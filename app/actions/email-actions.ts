// email-actions.ts
import nodemailer from "nodemailer";

export async function completeRegistration(formData: FormData) {
  try {
    // Validar campos requeridos
    const requiredFields = ["email", "password", "name", "jobTitle"];
    const missingFields = requiredFields.filter(field => !formData.get(field));
    if (missingFields.length > 0) {
      throw new Error(`Faltan campos: ${missingFields.join(", ")}`);
    }

    // Extraer datos
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const password = formData.get("password") as string;

    // Configurar transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Crear contenido del email
    const mailOptions = {
      from: `MundoLaboral <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Nuevo registro completo - ${name}`,
      html: `
        <h1>¡Nuevo registro exitoso!</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Usuario:</strong> ${email}</p>
        <p><strong>Puesto aplicado:</strong> ${jobTitle}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Contraseña asignada al usuario:</strong> ${password}</p>
        <hr>
        <p style="color: #ff4444; font-size: 12px;">
          ⚠️ Alerta de seguridad: Este es un registro temporal para la versión beta. 
          No compartir esta contraseña y cambiarla en producción.
        </p>
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error al completar el registro:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
