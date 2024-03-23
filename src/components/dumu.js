

import React, { useState,axios,useEffect } from 'react';
import'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGl, { FullscreenControl, GeolocateControl, Marker, NavigationControl,Popup, Source,Layer } from 'react-map-gl';
// import data from '@mapbox/mapbox-gl-directions/src/reducers';
// import * as React from 'react';

function Map_with_Box() {
  const [viewState, setViewState] = useState({
    latitude: 31.561920,
    longitude: 74.348083,
    zoom: 14
  });

  const [showPopup, setShowPopup] = useState(true);
  const [coords, setCoords] = useState([]);
  const map_api_key = 'pk.eyJ1IjoiYnVnYXRpLTg5IiwiYSI6ImNsdGdyOHZ4MzE0ZzYycW81MWpjeHhhejQifQ.LbioMVb5ZX44r9MrOMAijg'; // Replace with your Mapbox access token
  const profile = 'mapbox/driving'; // Specify the desired profile
  const [source, setSource] = useState([-122.4194, 37.7749]); // Coordinates of the starting point
  const [destination, setDestination] = useState([-100.4194, 56.8975]); // Coordinates of the destination point
  const direction_api = `https://api.mapbox.com/directions/v5/${profile}/${source[0]},${source[1]};${destination[0]},${destination[1]}?steps=true&geometries=geojson&access_token=${map_api_key}`;

  useEffect(() => {
    const getDirections = async () => {
      try {
        const response = await fetch(direction_api);
        const data = await response.json();
        const routeCoordinates = data?.routes?.[0]?.geometry?.coordinates;
        if (routeCoordinates) {
          setCoords(routeCoordinates);
        } else {
          console.error('No route coordinates found.');
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };
    getDirections();
  }, []);

  const geojson = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": coords
      }
    }]
  };

  return (
    <ReactMapGl
      {...viewState}
      onViewportChange={setViewState}
      mapStyle="mapbox://styles/bugati-89/clthgkqbx00bz01pkh1sa4u8p"
      mapboxApiAccessToken={map_api_key}
      style={{ width: "100vw", height: "100vh" }}
    >
      {showPopup && (
        <Popup longitude={-100} latitude={40} anchor="bottom" onClose={() => setShowPopup(false)}>
          You are here
        </Popup>
      )}
      <Source id="routesSource" type="geojson" data={geojson}>
        <Layer
          type="line"
          paint={{
            'line-color': '#FF5733',
            'line-width': 3
          }}
        />
      </Source>
      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl />
      <Marker latitude={source[1]} longitude={source[0]} />
      <Marker latitude={destination[1]} longitude={destination[0]} />
    </ReactMapGl>
  );
}

export default Map_with_Box;
