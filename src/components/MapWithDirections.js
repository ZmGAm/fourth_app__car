import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

// Set your Mapbox Access Token here
mapboxgl.accessToken = 'pk.eyJ1IjoiYnVnYXRpLTg5IiwiYSI6ImNsdGdyOHZ4MzE0ZzYycW81MWpjeHhhejQifQ.LbioMVb5ZX44r9MrOMAijg';

const MapWithDirections = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);

  // Initialize Mapbox GL map
  useEffect(() => {
    const initializeMap = ({ setMap, mapContainerRef }) => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/bugati-89/clthgkqbx00bz01pkh1sa4u8p',
        center: [-74.5, 40], // Default center coordinates
        zoom: 9, // Default zoom level
      });

      map.on('load', () => {
        setMap(map);
      });
    };

    if (!map) initializeMap({ setMap, mapContainerRef });
  }, [map]);

  // Initialize Mapbox GL directions
  useEffect(() => {
    if (map) {
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric', // Use metric units
        profile: 'mapbox/driving', // Use driving profile
        controls: {
          inputs: false, // Hide default inputs
          instructions: true, // Show instructions control
          profileSwitcher: true, // Show profile switcher control
        },
      });

      map.addControl(directions, 'top-left');
      setDirections(directions);

      directions.on('route', (e) => {
        setCurrentRoute(e.route);
      });
    }
  }, [map]);

  // Example function to calculate elevation along the route
  const calculateElevation = () => {
    if (currentRoute) {
      // Iterate through currentRoute.legs to get route legs
      currentRoute.legs.forEach((leg) => {
        // Access leg.steps to get individual steps
        leg.steps.forEach((step) => {
          // Access step.intersections to get elevation data
          step.intersections.forEach((intersection) => {
            // Access intersection.elevation to get elevation at each point
            console.log('Elevation:', intersection.elevation);
          });
        });
      });
    }
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
      {currentRoute && (
        <div>
          <h2>Route Summary:</h2>
          <p>Distance: {currentRoute.distance.toFixed(2)} km</p>
          <p>Duration: {currentRoute.duration.toFixed(2)} minutes</p>
          <button onClick={calculateElevation}>Calculate Elevation</button>
        </div>
      )}
    </div>
  );
};

export default MapWithDirections;
