import React, { Component } from 'react';
import { posts } from '../config';
import { googleConfig } from '../../../../settings';
import { GoogleApiWrapper } from 'google-maps-react';
import { Marker, MarkerInfoWindow } from '../marker';
import BasicMapWrapper from './map.style';

class BasicMarkerMap extends Component {
  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
    this.state = {
      center: { lat: 40.78306, lng: -73.971249 }, // 40.783060, -73.971249
      zoom: 13,
      posts,
      infoWindow: null
    };
  }
  loadMap(element) {
    const { google } = this.props;
    if (!element || !google) return;
    const self = this;
    const Map = new google.maps.Map(element, {
      zoom: this.state.zoom,
      center: this.state.center,
      scrollwheel: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    });
    const RichMarker = require('js-rich-marker');
    posts.map(post => {
      const marker = RichMarker
        ? new RichMarker.RichMarker({
            map: Map,
            animation: google.maps.Animation.DROP,
            flat: true,
            content: Marker(post.marker),
            position: new google.maps.LatLng(post.lat, post.lng)
          })
        : new google.maps.Marker({
            position: new google.maps.LatLng(post.lat, post.lng),
            map: Map,
            flat: true,
            animation: google.maps.Animation.DROP,
            content: Marker(post.marker)
          });

      return true;
    });
  }

  render() {
    const { loaded } = this.props;
    return (
      <div>
        {loaded ? (
          <BasicMapWrapper>
            <div
              className="isoGoogleMap"
              style={{ height: '650px', width: '100%' }}
              ref={this.loadMap}
            />
          </BasicMapWrapper>
        ) : (
          <span>API is Loading</span>
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleConfig.apiKey
})(BasicMarkerMap);
