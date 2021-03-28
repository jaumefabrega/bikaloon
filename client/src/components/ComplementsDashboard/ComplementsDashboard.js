import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/apiClient';


export default function BikesDashboard() {
  const fetchComplements = () => {
    api.getAllComplements().then(complements => setComplements(complements));
  }

  const fetchOptionsForComplement = (complementId) => {
    api.getOptionsForComplement(complementId).then(options => setComplementOptions(options))
  }

  let [complements, setComplements] = useState([]);
  let [selectedComplement, setSelectedComplement] = useState();
  let [complementOptions, setComplementOptions] = useState([]);

  useEffect(() => fetchComplements(), []);
  useEffect(() => {if (selectedComplement) fetchOptionsForComplement(selectedComplement.id)}, [selectedComplement]);

  const optionsComponent = !selectedComplement
    ? <p>Select a complement</p>
    : (
      <div>
        <h2>{selectedComplement ? selectedComplement.name : ''} options</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" placeholder="New..." /></td>
              <td><input type="submit" value="ADD OPTION" /></td>
            </tr>
            { complementOptions.map(option => {
              return (
                <tr key={option.id}>
                  <td >{option.value}</td>
                  <td>delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );

  return (
    <div>
      <Link to={'/admin'} >BIKES</Link>
      <br/>
      <br/>
      <div style={{display:'flex'}}>
        <div>
            <h2>COMPLEMENTS</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { complements.map(complement => {
                  return (
                    <tr key={complement.id}>
                      <td onClick={() => setSelectedComplement(complement)} >{complement.name}</td>
                      <td>delete</td>
                    </tr>
                  );
                })}
                <tr>
                  <td><input type="text" placeholder="New..." /></td>
                  <td><input type="submit" value="ADD" /></td>
                </tr>
              </tbody>
            </table>
        </div>
        {optionsComponent}
      </div>
    </div>
  )
}
