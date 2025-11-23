import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js"
import { sendEmailFunction } from "./nodemailer.js";
import { emailTemplate } from "../utils/emailTemplate.js";

export const auth = betterAuth({
    baseURL: "http://localhost:3000" ,
    trustedOrigins: ["http://localhost:3001"],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        },
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token },request) => {
            const frontendUrl = `http://localhost:3001/reset-password?token=${token}`;
            // console.log(url)
            console.log(frontendUrl)
            console.log("HTML output length:", emailTemplate({frontendUrl}).length);
            await sendEmailFunction({
                to:user.email,
                subject:"Reset the password!",
                text:`${frontendUrl}`,
                html:emailTemplate({frontendUrl})
            })
        }
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
});