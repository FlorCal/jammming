import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    // this.onAdd = this.props.onAdd.bind(this)
    // this.onRemove = this.props.onRemove.bind(this)
  }

  render() {
    // debugger
    return(
      <div className="SearchResults">
        <h2>Results</h2>
         <TrackList
           onAdd={this.props.onAdd}
           onRemove={this.props.onRemove}
           tracks={this.props.searchResults}/>
      </div>
    )
  }
}

export default SearchResults;
