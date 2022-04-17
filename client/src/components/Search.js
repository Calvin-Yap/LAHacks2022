import React from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  
  import "@reach/combobox/styles.css";
  import "../styles/search.css"
export default function Search({panTo}) {

    const {ready, value, suggestions:{status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions:{
            location:{lat: ()=>43.856098,lng: ()=>-79.337021},
            radius: 200000,
        },
        debounce: 1000,

    })
    const handleInput = (e) => {
        setValue(e.target.value);
      };
    
      const handleSelect = async (address) => {
          setValue(address, false)
          clearSuggestions()
          try{
            const results = await getGeocode({address})
            const {lat, lng} = await getLatLng(results[0])
            panTo({lat,lng})
            setValue("")
          }catch(e){

          }
      };

      

  return (
    <div className='searchContainer'>
    <Combobox onSelect={async (address)=>handleSelect(address) }
    
    >
      <ComboboxInput placeholder="Search for a Location ..." value={value} onChange={handleInput} disabled={!ready} />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    </div>
  )
}
