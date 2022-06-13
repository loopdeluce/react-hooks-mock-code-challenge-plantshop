import React, {useState} from "react";

function NewPlantForm({onNewPlantSubmit}) {
  const [formData, setFormData] = useState({
    name: '',
    image:'',
    price:0,
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newFormData = {...formData, [name]: value};
    setFormData(newFormData);
  };

  function handleSumbit(e) {
    e.preventDefault();

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(formData)
    })
    .then(resp => resp.json())
    .then(newPlant => {
      onNewPlantSubmit(newPlant)
      setFormData({
        name: '',
        image:'',
        price:0
      })
    })

  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSumbit}>
        <input type="text" name="name" placeholder="Plant name" value={formData.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
