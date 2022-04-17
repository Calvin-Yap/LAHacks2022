import React from 'react'
import "../styles/event.css"

export default function Event({handleEventName, handleDateAndTime, handleActivityName, handleExperienceLevel, handleAgeRange, handleActivityDescription, handleSubmit}) {
  return (
    <div className = "modal-event">
      <form>
        <div className="entry">
          <label htmlFor ="event-name">Event name</label><br/>
          <input type="text" id="event-name" name="event-name" class="input-field" required onChange={(e)=>handleEventName(e.target.value)}/><br/>
        </div>
        
        <div className="entry">
          <label htmlFor ="meeting-time">Event time</label><br/>
          <input type="datetime-local" id="meeting-time"
       name="meeting-time" min="2022-04-16T00:00" class="input-field" required onChange={(e)=>handleDateAndTime(e.target.value)} /><br/>
        </div>

        <div className="entry">
          <label htmlFor ="activity">Activity</label><br/>
          <input type="text" id="activity" name="activity" class="input-field" required onChange={(e)=>handleActivityName(e.target.value)}/><br/>
        </div>


        <div className="entry">
          <label htmlFor ="exp-level">Experience</label><br/>
          <select name="exp-level" id="exp-level" class="input-field" required onChange={(e)=>handleExperienceLevel(e.target.value)}>
            <option value="" hidden>Select an experience level</option>
            <option value="Absolute beginner">Absolute beginner</option>
            <option value="Familiar">Familiar</option>
            <option value="Comfortable">Comfortable</option>
            <option value="Expert">Expert</option>
          </select><br/>
        </div>

        <div className="entry">
          <label name="age-group">Age range</label><br/>
          <select name="age-group" id="age-group" class="input-field" required onChange={(e)=>handleAgeRange(e.target.value)}>
            <option value="" hidden>Select an age range</option>
            <option value="7-12">7-12</option>
            <option value="13-17">13-17</option>
            <option value="18-24">18-24</option>
            <option value="25-30">25-30</option>
            <option value="31-40">31-40</option>
            <option value="41-50">41-50</option>
            <option value="50-64">50-64</option>
            <option value="65+">65+</option>
            <option value="Any">Any age</option>
          </select><br/>
        </div>

        <div className="entry">
          <label htmlFor ="description">Activity Description</label><br/>
          <textarea placeholder="We're here to play sports! hehe super fun!" name="description" rows="4" cols="50" class="input-field" required onChange={(e)=>handleActivityDescription(e.target.value)}>
          </textarea><br/>
        </div>

        <input type="submit" class="submit" value="Submit" onSubmit={handleSubmit}/>

      </form>
    </div>
  )
}