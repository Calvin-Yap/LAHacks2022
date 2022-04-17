import React from 'react'
import "../styles/singleEvent.css"

export default function SingleEvent({databaseMarkers}) {
  return (
    <div className="event-card row">
      <div className="column">
        <div className="top">
          <div className="exp-level">{databaseMarkers.experienceLevel}</div>
          <div className="event-name">{databaseMarkers.eventName}</div>
          <div className="date-time">{databaseMarkers.dateAndTime}</div>
        </div>
        <div className="bottom">
          <div className="activity">{databaseMarkers.activityName}</div>
          <div>Age Range: {databaseMarkers.ageRange}</div>
        </div>
      </div>
      <div className="column">
        <div className="description">{databaseMarkers.activityDescription}</div>
        <button className="bottom">Join</button>
        <br/>
      </div>
      
    </div>
  )
}