import React, {useState, useCallback, useRef} from "react";
import Modal from 'react-modal';
import{
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'
import { MapStyles } from '../styles/MapStyles'
import { v4 as uuidv4 } from 'uuid';
import Search from "./Search";
import Event from "./Event";
const libraries = ['places']
export default function Map({handleEventName, handleDateAndTime, handleActivityName, handleExperienceLevel, handleAgeRange, handleActivityDescription}) {
    const [markers, setMarkers] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [center, setCenter] = useState({ lat: 43.856098,lng:-79.337021})
    const [holdDetails, setDetails] = useState({})


    /*

    */
    const [eventName, setEventName] = useState("")
    const [dateAndTime, setDateAndTime] = useState("")
    const [activityName, setActivityName] = useState("")
    const [experienceLevel, setExperienceLevel] = useState("")
    const [ageRange, setAgeRange] = useState("")
    const [activityDescription, setActivityDescription] = useState("")

    const mapContainerStyle = {
      width:"100vw",
      height:"85vh"
    }
    const styles={
      styles:MapStyles,
      //disableDefaultUI:true,
      zoomControl:true,
    }

    const mapRef= useRef()
    const onMapLoad = useCallback((map)=>{
      mapRef.current = map
    },[])

    const panTo = useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }, []);
    const{isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries:libraries,
    })
    const handleClick = useCallback((e)=>{
      setIsOpen(true);
      setMarkers((prev)=>[...prev, {
        id: uuidv4(),
        lat:e.latLng.lat(),
        lng:e.latLng.lng(),
        time: new Date()
      }
      ])
      setCenter({ lat:e.latLng.lat(),lng:e.latLng.lng()})
      
    },[])



    if(loadError){
      return "Error Loading Maps"
    }
    if (!isLoaded){
      return "Loading Maps"
    }
  
    const onLoad = infoWindow => {
      console.log('infoWindow: ', infoWindow)
    }
    const openModal=()=> {
      setIsOpen(true);
    }
    const closeModal=()=> {
      setIsOpen(false);
    }

    const submitDetails =()=>{
      console.log("yes")
    }

    const viewDetails =()=>{

    }
    const clickedMap =(e)=>{
      setIsOpen(true);
      setDetails()
    }
    

    return (
      <div>
        <h1>TeamUp <span role="img" aria-label="tent">🤼</span></h1>
        <Search panTo={panTo}/>

         <GoogleMap
         mapContainerStyle={mapContainerStyle}
         zoom={15}
         center={center}
          options={styles}
          //onClick={(e)=>handleClick(e)}
          onClick={(e)=>clickedMap(e)}
          onLoad={onMapLoad}
         >
           {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={viewDetails}
          />
        ))}
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <button onClick={closeModal}>close</button>
        <Event handleEventName={setEventName} handleDateAndTime={setDateAndTime} handleActivityName={setActivityName} handleExperienceLevel={setExperienceLevel} handleAgeRange={setAgeRange} handleActivityDescription={setActivityDescription} handleSubmit={submitDetails}/>
      </Modal>
           
        </GoogleMap>
      </div>
    );
  }
