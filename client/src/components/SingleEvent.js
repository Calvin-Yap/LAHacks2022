import React, { useState } from 'react'
import "../styles/singleEvent.css"
import { ref, update} from "firebase/database"
import { database} from "../Firebase";
export default function SingleEvent({databaseMarkers, user, arrayofphotos, panTo}) {
  const lat = databaseMarkers.lat;
  const lng = databaseMarkers.lng;
  const [photos, setPhotos ]= useState(arrayofphotos)
  const joinClick = (e)=>{
    setPhotos((prev)=>[...prev, user.photoURL])
    update(ref(database, `Markers/`+databaseMarkers.id +`/attendees/`+user.uid), {
      photo: user.photoURL
    });
    
  }

  return (
    <div className="event-card row">
      <div className="column">
        <div className="top">
          <div className="exp-level">{databaseMarkers.experienceLevel}</div>
          <div className="event-name">{databaseMarkers.eventName}</div>
          <div className="row">
            <div className="date-time">{databaseMarkers.dateAndTime}</div>
            <div className="locate-link"><button value={{lat: databaseMarkers.lat, lng: databaseMarkers.lng}} onClick={(e)=>{panTo({lat, lng})}
              }>LOCATE</button></div>
          </div>
        </div>
        <div className="bottom">
          <div className="activity">{databaseMarkers.activityName}</div>
          <div>Age Range: {databaseMarkers.ageRange}</div>
        </div>
      </div>
      <div className="column">
        <div className="description">{databaseMarkers.activityDescription}</div>
        <div className="bottom"><button value={user.photoURL} onClick={(e)=>joinClick(e.target.value)}>Join</button></div>
        <br/>
      </div>
      <div>
        {
          photos.length > 0?<img className="avatar" src={photos[0]} alt="avatar"/>:null
        }
      </div>
    </div>
  )
}