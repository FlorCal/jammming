import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    // this.onAdd = this.props.onAdd.bind(this)
    // this.onRemove = this.props.onRemove.bind(this)
  }

  render() {
      // debugger
      // let onAdd = this.onAdd
      // let onRemove = this.onRemove
    return(
      <div className="TrackList">
          { this.props.tracks.map(
            track => {

              // debugger
              return <Track
                track={track}
                key={track.id}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                />
          }, this)}

      </div>
    );
  }
}


export default TrackList;
