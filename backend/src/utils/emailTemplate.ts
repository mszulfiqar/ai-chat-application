export const emailTemplate = ({ frontendUrl }: { frontendUrl: string }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:30px; max-width:600px;">
            
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h1 style="margin:0; font-size:24px; color:#333;">BetterChat</h1>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:10px;">
                <p style="margin:0; font-size:18px; color:#555;">Reset your password</p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-bottom:20px;">
                <p style="margin:0; font-size:15px; color:#666; line-height:1.5;">
                  Click the link to reset your password!
                </p>
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center" style="padding: 20px 0;">
                <a href="${frontendUrl}"
                  style="background:#000000; padding:14px 28px; color:#fff; font-size:16px; 
                  text-decoration:none; border-radius:6px; display:inline-block;">
                  Click Link
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:20px;">
                <p style="margin:0; font-size:13px; color:#888;">
                  If you didn’t request this, you can ignore this email.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
