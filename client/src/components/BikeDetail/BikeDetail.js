import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import api from '../../services/apiClient';
import "./BikeDetail.css"
import BoxedRadio from '../BoxedRadio/BoxedRadio';

export default function BikeDetail() {
  // FUNCTIONS
  const fetchBike = (bikeId) => {
    api.getBikeById(bikeId).then(bike => setBike(bike))
  };

  const handleSelectionChange = ({target}, complementId) => {
    setSelectedOptions(prevState => {
      return {...prevState, [complementId]: target.value};
    });
  }


  // VARIABLES
  const bikeId = parseInt(useParams().bikeId);
  let [bike, setBike] = useState();
  useEffect(() => fetchBike(bikeId), []);
  const [selectedOptions, setSelectedOptions] = useState({});
  let excludedOptionsIds = bike ? bike.complementCombinationExclusions.map(exclStr => exclStr.split('-')).map(exclArr => exclArr.filter(optId => !Object.values(selectedOptions).includes(optId))).filter(exclArr => exclArr.length === 1).map(exclArr => parseInt(exclArr[0])) : [];


  // RETURN
  return !bike
    ? <h2>Loading</h2>
    : (
        <div className="product-detail">
          Bike detail for bike with id {bikeId}
          { bike.complements.map(complement => {
            return (
              <BoxedRadio
                name={complement.name}
                id={complement.id}
                allOptions={complement.options}
                selectedOptionId={selectedOptions[complement.id]}
                disabledOptionsIds={excludedOptionsIds}
                key={complement.id}
                handleChange={handleSelectionChange}
              />
            )
          })}
          <h1>{bike.name}</h1>
          <img src={bike.image} alt="bike" />
          <p>{bike.description}</p>
        </div>
      )
}
