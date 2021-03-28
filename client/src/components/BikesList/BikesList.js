import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../services/apiClient';
import BikeListItem from '../BikeListItem/BikeListItem';
import './BikesList.css'

export default function BikesList() {
  const fetchBikes = () => {
    api.getAllBikes().then(bikes => setBikes(bikes));
  }

  let [bikes, setBikes] = useState([]);
  useEffect(() => fetchBikes(), []);

  return (
    <>
      list of bikes
      <div className="product-list">
        { bikes.map(bike => <BikeListItem bike={bike} key={bike.id} />)}
      </div>
  </>
  )
}
