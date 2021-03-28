import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { bicycles } from '../../mockData/bicycles';
import { complements } from '../../mockData/complements';
import "./BikeDetail.css"
import BoxedRadio from '../BoxedRadio/BoxedRadio';

export default function BikeDetail() {
  let { bikeId } = useParams();
  bikeId = parseInt(bikeId);

  const bike = bicycles.filter(bike => bike.id === bikeId)[0];
  let bikeComplements = [...new Set(bike.complementOptions.map(item => item.complementId))].map(complementId => complements.filter(el => el.id === complementId)[0]);
  bikeComplements = bikeComplements.map(complement => {
    return {...complement, options: bike.complementOptions.filter(option => option.complementId === complement.id)}
  });

  const initialSelectedOptions = {};
  bikeComplements.forEach(complement => initialSelectedOptions[complement.id] = '');
  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);

  const excludedOptionsIds = bike.complementCombinationExclusions.map(exclStr => exclStr.split('-')).map(exclArr => exclArr.filter(optId => !Object.values(selectedOptions).includes(optId))).filter(exclArr => exclArr.length === 1).map(exclArr => parseInt(exclArr[0]));

  const handleSelectChange = ({target}, complementId) => {
    setSelectedOptions(prevState => {
      const newState = {...prevState};
      newState[complementId] = target.value;
      return newState;
    });
  }

  return (
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
