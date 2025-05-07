import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FabricStockManagement() {
  const [fabrics, setFabrics] = useState([]);
  const [newFabric, setNewFabric] = useState({
    fabricType: '',
    quantity: '',
    pricePerUnit: '',
    supplier: '',
    notes: ''
  });

  const fetchFabrics = async () => {
    const res = await axios.get('http://localhost:5000/api/fabricStock');
    setFabrics(res.data);
  };

  useEffect(() => {
    fetchFabrics();
  }, []);

  const handleChange = e => setNewFabric({ ...newFabric, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/fabricStock', newFabric);
    setNewFabric({});
    fetchFabrics();
    alert('Fabric Added!');
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Fabric Stock Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          name="fabricType"
          value={newFabric.fabricType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Fabric Type"
        />
        <input
          name="quantity"
          value={newFabric.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Quantity"
          type="number"
        />
        <input
          name="pricePerUnit"
          value={newFabric.pricePerUnit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Price per Unit"
          type="number"
        />
        <input
          name="supplier"
          value={newFabric.supplier}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Supplier"
        />
        <textarea
          name="notes"
          value={newFabric.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Notes"
        ></textarea>
        <button className="bg-blue-600 text-white p-2 rounded">Add Fabric</button>
      </form>

      <div className="space-y-4">
        {fabrics.map((fabric) => (
          <div key={fabric._id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{fabric.fabricType}</h3>
            <p>Supplier: {fabric.supplier}</p>
            <p>Quantity: {fabric.quantity}</p>
            <p>Price per Unit: ${fabric.pricePerUnit}</p>
            <p>Notes: {fabric.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
