"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  MarkerF,
  OverlayViewF,
  OverlayView,
} from "@react-google-maps/api";
import { DestinationContext } from "./Context/DestinationContext";
import { SourceContext } from "./Context/SourceContext";
import { Marker } from "react-map-gl";

const containerStyle = {
  width: "100%",
  height: window.innerWidth * 0.45,
};

function GoogleMapNew() {
  // const apikey=process.env.REACT_APP_GOOGLE_API_KEY
  // const apikey=process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY

  const { destination, setDestination } = useContext(DestinationContext);
  const { source, setSource } = useContext(SourceContext);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  // const { isLoaded } = useLoadScript({
  //     // id: 'google-map-script',
  //     // googleMapsApiKey: "AIzaSyAoJwUr3rjwlC4FgP7eDnU6OpvQkzmCj-8",
  //     googleMapsApiKey : process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_KEY
  //     // libraries: ['places']
  //   })

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  useEffect(() => {
    // setPlaceholder(type === 'Source' ? 'Pickup Location ' : 'Dropoff Location ');
    if (source != null && map) {
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    // if(destination){

    // }
    // console.log("destinaion",destination.name)

    // if(source){

    //   // console.log("destinaion",destination.name)
    //   console.log("source",source.name)
    // }
  }, [source]);

  useEffect(() => {
    // setPlaceholder(type === 'Source' ? 'Pickup Location ' : 'Dropoff Location ');
    if (destination != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    // if(destination){

    // }
    // console.log("destinaion",destination.name)

    // if(source){

    //   // console.log("destinaion",destination.name)
    //   console.log("source",source.name)
    // }
  }, [destination]);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {source != null ? (
        
        <MarkerF position={{ lat: source.lat, lng: source.lng }} >
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            
              <h style={{color:"red",fontsize:"20px"}}> {source.label}</h>
          
          </OverlayViewF>
          {/* <h17> source in marker :{source.label}</h17> */}
        </MarkerF>
       ): null}
       {destination != null ? (
        
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }} >
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            
              <h style={{color:"red",fontsize:"20px"}}>{destination.label}</h>
          
          </OverlayViewF>
          {/* <h17> source in marker :{source.label}</h17> */}
        </MarkerF>
       ): null}


      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
}

export default GoogleMapNew;
