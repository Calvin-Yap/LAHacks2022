import React, {useState, useCallback, useRef} from "react";
import{
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'
import { MapStyles } from '../styles/MapStyles'
import { v4 as uuidv4 } from 'uuid';



const libraries = ['places']
const mapContainerStyle = {
  width:"100vw",
  height:"100vh"
}

const center={
  lat: 43.856098,
  lng:-79.337021
}

const styles={
  styles:MapStyles,
  disableDefaultUI:true,
  zoomControl:true,
}

export default function Map() {
    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState(null)
    const handleClick = useCallback((e)=>{
      setMarkers((prev)=>[...prev, {
        id: uuidv4(),
        lat:e.latLng.lat(),
        lng:e.latLng.lng(),
        time: new Date()
      }
      ])
    },[])
  
  
    const mapRef= useRef();
    const onMapLoad = useCallback((map)=>{
      mapRef.current = map
    },[])
    const{isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
  
    })
  
    if(loadError){
      return "Error Loading Maps"
    }
    if (!isLoaded){
      return "Loading Maps"
    }
  
    return (
      <div>
        <h1>TeamUp <span role="img" aria-label="tent">🤼</span></h1>
         <GoogleMap
         mapContainerStyle={mapContainerStyle}
         zoom={15}
         center={center}
          options={styles}
          onClick={(e)=>handleClick(e)}
          onLoad={onMapLoad}
         >
           {markers.map((marker)=>{
            return<Marker 
             key={marker.id} 
             position={{lat:marker.lat, lng:marker.lng}}
             onClick={()=>setSelected(marker)}
             />
           })}
           {
             selected? 
             <InfoWindow
              position={{lat:selected.lat, lng:selected.lng}}
              onCloseClick ={()=>setSelected(null)}
             >
             <div>
               <h2>Event</h2>
               <p>Yeet</p>
             </div>
           </InfoWindow>:null
           }
        </GoogleMap>
      </div>
    );
  }
