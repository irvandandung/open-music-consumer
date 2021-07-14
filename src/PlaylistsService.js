const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const query = {
      text: `SELECT b.id, b.title, b.performer FROM playlistsongs a RIGHT JOIN songs b ON a.song_id = b.id WHERE a.playlist_id = $1`,
      values: [playlistId],
    }

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
