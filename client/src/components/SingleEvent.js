import React from 'react'

export default function SingleEvent({databaseMarkers}) {
  return (
    <div>
    <h1>{databaseMarkers.eventName}</h1>
    <h3>Date and Time: {databaseMarkers.dateAndTime}</h3>
    <h4>Activty</h4>
    <p>{databaseMarkers.activityName}</p>
    <h4>Experience Level</h4>
    <p>{databaseMarkers.experienceLevel}</p>
    <h4>Age Range</h4>
    <p>{databaseMarkers.ageRange}</p>
    <h4>Description</h4>
    <p>{databaseMarkers.activityDescription}</p>
    <button>Join</button>
    <br/>
  </div>
  )
}
