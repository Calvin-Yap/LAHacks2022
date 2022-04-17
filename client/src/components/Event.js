import React from 'react'

export default function Event({handleEventName, handleDateAndTime, handleActivityName, handleExperienceLevel, handleAgeRange, handleActivityDescription, handleSubmit}) {
  return (
    <div>
 
        <label htmlFor ="event-name">Event name:</label><br/>
        <input type="text" id="event-name" required name="event-name" onChange={(e)=>handleEventName(e.target.value)}/><br/>

        <label htmlFor ="meeting-time">Choose a time for your event:</label><br/>

        <input type="datetime-local" id="meeting-time"
       name="meeting-time" min="2022-04-16T00:00" required onChange={(e)=>handleDateAndTime(e.target.value)} /><br/>


        <label htmlFor ="activity">Activity:</label><br/>
        <input type="text" id="activity" name="activity" required onChange={(e)=>handleActivityName(e.target.value)}/><br/>

        <label htmlFor ="exp-level">Experience</label><br/>
        <select name="exp-level" id="exp-level" required  onChange={(e)=>handleExperienceLevel(e.target.value)}>
          <option  value="" hidden>Select an experience level</option>
          <option value="Absolute beginner">Absolute beginner</option>
          <option value="Familiar">Familiar</option>
          <option value="Comfortable">Comfortable</option>
          <option value="Expert">Expert</option>
        </select><br/>

        <label name="age-group">Age range</label><br/>
        <select name="age-group" id="age-group" required  onChange={(e)=>handleAgeRange(e.target.value)}>
          <option value="" hidden>Select an age range</option>
          <option value="7-12">7-12</option>
          <option value="13-17">13-17</option>
          <option value="18-24">18-24</option>
          <option value="25-30">25-30</option>
          <option value="31-40">31-40</option>
          <option value="41-50">41-50</option>
          <option value="50-64">50-64</option>
          <option value="65+">65+</option>
        </select><br/>

        <label htmlFor ="description">Activity Description</label><br/>
        <textarea placeholder="We're here to play sports! hehe super fun!" name="description" rows="4" cols="50" onChange={(e)=>handleActivityDescription(e.target.value)}>
          
        </textarea><br/>

        <input type="submit" value="Submit" onClick={handleSubmit}/>

    </div>
  )
}