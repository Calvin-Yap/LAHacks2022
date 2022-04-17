import React from 'react'
import "../styles/singleEvent.css"

export default function SingleEvent({databaseMarkers, joinClick}) {
  const attendees = databaseMarkers.attendees
  return (
    <div className="event-card row">
      <div className="column">
        <div className="top">
          <div className="exp-level">{databaseMarkers.experienceLevel}</div>
          <div className="event-name">{databaseMarkers.eventName}</div>
          <div className="row">
            <div className="date-time">{databaseMarkers.dateAndTime}</div>
            <div className="locate-link"><button>LOCATE</button></div>
          </div>
        </div>
        <div className="bottom">
          <div className="activity">{databaseMarkers.activityName}</div>
          <div>Age Range: {databaseMarkers.ageRange}</div>
        </div>
      </div>
      <div className="column">
        <div className="description">{databaseMarkers.activityDescription}</div>
        <div className="bottom"><button onClick={joinClick}>Join</button></div>
        <br/>
      </div>
      <div>
        {
        //<img src={databaseMarkers.attendees} alt="avatar"/>
        }
      </div>
    </div>
  )
}