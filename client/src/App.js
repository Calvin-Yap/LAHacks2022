import React,{useState} from "react";
import Map from "./components/Map";
import Event from "./components/Event";
function App() {
  const [eventName, setEventName] = useState("")
  const [dateAndTime, setDateAndTime] = useState("")
  const [activityName, setActivityName] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [ageRange, setAgeRange] = useState("")
  const [activityDescription, setActivityDescription] = useState("")

  return (
    <div>
      <Event handleEventName={setEventName} handleDateAndTime={setDateAndTime} handleActivityName={setActivityName} handleExperienceLevel={setExperienceLevel} handleAgeRange={setAgeRange} handleActivityDescription={setActivityDescription}/>
    </div>
  );
}

export default App;
