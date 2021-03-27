import React from 'react'
import { useParams } from "react-router-dom";

export default function BikeDetail() {
  let { bikeId } = useParams();
  return (
    <div>
      Bike detail for bike with id {bikeId}
    </div>
  )
}
