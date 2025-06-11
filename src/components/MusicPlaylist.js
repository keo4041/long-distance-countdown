// src/components/MusicPlaylist.js
import React from 'react';

// Go to your Spotify playlist -> Share -> Embed Playlist and copy the src URL
const playlistSrc = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M";
//add a youtube playlist
const youtubePlaylistSrc = "https://youtu.be/qxyOAfTpn2k?feature=shared"; // Example: https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID

// Youtube compatible playlist component
const MusicPlaylist = () => (
    <div className="mt-8">
        <p className="font-script text-2xl mb-2 text-rose-gold text-center">Our Shared Playlist</p>
        <iframe
            style={{ borderRadius: '12px' }}
            src={youtubePlaylistSrc}
            width="100%"
            height="315" // A taller height works better for YouTube embeds
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Our Shared YouTube Playlist"
        ></iframe>
    </div>
);

/* const MusicPlaylist = () => (
    <div className="mt-8">
        <iframe
            style={{ borderRadius: '12px' }}
            src={youtubePlaylistSrc}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Our Shared Playlist"
        ></iframe>
    </div>
); */

export default MusicPlaylist;