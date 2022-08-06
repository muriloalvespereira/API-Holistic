const { CONFIRM_EMAIL_ORIGIN, FRONT_END_URL } = process.env

const accConfirmEmail = (acc_email, tempToken) => {
    return {
        to: 'drdverzola@gmail.com' || acc_email,
        from: CONFIRM_EMAIL_ORIGIN,
        subject: 'Holistic Account Confirmation',
        text: 'To confirm your account click on the link provided or copy paste it to your browser',
        html: `
            <html>
              <head>
                  <title></title>
              </head>
                <body>
                  <a href="${FRONT_END_URL}/confirmation/${tempToken}">${FRONT_END_URL}/confirmation/${tempToken}</a>
                </body>
            </html>
          `
    }
}

export default accConfirmEmail
