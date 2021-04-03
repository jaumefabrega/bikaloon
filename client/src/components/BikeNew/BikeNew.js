import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import api from '../../services/apiClient';
import "./BikeNew.css"

export default function BikeNew() {
  const fetchComplements = () => {
    api.getAllComplementsAndOptions().then(complements => {console.log(complements);setComplements(complements)});
  }

  const updateBikeCharacteristics = (event) => {
    setBikeCharacteristics((prevBikeChars) => {
      return {...prevBikeChars, [event.target.name]: event.target.value }
    })
  }

  const addOption = (event, complementId) => {
    console.log(event.target.value);
    setAddedOptions(prevAddedOptions => {
      const newAddedOptions = {...prevAddedOptions};
      newAddedOptions[complementId] = newAddedOptions[complementId] ? [...newAddedOptions[complementId], event.target.value] : [event.target.value];
      return newAddedOptions;
    });
  }

  const removeOption = (optionId, complementId) => {
    console.log('removing', optionId);
    setAddedOptions(prevAddedOptions => {
      const newAddedOptions = {...prevAddedOptions};
      newAddedOptions[complementId] = newAddedOptions[complementId].filter(option => option !== optionId);
      return newAddedOptions;
    });
  }

  // const bikeId = parseInt(useParams().bikeId); // FIX: if it exists, it is edit, not new
  const INITIAL_BIKE_CHARACTERISTICS = {
    name: '',
    price: '',
    description: ''
  };

  useEffect(() => fetchComplements(), []);
  let [bikeCharacteristics, setBikeCharacteristics] = useState(INITIAL_BIKE_CHARACTERISTICS);
  let [complements, setComplements] = useState([]);
  let [addedOptions, setAddedOptions] = useState({});

  return (
    <div>
      <h1>NEW BIKE</h1>
      <div style={{display:'flex'}}>
        <div>
          <h2>Main characteristics</h2>
          <input type="text" placeholder="Name" name="name" value={bikeCharacteristics.name} onChange={(event) => updateBikeCharacteristics(event)} autoComplete="off"/><br/><br/>
          <input type="number" placeholder="Price" name="price" value={bikeCharacteristics.price} onChange={(event) => updateBikeCharacteristics(event)} autoComplete="off"/><br/><br/>
          <textarea placeholder="Description" name="description" value={bikeCharacteristics.description} onChange={(event) => updateBikeCharacteristics(event)} autoComplete="off" /><br/><br/>
          <label htmlFor="image">
            Image
            <input type="file" placeholder="Image" />
          </label>
        </div>
        <div>
          <h2>Complements</h2>
          {complements.map(complement => {
            return (
              <React.Fragment key={complement.id} >
                <h3>{complement.name}</h3>
                <select name={complement.name} id={complement.name} autoComplete="off" value="" onChange={(event) => addOption(event, complement.id)} >
                  <option value="" disabled checked >--Add </option>
                  {complement.options.map(option => {
                    return (
                      <option value={option.id} key={option.id} >{option.value}</option>
                    )
                  })}
                </select>

                {addedOptions[complement.id] ? (
                  addedOptions[complement.id].map(option => <p key={option} onClick={(() => removeOption(option, complement.id))}>{option}</p>)
                ): ''}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
