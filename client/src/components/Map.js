import React, {useState, useCallback, useRef, useEffect} from "react";
import Modal from 'react-modal';
import { database} from "../Firebase";
import {set, ref, onValue} from "firebase/database"
import SingleEvent from "./SingleEvent";
import "../styles/map.css"
import "../styles/modal.css"

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
import NavBar from "./NavBar";

const libraries = ['places']
export default function Map({user}) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [center ] = useState({ lat: 43.856098,lng:-79.337021})
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
    const [photos, setPhotos] = useState([])
    
    

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
      height:"82vh"
    }
    const styles={
      styles:MapStyles,
      disableDefaultUI:true,
      zoomControl:true,
      streetViewControl: true,
    }

    const mapRef= useRef()
    const onMapLoad = useCallback((map)=>{
      mapRef.current = map
    },[])

    const panTo = useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);
      window.scrollTo(0, 0)
    }, []);
    const{isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries:libraries,
    })

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
          activityDescription:activityDescription,

        });
        
        set(ref(database, `Markers/${uuid}/attendees/`+user.uid), {
          photo: user.photoURL
        });
        setPhotos((prev)=>[...prev, user.photoURL])


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
        <NavBar/>
        <Search panTo={panTo}/>

         <GoogleMap
         mapContainerStyle={mapContainerStyle}
         zoom={15}
         center={center}
          options={styles}
          onClick={(e)=>clickedMap(e)}
          onLoad={onMapLoad}
         >

           {databaseMarkers.map((marker) => (
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
        className="Modal"
        >
          <header>
            Create an Event
            <button className="close" onClick={closeModal}>
              
            </button>
          </header>
      
        <Event handleEventName={setEventName} handleDateAndTime={setDateAndTime} handleActivityName={setActivityName} handleExperienceLevel={setExperienceLevel} handleAgeRange={setAgeRange} handleActivityDescription={setActivityDescription} handleSubmit={submitDetails}/>
      </Modal>
           {selected?(<InfoWindow
           position={{lat:selected.lat, lng:selected.lng}}
           onCloseClick={()=> setSelected(null)}
           >
             <div className="infoWindowContainer">
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
              
               <br/>
             </div>
           </InfoWindow>):null}
        </GoogleMap>
        <div className="card-title">
          <h1>All Events</h1>
        </div>
        {
          
          databaseMarkers.map((eachEvent)=>{
            return <SingleEvent key={eachEvent.id} databaseMarkers={eachEvent}  user={user} arrayofphotos={photos} panTo={panTo}/>
          })
        }
        
      </div>
    );
  }
