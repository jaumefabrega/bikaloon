import React from 'react'
import { bicycles } from '../../mockData/bicycles';
import BikeListItem from '../BikeListItem/BikeListItem';
import './BikesList.css'

export default function BikesList() {
  return (
    <>
      list of bikes
      <div className="product-list">
        { bicycles.map(bicycle => <BikeListItem bike={bicycle} key={bicycle.id} />)}
      </div>
  </>
  )
}
