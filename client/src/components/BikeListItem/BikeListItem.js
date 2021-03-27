import React from 'react'
import { Link } from "react-router-dom";
import "./BikeListItem.css"

export default function BikeListItem({ bike }) {
  return (
    <div className="list-item">
      <Link to={`/bike/${bike.id}`} >
        <h1>{bike.name}</h1>
        <img src={bike.image} alt="bike" />
        <p>{bike.description}</p>
      </Link>
    </div>
  )
}
