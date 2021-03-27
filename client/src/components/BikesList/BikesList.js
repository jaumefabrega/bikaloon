import React from 'react'
import { bicycles } from '../../mockData/bicycles';

export default function BikesList() {
  return (
    <div>
      list of bikes
      { bicycles.map(bicycle => <p>{bicycle.name}</p>)}
    </div>
  )
}
