import React from 'react'
import { useParams } from "react-router-dom";
import { bicycles } from '../../mockData/bicycles';
import { complements } from '../../mockData/complements';
import "./BikeDetail.css"

export default function BikeDetail() {
  let { bikeId } = useParams();
  bikeId = parseInt(bikeId);

  const bike = bicycles.filter(bike => bike.id === bikeId)[0];
  let bikeComplements = [...new Set(bike.complementOptions.map(item => item.complementId))].map(complementId => complements.filter(el => el.id === complementId)[0]);
  bikeComplements = bikeComplements.map(complement => {
    return {...complement, options: bike.complementOptions.filter(option => option.complementId === complement.id)}
  });
  console.log(bikeComplements);

  return (
    <div className="product-detail">
      Bike detail for bike with id {bikeId}
      { bikeComplements.map(complement => {
        const optionsArray = complement.options.map(option => <li key={option.id}>{option.value}</li>);
        return (
          <div key={complement.id}>
            <h3>{complement.name}</h3>
            {optionsArray}
          </div>
        );
      })}
      <h1>{bike.name}</h1>
      <img src={bike.image} alt="bike" />
      <p>{bike.description}</p>
    </div>
  )
}
