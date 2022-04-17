import React, {useState, useCallback, useRef, useEffect} from "react";
import Modal from 'react-modal';
import { database} from "../Firebase";
import {set, ref, onValue} from "firebase/database"
import SingleEvent from "./SingleEvent";
import "../styles/map.css"

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
    const [selected, setSelected] = useState(null);

    const [databaseMarkers, setDatabaseMarkers] = useState([])


    /*

    */
    const [eventName, setEventName] = useState("")
    const [dateAndTime, setDateAndTime] = useState("")
    const [activityName, setActivityName] = useState("")
    const [experienceLevel, setExperienceLevel] = useState("")
    const [ageRange, setAgeRange] = useState("")
    const [activityDescription, setActivityDescription] = useState("")


    useEffect(()=>{
      onValue(ref(database, 'Markers'), snapshot =>{
        const data = snapshot.val()
        let result = [];
        if(data!== null){
          Object.values(data).forEach((marker)=>{
            result.push(marker)
          })
        }
        setDatabaseMarkers(result)
      })
     
    },[])


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
      mapRef.current.setZoom(20);
    }, []);
    const{isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries:libraries,
    })

      //setCenter({ lat:e.latLng.lat(),lng:e.latLng.lng()})

    if(loadError){
      return "Error Loading Maps"
    }
    if (!isLoaded){
      return "Loading Maps"
    }

    const closeModal=()=> {
      setIsOpen(false)
      setDetails({})
    }

    const submitDetails =()=>{
      setIsOpen(false)
      if(eventName !==""  && dateAndTime !=="" && activityName!=="" && ageRange!=="" &&experienceLevel!== "" ){
        const uuid = uuidv4()
        set(ref(database, `Markers/${uuid}`), {
          id: uuid,
          lat:holdDetails.lat,
          lng:holdDetails.lng,
          eventName: eventName,
          dateAndTime: dateAndTime,
          activityName:activityName,
          experienceLevel: experienceLevel,
          ageRange:ageRange,
          activityDescription:activityDescription

        });
        setMarkers((prev)=>[...prev, {
          id: uuidv4(),
          lat:holdDetails.lat,
          lng:holdDetails.lng,
          eventName: eventName,
          dateAndTime: dateAndTime,
          activityName:activityName,
          experienceLevel: experienceLevel,
          ageRange:ageRange,
          activityDescription:activityDescription
        }
        ])

        setEventName("")
        setDateAndTime("")
        setActivityName("")
        setAgeRange("")
        setExperienceLevel("")
        setActivityDescription("")
      }
      
    }

    const clickedMap =(e)=>{
      setIsOpen(true);
      setDetails({lat:e.latLng.lat(),lng:e.latLng.lng()})
    }
    

    return (
      <div>
        <h1 className="title">TeamUp <span role="img" aria-label="tent">🤼</span></h1>
        <Search panTo={panTo}/>

         <GoogleMap
         mapContainerStyle={mapContainerStyle}
         zoom={15}
         center={center}
          options={styles}
          
          onClick={(e)=>clickedMap(e)}
          onLoad={onMapLoad}
         >

           {markers&&databaseMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={()=>{ setSelected(marker)}}
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
           {selected?(<InfoWindow
           position={{lat:selected.lat, lng:selected.lng}}
           onCloseClick={()=> setSelected(null)}
           >
             <div>
               <h1>{selected.eventName}</h1>
               <h3>Date and Time:{selected.dateAndTime}</h3>
               <h4>Activty</h4>
               <p>{selected.activityName}</p>
               <h4>Experience Level</h4>
               <p>{selected.experienceLevel}</p>
               <h4>Age Range</h4>
               <p>{selected.ageRange}</p>
               <h4>Description</h4>
               <p>{selected.activityDescription}</p>
               <button>Join</button>
               <br/>
             </div>
           </InfoWindow>):null}
        </GoogleMap>
        {
          databaseMarkers.map((eachEvent)=>{
            return <SingleEvent databaseMarkers={eachEvent}/>
          })
        }
        
      </div>
    );
  }
