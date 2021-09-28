const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    // Data fetching...
    const response = await fetch(`https://api.lyrics.ovh/suggest/${searchText}`);
    const data = await response.json();
    displaySongs(data.data);
}

const displaySongs = songs => {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = '';
    // ForEach method and data setting to UI...
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songsContainer.appendChild(songDiv);
    });
}

const getLyrics = async (artist, title) => {
    // Getting the lyrics...
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json();
    displayLyrics(data.lyrics);
}

const displayLyrics = lyrics => {
    // Lyrics setting to UI...
    const lyricsDiv = document.getElementById('lyrics');
    lyricsDiv.innerText = lyrics;
}