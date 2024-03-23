/* global google */
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function Locationsearch({ type }) {
  const [searchValue, setSearchValue] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);
 const PLACES_API='AIzaSyAoJwUr3rjwlC4FgP7eDnU6OpvQkzmCj-8'
  useEffect(() => {
    setPlaceholder(type === 'Source' ? 'Pickup Location ' : 'Dropoff Location ');
  }, [type]);

  const GetCoordinate = (place, type) => {
    const placeId = place.value.place_id;
    const services = new google.maps.places.PlacesService(document.createElement('div'));
    services.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry && place.geometry.location) {

        console.log('lng',place.geometry.location.lng());
        console.log('lat',place.geometry.location.lat());
      }
    });
  };

  return (
    <div className='locationsearch'>
      <GooglePlacesAutocomplete
        apiKey={PLACES_API}
        selectProps={{
          value: searchValue,
          onChange: (place) => {
            GetCoordinate(place, type);
            setSearchValue(place);
          },
          placeholder: placeholder,
          components: {
            DropdownIndicator: false,
          },
        }}
      />
    </div>
  );
}

export default Locationsearch;
