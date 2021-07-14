class Listener {
  constructor(playlistsService, mailSender) {
    this.playlistsService = playlistsService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }
 
  async listen(message) {
    try {
      const { targetEmail, playlistId } = JSON.parse(message.content.toString());
      console.log(JSON.parse(message.content.toString()))
      const playlists = await this.playlistsService.getPlaylists(playlistId);
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(playlists));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
 
module.exports = Listener;
