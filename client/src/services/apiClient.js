import { bicycles } from '../mockData/bicycles';
import { complements } from '../mockData/complements';
import { complementOptions } from '../mockData/complementOptions';

function getAllBikes () {
  const result = bicycles;
  return new Promise((resolve) => resolve(result)).then(sleeper(200));
}

function getBikeById (bikeId) {
  const bike = bicycles.filter(bike => bike.id === bikeId)[0];


  let bikeComplements = [...new Set(bike.complementOptions.map(item => item.complementId))].map(complementId => complements.filter(el => el.id === complementId)[0]);
  bikeComplements = bikeComplements.map(complement => {
    return {...complement, options: bike.complementOptions.filter(option => option.complementId === complement.id)}
  });
  bike.complements = bikeComplements; // Array [ {id:1, name:'wheel size', options: []} , {}...] where options: [ {id:1, complementId:1, value:'red'}, {}...]

  const result = bike;
  return new Promise((resolve) => resolve(result)).then(sleeper(200));
}

function getAllComplements () {
  const result = complements;
  return new Promise((resolve) => resolve(result)).then(sleeper(200));
}

function getAllComplementsAndOptions () {
  const result = complements;
  for (const complement of result) {
    complement.options = [];
  }
  complementOptions.forEach(option => {
    for (const complement of complements) {
      if (complement.id === option.complementId) {
        complement.options.push(option);
        break;
      }
    }
  });

  return new Promise((resolve) => resolve(result)).then(sleeper(200));
}

function getComplementById (complementId) {
  const result = complements.filter(complement => complement.id === complementId)[0]
  return new Promise((resolve) => resolve(result)).then(sleeper(200));
}

function getOptionsForComplement (complementId) {
  const result = complementOptions.filter(option => option.complementId === complementId);
  return new Promise((resolve) => resolve(result)).then(sleeper(200));
}

// Helper function for testing (loading icons, etc)
function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

export default {
  getAllBikes,
  getBikeById,
  getAllComplements,
  getAllComplementsAndOptions,
  getComplementById,
  getOptionsForComplement
}