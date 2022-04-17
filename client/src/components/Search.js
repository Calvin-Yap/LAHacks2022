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
          try{
              console.log(address)
            const results = await getGeocode({address})
            const {lat, lng} = await getLatLng(results[0])
            console.log({lat,lng})
            panTo({lat,lng})
            //handleSearchLocation({lat:lat, lng: lng})

          }catch(e){

          }
      };

      

  return (
    <div>
    <Combobox onSelect={(address)=>handleSelect(address)}>
      <ComboboxInput placeholder="Search" value={value} onChange={handleInput} disabled={!ready} />
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