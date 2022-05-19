/* eslint-disable no-underscore-dangle */
class Listener {
    constructor(playlistSongsService, mailSender) {
      this._playlistSongsService = playlistSongsService;
      this._mailSender = mailSender;
  
      this.listen = this.listen.bind(this);
    }
  
    async listen(message) {
      try {
        const { userId, playlistId, targetEmail } = JSON.parse(message.content.toString());

        const playlist = await this._playlistSongsService.getPlaylistSongsById(playlistId);
  
        const dataSend = {
          playlist,
        };
        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(dataSend), userId, playlist.name, playlist.id);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  module.exports = Listener;
  