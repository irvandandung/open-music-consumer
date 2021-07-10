const nodemailer = require('nodemailer');
 
class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendMail(targetMail, content){
    const message = {
      from: 'Open Music Apps',
      to: targetMail,
      subject: 'Ekspor Playlist Songs',
      text: 'Terlampir hasil dari ekspor playlist songs',
      attachments: [
        {
          filename: 'playlist_songs.json',
          content,
        },
      ],
    };
   
    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
