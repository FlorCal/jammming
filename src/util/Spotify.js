const CLIENT_ID = '8b02d4fd3d9f4395ab3a7fd2ccdb88ab'
const REDIRECT_URI = 'https://jamm_ming.surge.sh'
let accessToken = '' ;

const Spotify = {
  getAccessToken: function() {
    if(accessToken) return accessToken;

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const accessTokenExpiration = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && accessTokenExpiration) {
      accessToken = accessTokenMatch[1];
      const expiresIn = accessTokenExpiration[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;

    }else {
      const redirectURL =
      `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location = redirectURL;
    }
  },

  search(term) {
     accessToken = Spotify.getAccessToken();
     const fetchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
     const headers = {headers: {Authorization: `Bearer  ${accessToken}`}};
     return fetch(fetchURL, headers).then(response => {
       if (response.ok) {
         return response.json();
       }
       throw new Error('Request failed!');
     }, networkError => console.log(networkError.message)
     ).then(jsonResponse => {
         if (jsonResponse.tracks.items) {
           return jsonResponse.tracks.items.map(track => {
             return {
               id: track.id,
               name: track.name,
               artist: track.artists[0].name,
               album: track.album.name,
               uri: track.uri,
             };
           })
         } else return [];
       });
   },

   savePlaylist(name, trackURIs) {
     if (!name || !trackURIs) return;

     const accessToken = Spotify.getAccessToken();
     const headers = {Authorization: `Bearer ${accessToken}`};
     const createPlaylistHeaders = {
       headers: headers,
       method: 'POST',
       body: JSON.stringify({name: name}) };
     const addTracksHeaders = {
       headers: headers,
       method: 'POST',
       body: JSON.stringify({'uris': trackURIs,}) };

     let userID, playlistID;

     return fetch('https://api.spotify.com/v1/me', {headers: headers})
     .then(response => response.json())
     .then(jsonResponse => {
       userID = jsonResponse.id;

       return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, createPlaylistHeaders)
         .then(response => response.json())
         .then(jsonResponse => {
           playlistID = jsonResponse.id;

           return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, addTracksHeaders)
         });
     });
   },
 };

 export default Spotify;
