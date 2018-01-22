import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlayListName = this.updatePlayListName.bind(this)
    this.savePlayList= this.savePlayList.bind(this)
    this.search= this.search.bind(this)

    this.state = {
      searchResults: [],
      playListName: 'New PlayList',
      playListTracks:  []
    }
  }

  addTrack(track) { // track = { id:0, album: '', name: '', title: ''}
    // debugger
    var notNewTrack = this.state.playListTracks.find(function(playListTrack){
      return track.id === playListTrack.id
    })

    if(!notNewTrack) {
      this.setState({
        playListTracks: this.state.playListTracks.concat([track])
      })
    }
  }

  removeTrack(track) {
    let playListTracks = this.state.playListTracks.filter(playListTrack => (playListTrack.id !== track.id))
    this.setState({playListTracks})
  }

  updatePlayListName(name) {
    this.setState({playListName:name})
  }

  savePlayList() {
    const trackURIs = []
    this.state.playListTracks.forEach(function(track){
      trackURIs.push('spotify:track:' + track.id);
    })
    Spotify.savePlaylist(this.state.playListName, trackURIs)
  }

  search(term) {
    Spotify.search(term)
      .then(searchResults => this.setState({
        searchResults: searchResults
      }));
  }

  render() {
    let searchResultsWithRemovals = function(){

    }
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />

          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              searchResults={this.state.searchResults}
              AppState={this.state} />

            <PlayList
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayListName}
              onSave={this.savePlayList}/>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
