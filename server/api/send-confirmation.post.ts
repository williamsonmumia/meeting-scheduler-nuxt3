// server/api/send-confirmation.ts
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  try {
    // Use a template literal instead of Vue Email
    const emailHtml = `
      <div>
        <p>Hello ${body.userName},</p>
        <p>Your meeting with ${body.businessName} is confirmed for ${body.date} at ${body.time}.</p>
        <p>Duration: ${body.duration} meeting</p>
        <hr />
        <a href="${body.locationUrl}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Join Meeting</a>
      </div>
    `
    
    // Continue with your existing nodemailer code...
    const transporter = nodemailer.createTransport({
      host: config.nodemailer.host,
      port: config.nodemailer.port,
      secure: true,
      auth: {
        user: config.nodemailer.user,
        pass: config.nodemailer.pass
      }
    })
    
    await transporter.sendMail({
      from: `"${body.businessName}" <noreply@yourbusiness.com>`,
      to: body.userEmail,
      subject: `Meeting Confirmation with ${body.businessName}`,
      html: emailHtml
    })
    
    return { success: true }
  } catch (err) {
    console.error('[Email Error]', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send confirmation email'
    })
  }
})