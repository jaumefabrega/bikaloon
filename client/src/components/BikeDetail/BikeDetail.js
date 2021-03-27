import React from 'react'
import { useParams } from "react-router-dom";
import { bicycles } from '../../mockData/bicycles';
import "./BikeDetail.css"

export default function BikeDetail() {
  let { bikeId } = useParams();
  bikeId = parseInt(bikeId);

  const bike = bicycles.filter(bike => bike.id === bikeId)[0];

  return (
    <div className="product-detail">
      Bike detail for bike with id {bikeId}
      <h1>{bike.name}</h1>
      <img src={bike.image} alt="bike" />
      <p>{bike.description}</p>
    </div>
  )
}
