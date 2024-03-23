import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnVnYXRpLTg5IiwiYSI6ImNsdGdyOHZ4MzE0ZzYycW81MWpjeHhhejQifQ.LbioMVb5ZX44r9MrOMAijg';

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/bugati-89/clthgkqbx00bz01pkh1sa4u8p',
      center: [0, 0], // initial center of the map
      zoom: 10 // initial zoom level
    });

    // Function to add marker to the map
    const addMarker = (coordinates, label) => {
      new mapboxgl.Marker()
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(label))
        .addTo(map);
    };

    // Function to geocode address and add marker
    const geocodeAndAddMarker = (address, label) => {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          const coordinates = data.features[0].center;
          addMarker(coordinates, label);
        })
        .catch(error => {
          console.error('Error geocoding address:', error);
        });
    };

    // Example usage: Geocode source and destination addresses
    // geocodeAndAddMarker('Source Address', 'Source');
    geocodeAndAddMarker('Destination Address', 'Destination');
console.log( geocodeAndAddMarker('Source Address', 'Source'))
    return () => map.remove(); // Clean up on component unmount
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
