import React from 'react'

export default function Event({handleEventName, handleDateAndTime, handleActivityName, handleExperienceLevel, handleAgeRange, handleActivityDescription, handleSubmit}) {
  return (
    <div>
      <form>
        <label htmlFor ="event-name">Event name:</label><br/>
        <input type="text" id="event-name" name="event-name" onChange={(e)=>handleEventName(e.target.value)}/><br/>

        <label htmlFor ="meeting-time">Choose a time for your event:</label><br/>

        <input type="datetime-local" id="meeting-time"
       name="meeting-time" min="2022-04-16T00:00" onChange={(e)=>handleDateAndTime(e.target.value)} /><br/>


        <label htmlFor ="activity">Activity:</label><br/>
        <input type="text" id="activity" name="activity" onChange={(e)=>handleActivityName(e.target.value)}/><br/>

        <label htmlFor ="exp-level">Experience</label><br/>
        <select name="exp-level" id="exp-level" onChange={(e)=>handleExperienceLevel(e.target.value)}>
          <option value="select">Select an experience level</option>
          <option value="abs-beginner">Absolute beginner</option>
          <option value="familiar">Familiar</option>
          <option value="comfortable">Comfortable</option>
          <option value="expert">Expert</option>
        </select><br/>

        <label name="age-group">Age range</label><br/>
        <select name="age-group" id="age-group" onChange={(e)=>handleAgeRange(e.target.value)}>
          <option value="age-group-none">Select an age range</option>
          <option value="age-group1">7-12</option>
          <option value="age-group2">13-17</option>
          <option value="age-group3">18-24</option>
          <option value="age-group4">25-30</option>
          <option value="age-group5">31-40</option>
          <option value="age-group6">41-50</option>
          <option value="age-group7">50-64</option>
          <option value="age-group8">65+</option>
        </select><br/>

        <label htmlFor ="description">Activity Description</label><br/>
        <textarea defaultValue="We're here to play sports! hehe super fun!" name="description" rows="4" cols="50" onChange={(e)=>handleActivityDescription(e.target.value)}>
          
        </textarea><br/>

        <input type="submit" value="Submit" onSubmit={handleSubmit}/>
      </form>
    </div>
  )
}