import React, { useState } from 'react';
import './App.css';
// components 
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
// Spotify API handler 
import Spotify from '../../util/Spotify';

function App() {
    const [ searchResults, setSearchResults ] = useState([]);
    const [ playlistName, setPlaylistName ] = useState();
    const [ playlistTracks, setPlaylistTracks ] = useState([]);

    const addTrack = (track) => {
        if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) 
            setPlaylistTracks((prev) => [...prev, track]);
    };

    const removeTrack = (track) => {
        setPlaylistTracks((prev) => prev.filter(
            (savedTrack) => savedTrack.id !== track.id
        ));
    };

    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    };

    const savePlaylist = () => {
        if (playlistName.length == 0) {
            alert("Enter a playlist name");
        } else {
            const trackURIs = playlistTracks.map((track) => track.uri);
            Spotify.savePlaylist(playlistName, trackURIs).then(() => {
                setPlaylistName("");
                setPlaylistTracks([]);
            });
        }
    };

    const search = (term) => {
        Spotify.search(term).then(searchResults => {
            setSearchResults(searchResults);
        });
    };

    return (
        <div>
            <h1>Playlist Creator</h1>
            <p> Enter a song, artist, or album to add to your new playlist. Change the name of the playlist and when you are ready, click the button to add to your Spotify.</p>
            <div className="App">
                <div className="container">
                    <div className="searchContainer">
                        <SearchBar onSearch={search} />
                        <SearchResults searchResults={searchResults} onAdd={addTrack} />
                    </div>
                    <div className="playlistContainer">
                        <Playlist playlistTracks={playlistTracks} playlistName={playlistName} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
