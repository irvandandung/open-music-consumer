const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(userId, playlistId) {
    const query = {
      text: `SELECT c.* FROM playlistsongs d RIGHT JOIN songs c ON d.song_id = c.id LEFT JOIN playlists a ON d.playlist_id = a.id LEFT JOIN collaborations b ON b.playlist_id = a.id WHERE a.owner = $1 OR b.user_id = $1 AND d.playlist_id = $2`,
      values: [userId, playlistId],
    }

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
