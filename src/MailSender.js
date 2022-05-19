/* eslint-disable no-underscore-dangle */
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

  sendEmail(targetEmail, content, userId, namePlaylist, idPlaylist) {
    const message = {
      from: 'Open Music V3',
      to: targetEmail,
      subject: `Export Playsits: ${namePlaylist}`,
      text: `Terlampir hasil dari ekspor Playlist beserta Songs di dalamnya dengan id: ${idPlaylist} dan nama: ${namePlaylist}`,
      attachments: [
        {
          filename: `${userId}-playlists.json`,
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
