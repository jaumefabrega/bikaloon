import React from 'react'
import { bicycles } from '../../mockData/bicycles';
import BikeListItem from '../BikeListItem/BikeListItem';

export default function BikesList() {
  return (
    <div>
      list of bikes
      { bicycles.map(bicycle => <BikeListItem bike={bicycle} />)}
    </div>
  )
}
