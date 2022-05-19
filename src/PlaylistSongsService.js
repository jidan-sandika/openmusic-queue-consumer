/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongsById(playlistId) {
    
    const getPlaylist = await this._pool.query({
        text: 'SELECT id, name FROM playlists WHERE id = $1',
        values: [playlistId],
    });

    const getSongs = await this._pool.query({
        text: `SELECT songs.id, songs.title, songs.performer
        FROM playlist_songs
        LEFT JOIN songs ON playlist_songs.song_id = songs.id
        WHERE playlist_id = $1`,
        values: [playlistId],
    });

    return {
      ...getPlaylist.rows[0],
      songs: getSongs.rows,
    };

  }

}

module.exports = PlaylistSongsService;
