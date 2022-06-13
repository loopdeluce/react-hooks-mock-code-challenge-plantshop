import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const[plants, setPlants] = useState([]);
  const[search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(resp => resp.json())
    .then(plantData => setPlants(plantData))
  }, []);

  function handleNewPlantSubmit (newPlant) {
    const newPlantList = [...plants, newPlant];
    setPlants(newPlantList);
  }

  function handlePlantSearch(e){
    setSearch(e.target.value);
  };

  function handlePlantDelete(deletedPlantId) {
    const updatedPlants = plants.filter(plant => plant.id !== deletedPlantId);
    setPlants(updatedPlants);
  }

  function handlePlantPriceUpdate(updatedPlant) {
    const updatedPlants = plants.map( plant => {
      if (plant.id === updatedPlant.id) {
        return {...plant, price: updatedPlant.price};
      } else {
        return plant;
      };
    })
    setPlants(updatedPlants);
  }

  const displayPlants = plants.filter(plant => plant.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main>
      <NewPlantForm onNewPlantSubmit={handleNewPlantSubmit}/>
      <Search search={search} onPlantSearch={handlePlantSearch}/>
      <PlantList plants={displayPlants} onDeletePlant={handlePlantDelete} onUpdatePlant={handlePlantPriceUpdate}/>
    </main>
  );
}

export default PlantPage;
