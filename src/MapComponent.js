import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import config from './data/config.json';


class MapComponent extends Component {
  render() {
    const defaultCenter = { lat: 48.866667, lng: 2.333333 };
    return (
      <Map
        google={this.props.google}
        initialCenter={defaultCenter}
        zoom={12}
      >
        {this.props.markers.map((marker, i) => {
          return (
            <Marker
              key={'marker_' + marker.id}
              position={marker.position}
              title={marker.address}
              onClick={this.props.addStore(marker.id)}
            />
          )
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: config.apiKey
})(MapComponent)
