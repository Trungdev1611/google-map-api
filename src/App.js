import React, { useRef } from 'react';
import { GoogleMap, Autocomplete, LoadScript, Marker  } from '@react-google-maps/api';

import { useState } from 'react';

const mapContainerStyle = {
  height: '400px',
  width: '800px'
};
const styleInput = {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '240px',
    height: '32px',
    padding: '0 12px',
    borderRadius: '3px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipsis',
    position: 'absolute',
    left: '50%',
    marginLeft: '-120px'
  }

const center = {
  lat: 38.685,
  lng: -115.234
};

const MapApigg = ({zoom=10, placeholder, style =styleInput }) => {
const [searchBox, setSearchBox] = useState(null)
const [centerdata, setCenterData] = useState(center)
  const onLoad = (autocomplete) => {
    setSearchBox(autocomplete)
  };

  const onPlaceChanged = () => {
    console.log("auto1",searchBox )
    if (searchBox !== null) {
      console.log(searchBox.getPlace());
      const place = searchBox.getPlace();
      if (place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        setCenterData({ lat: lat(), lng: lng() });
        console.log('Latitude:', lat());
        console.log('Longitude:', lng());
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };
  console.log("center", centerdata)
  const libraries = ['places'];
  return (
      <LoadScript googleMapsApiKey={"AIzaSyCHu4vQUKFsMnqpjk_HHjIIAU_yejvT5cs"} libraries={libraries} language='vi'>
        <GoogleMap
          id="ggmapapi"
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={centerdata}
        >
              {centerdata && (
          <Marker position={centerdata} />
        )}
           <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <input
            type="text"
            placeholder="Search for Tide Information"
            style={styleInput}
          />
        </Autocomplete>
    
  
        </GoogleMap>
      </LoadScript>
  );
};

export default MapApigg;
