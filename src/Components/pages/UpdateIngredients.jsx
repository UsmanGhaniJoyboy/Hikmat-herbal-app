import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
      fetchIngredientDetails(Nuskha_Id, ingredientId);
    }
  }, [Nuskha_Id, ingredientId]);

  const fetchIngredientDetails = async (nuskhaId, ingId) => {
    try {
      const response = await axios.get(
        `http://localhost/Hakeemhikmat/api/Addnushka/GetIngredientsByNuskha?nuskhaId=${nuskhaId}`
      );

      const ingredients = response.data;
      if (Array.isArray(ingredients)) {
        const currentIngredient = ingredients.find(ing => ing.ingredient_id === ingId);
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
    } catch (error) {
      console.error('Error fetching ingredient details:', error);
      setLoading(false);
    }
  };

  const handleUpdate = async (updateField) => {
    const updateData = {
      nuskhaId: Nuskha_Id,
      ingredientId: ingredientId,
      name: updateField === 'name' ? newName : null,
      quantity: updateField === 'quantity' ? newQuantity : null,
      unit: updateField === 'unit' ? newUnit : null,
    };

    try {
      const response = await axios.patch(
        'http://localhost/Hakeemhikmat/api/nuskhaingredient',
        updateData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Update successful:', response.data);
      alert("Update successful");
    } catch (error) {
      console.error('Error updating ingredient:', error);
      alert("Error updating ingredient. Please try again.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2>Update Ingredient</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Ingredient Name:</p>
            <p>{ingredient.IngredientName || 'No data'}</p>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Update Ingredient Name"
              style={{ padding: '5px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '200px' }}
            />
            <button
              onClick={() => handleUpdate('name')}
              style={{ padding: '7px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginLeft: '10px' }}
            >
              Update Name
            </button>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Quantity:</p>
            <p>{ingredient.quanity || 'No data'}</p>
            <input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              placeholder="Update Quantity"
              style={{ padding: '5px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '200px' }}
            />
            <button
              onClick={() => handleUpdate('quantity')}
              style={{ padding: '7px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginLeft: '10px' }}
            >
              Update Quantity
            </button>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', marginRight: '10px' }}>Unit:</p>
            <p>{ingredient.unit || 'No data'}</p>
            <input
              type="text"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              placeholder="Update Unit"
              style={{ padding: '5px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '200px' }}
            />
            <button
              onClick={() => handleUpdate('unit')}
              style={{ padding: '7px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', marginLeft: '10px' }}
            >
              Update Unit
            </button>
          </div>
          <button
            onClick={() => navigate("/HakeemProfile/Add_Remedies/Add_ingredient", { state: { Nuskha_Id } })}
            style={{ padding: '7px 15px', border: 'none', borderRadius: '4px', backgroundColor: '#6c757d', color: '#fff', cursor: 'pointer', marginLeft: '10px' }}
          >
            Back to Add Ingredient
          </button>
        </>
      )}
    </div>
  );
};

export default UpdateIngredients;
