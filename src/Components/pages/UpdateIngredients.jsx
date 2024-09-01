import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateIngredients = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Nuskha_Id, ingredientId } = location.state || {};

  const [ingredient, setIngredient] = useState({});
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Nuskha_Id && ingredientId) {
      axios.get(`http://localhost/Hakeemhikmat/api/Addnuskha/GetIngredientsByNuskha?nuskhaId=${Nuskha_Id}`)
        .then(response => {
          const ingredients = response.data;
          if (Array.isArray(ingredients)) {
            const currentIngredient = ingredients.find(ing => ing.ingredient_id === ingredientId);
            if (currentIngredient) {
              setIngredient(currentIngredient);
              setNewName(currentIngredient.IngredientName || '');
              setNewQuantity(currentIngredient.quanity || '');
              setNewUnit(currentIngredient.unit || '');
            } else {
              console.warn('Ingredient not found in the response.');
            }
          } else {
            console.error('Invalid data format from API.');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching ingredient details:', error);
          setLoading(false);
        });
    } else {
      console.error('Nuskha_Id or ingredientId is missing in location state.');
      setLoading(false);
    }
  }, [Nuskha_Id, ingredientId]);

  const handleUpdate = (type) => {
    const updateData = {
      nuskhaId: Nuskha_Id,
      ingredientId: ingredientId,
    };

    if (type === 'name') updateData.name = newName;
    if (type === 'quantity') updateData.quantity = newQuantity;
    if (type === 'unit') updateData.unit = newUnit;

    axios.post('http://localhost/Hakeemhikmat/api/Addnuskha/UpdateNuskhaIngredient', updateData)
      .then(response => {
        console.log('Update successful:', response.data);
        // Optionally provide feedback or update UI
      })
      .catch(error => {
        console.error('Error updating ingredient:', error);
      });
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  const sectionStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '10px'
  };

  const inputStyle = {
    padding: '5px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '200px'
  };

  const buttonStyle = {
    padding: '7px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: '10px'
  };

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d'
  };

  return (
    <div style={containerStyle}>
      <h2>Update Ingredient</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={sectionStyle}>
            <p style={labelStyle}>Ingredient Name:</p>
            <p>{ingredient.IngredientName || 'No data'}</p>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Update Ingredient Name"
              style={inputStyle}
            />
            <button onClick={() => handleUpdate('name')} style={buttonStyle}>Update Name</button>
          </div>
          <div style={sectionStyle}>
            <p style={labelStyle}>Quantity:</p>
            <p>{ingredient.quanity || 'No data'}</p>
            <input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              placeholder="Update Quantity"
              style={inputStyle}
            />
            <button onClick={() => handleUpdate('quantity')} style={buttonStyle}>Update Quantity</button>
          </div>
          <div style={sectionStyle}>
            <p style={labelStyle}>Unit:</p>
            <p>{ingredient.unit || 'No data'}</p>
            <input
              type="text"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              placeholder="Update Unit"
              style={inputStyle}
            />
            <button onClick={() => handleUpdate('unit')} style={buttonStyle}>Update Unit</button>
          </div>
          <button onClick={() => navigate("/HakeemProfile/Add_Remedies/Add_ingredient", { state: { Nuskha_Id } })} style={backButtonStyle}>Back to Add Ingredient</button>
        </>
      )}
    </div>
  );
};

export default UpdateIngredients;
