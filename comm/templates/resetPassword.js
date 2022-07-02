const { CONFIRM_EMAIL_ORIGIN, FRONT_END_URL } = process.env

const resetPasswordTemp = (acc_email, tempToken) => {
    return {
        to: acc_email,
        from: CONFIRM_EMAIL_ORIGIN,
        subject: 'Holistic Password reset Confirmation',
        text: 'To reset your password click on the link provided or copy paste it to your browser',
        html: `
            <html>
              <head>
                  <title></title>
              </head>
                <body>
                  <a href="${FRONT_END_URL}/accounts/reset/${tempToken}">${FRONT_END_URL}/accounts/reset/${tempToken}</a>
                </body>
            </html>
          `
    }
}

export default resetPasswordTemp
