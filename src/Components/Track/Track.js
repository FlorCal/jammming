import React from 'react';
import './Track.css';


class Track extends React.Component {
  constructor(props) {
    super(props);

  }

  // renderAction(){
  //   // debugger
  //   return this.props.isRemoval ? '-' : '+'
  // }

  addTrack() {
    this.props.onAdd(this.props.track)
  }

  removeTrack() {
    this.props.onRemove(this.props.track)
  }



  render() {
    // debugger
    return(
      <div className="Track">
        <div className="Track-information">

          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album} </p>
        </div>
          {this.props.onAdd ?
              <a className="Track-action"
                onClick={this.addTrack.bind(this)}>+</a>

            :
              <a className="Track-action"
                onClick={this.removeTrack.bind(this)}>-</a>
          }
      </div>
    );
  }
}

export default Track;
