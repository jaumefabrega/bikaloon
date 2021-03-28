import { bicycles } from '../mockData/bicycles';
import { complements } from '../mockData/complements';
import { complementOptions } from '../mockData/complementOptions';

function getAllBikes () {
  const result = bicycles;
  return new Promise((resolve) => resolve(result)).then(sleeper(200));
}

function getBikeById (bikeId) {
  const result = bicycles.filter(bike => bike.id === bikeId)[0]
  return new Promise((resolve) => resolve(result)).then(sleeper(200));
}

function getAllComplements () {
  const result = complements;
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
  getComplementById,
  getOptionsForComplement
}