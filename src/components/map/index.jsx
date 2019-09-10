import React, { Component } from "react";
import { GoogleMap, withGoogleMap } from "react-google-maps";

function Map({ children }) {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultMapTypeId="satellite"
      // defaultCenter={{ lat: 47.760419, lng: 26.225507 }}
      defaultCenter={{ lat: 47.64428, lng: 26.271314 }}
      defaultOptions={{
        minZoom: 12,
        maxZoom: 16,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false
      }}
    >
      {children}
      {/* <Marker position={{ lat: 47.760419, lng: 26.225507 }} /> */}
    </GoogleMap>
  );
}
const WrappedMap = withGoogleMap(Map);

export default class Harta extends Component {
  render() {
    const { children } = this.props;
    return (
      //width: "100vw",
      <div style={{ height: "100vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        >
          {children}
        </WrappedMap>
      </div>
    );
  }
}
