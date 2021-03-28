import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/apiClient';


export default function BikesDashboard() {
  const fetchBikes = () => {
    api.getAllBikes().then(bikes => setBikes(bikes));
  }

  let [bikes, setBikes] = useState([]);
  useEffect(() => fetchBikes(), []);

  return (
    <div>
      <Link to={'/admin/bike/new'} >ADD NEW BIKE</Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { bikes.map(bike => {
              return (
                <tr key={bike.id}>
                  <td>{bike.id}</td>
                  <td>{bike.name}</td>
                  <td>{bike.price}</td>
                  <td><Link to={`/admin/bike/${bike.id}`} >EDIT</Link></td>
                  <td>delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  )
}
