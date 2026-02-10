import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Reusable transporter instance (connection pooling for better performance)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    pool: {
        maxConnections: 3,
        maxMessages: 10,
        rateDelta: 2000,
        rateLimit: 5,
    },
});

// Input validation
const validateInput = (name, email, phoneno, subject, message) => {
    const errors = [];

    if (!name || name.trim().length < 2)
        errors.push("Name must be at least 2 characters");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.push("Valid email is required");
    if (!phoneno || !/^\d{10,}$/.test(phoneno.replace(/\D/g, "")))
        errors.push("Valid phone number is required");
    if (!subject || subject.trim().length < 3)
        errors.push("Subject must be at least 3 characters");
    if (!message || message.trim().length < 10)
        errors.push("Message must be at least 10 characters");

    return errors;
};

// HTML email template
const generateEmailTemplate = (name, email, phoneno, subject, message) => {
    return `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                    <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Message</h2>
                    
                    <div style="margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Phone:</strong> ${phoneno}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    
                    <div style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
                        <h3 style="margin-top: 0; color: #333;">Message:</h3>
                        <p>${message.replace(/\n/g, "<br>")}</p>
                    </div>
                </div>
            </body>
        </html>
    `;
};

const MessageController = async (req, res) => {
    const { name, email, phoneno, subject, message } = req.body;

    // Validate input
    const validationErrors = validateInput(name, email, phoneno, subject, message);
    if (validationErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationErrors,
        });
    }

    try {
        // Email options with HTML template
        const mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `📧 New Contact: ${subject}`,
            html: generateEmailTemplate(name, email, phoneno, subject, message),
            text: `New message from ${name} (${email}, ${phoneno}): ${message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent successfully! We'll get back to you soon.",
        });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later.",
        });
    }
};

export default MessageController;







