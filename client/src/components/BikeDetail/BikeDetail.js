import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { bicycles } from '../../mockData/bicycles';
import { complements } from '../../mockData/complements';
import api from '../../services/apiClient';

import "./BikeDetail.css"
import BoxedRadio from '../BoxedRadio/BoxedRadio';

export default function BikeDetail() {
  let { bikeId } = useParams();
  bikeId = parseInt(bikeId);
  let [bike, setBike] = useState();

  useEffect(() => api.getBikeById(bikeId).then(bike => setBike(bike)), [setBike]);

  let bikeComplements;
  if (bike) bikeComplements = [...new Set(bike.complementOptions.map(item => item.complementId))].map(complementId => complements.filter(el => el.id === complementId)[0]);
  if (bike) bikeComplements = bikeComplements.map(complement => {
    return {...complement, options: bike.complementOptions.filter(option => option.complementId === complement.id)}
  });

  const initialSelectedOptions = {};
  if (bike) bikeComplements.forEach(complement => initialSelectedOptions[complement.id] = '');
  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);

  let excludedOptionsIds
  if (bike) excludedOptionsIds = bike.complementCombinationExclusions.map(exclStr => exclStr.split('-')).map(exclArr => exclArr.filter(optId => !Object.values(selectedOptions).includes(optId))).filter(exclArr => exclArr.length === 1).map(exclArr => parseInt(exclArr[0]));

  const handleSelectChange = ({target}, complementId) => {
    setSelectedOptions(prevState => {
      return {...prevState, [complementId]: target.value};
    });
  }

  return !bike ? <h2>Loading</h2> : (
    <div className="product-detail">
      Bike detail for bike with id {bikeId}
      { bikeComplements.map(complement => {
        return (
          <BoxedRadio
            name={complement.name}
            id={complement.id}
            allOptions={complement.options}
            selectedOptionId={selectedOptions[complement.id]}
            disabledOptionsIds={excludedOptionsIds}
            key={complement.id}
            handleChange={handleSelectChange}
          />
        )
      })}
      <h1>{bike.name}</h1>
      <img src={bike.image} alt="bike" />
      <p>{bike.description}</p>
    </div>
  )
}
