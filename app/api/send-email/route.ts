import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    // 1. Validar campos requeridos
    const requiredFields = ["name", "email", "phone", "university", "cycle", "englishLevel", "coverLetter"]
    const formData = await req.formData()

    // Verificar campos faltantes
    const missingFields = requiredFields.filter((field) => !formData.get(field))
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Faltan campos requeridos: ${missingFields.join(", ")}` },
        { status: 400 },
      )
    }

    // 2. Extraer datos con validación de tipos
    const getString = (field: string) => formData.get(field)?.toString() || ""
    const name = getString("name")
    const email = getString("email")
    const phone = getString("phone")
    const university = getString("university")
    const cycle = getString("cycle")
    const englishLevel = getString("englishLevel")
    const experience = getString("experience")
    const coverLetter = getString("coverLetter")
    const termsAccepted = formData.get("termsAccepted") === "true"
    const jobTitle = getString("jobTitle")
    const resumeFile = formData.get("resumeFile") as File | null

    // 3. Configurar transporter con variables de entorno
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })

    // 4. Construir contenido del email
    const emailContent = `
      <h1>Nueva postulación para: ${jobTitle}</h1>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Universidad:</strong> ${university}</p>
      <p><strong>Ciclo:</strong> ${cycle}</p>
      <p><strong>Nivel de inglés:</strong> ${englishLevel}</p>
      <p><strong>Experiencia:</strong> ${experience || "No especificada"}</p>
      <p><strong>Términos aceptados:</strong> ${termsAccepted ? "Sí" : "No"}</p>
      <h2>Carta de presentación</h2>
      <p>${coverLetter}</p>
    `

    // 5. Configurar opciones del email
    const mailOptions: nodemailer.SendMailOptions = {
      from: `MundoLaboral <${process.env.GMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || "talento.mundolaboral@gmail.com",
      subject: `Postulación para ${jobTitle} - ${name}`,
      html: emailContent,
      attachments: [],
    }

    // 6. Manejar archivo adjunto
    if (resumeFile && resumeFile.size > 0) {
      if (resumeFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: "El archivo CV excede el tamaño máximo de 5MB" },
          { status: 400 },
        )
      }

      const buffer = await resumeFile.arrayBuffer()
      mailOptions.attachments?.push({
        filename: resumeFile.name,
        content: Buffer.from(buffer),
      })
    }

    // 7. Enviar email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
