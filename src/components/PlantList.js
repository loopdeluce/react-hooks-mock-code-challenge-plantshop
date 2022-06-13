import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onDeletePlant, onUpdatePlant}) {
  const plantsElements = plants.map(plant => {
    return (
      <PlantCard 
        name={plant.name}
        image={plant.image}  
        price={plant.price}
        id={plant.id}
        key={plant.key}
        onDeletePlant={onDeletePlant}
        onUpdatePrice={onUpdatePlant}
      />
    )
  })

  return (
    <ul className="cards">
      {plantsElements}
    </ul>
  );
}

export default PlantList;
