import React, {useState} from "react";

function PlantCard({name, image, price, id, onDeletePlant, onUpdatePrice}) {
  const [isInStock, setIsInStock] = useState(true);
  const [updatePrice, setUpdatePrice] = useState(false);
  const [newPrice, setNewPrice] = useState(0)

  function handleStockClick(){
    setIsInStock((isInStock)=> !isInStock);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(onDeletePlant(id));
  }

  function handleUpdatePriceFrom() {
    setUpdatePrice(updatePrice => !updatePrice);
  }

  function handleChange(e) {
    setNewPrice(e.target.value);
  }

  function handlePriceUpdate(e) {
    e.preventDefault();
    const patchPrice = {price: newPrice};

    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(patchPrice)
    })
    .then(resp => resp.json())
    .then(updatedPlant => onUpdatePrice(updatedPlant))

    setNewPrice(0);
    setUpdatePrice(false);

  }
  
  const displayObj= updatePrice ? {display: 'block'} : {display: 'none'};

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {isInStock ? (
        <button className="primary" onClick={handleStockClick}>In Stock</button>
      ) : (
        <button onClick={handleStockClick}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdatePriceFrom}>Update Price</button>
      <form onSubmit={handlePriceUpdate} style={displayObj}>
        <input 
          name="price" 
          step="0.01" 
          placeholder="Update price" 
          value={newPrice} 
          onChange={handleChange}
        />
        <button className='primary' type='submit'>Update</button>
      </form>
    </li>
  );
}

export default PlantCard;
