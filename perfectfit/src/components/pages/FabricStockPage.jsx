import React, { useState, useEffect } from 'react';
import SearchFilter from './SearchFilter';
import axios from 'axios';

function FabricStockPage() {
  const [fabricStock, setFabricStock] = useState([]);
  const [filteredFabric, setFilteredFabric] = useState([]);

  useEffect(() => {
    const fetchFabricStock = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/fabricStock');
        setFabricStock(res.data);
        setFilteredFabric(res.data);
      } catch (error) {
        console.error('Error fetching fabric stock:', error);
      }
    };
    fetchFabricStock();
  }, []);

  const handleSearch = (query) => {
    const filtered = fabricStock.filter((fabric) =>
      fabric.fabricName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFabric(filtered);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Fabric Stock</h2>
      <SearchFilter data={fabricStock} onSearch={handleSearch} />
      <div className="grid gap-4">
        {filteredFabric.length > 0 ? (
          filteredFabric.map((fabric) => (
            <div key={fabric._id} className="p-4 border rounded shadow bg-white">
              <h3 className="text-lg font-semibold">{fabric.fabricName}</h3>
              <p>Type: {fabric.fabricType}</p>
              <p>Quantity: {fabric.quantity}</p>
              <p>Price: ₹{fabric.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No matching fabric found.</p>
        )}
      </div>
    </div>
  );
}

export default FabricStockPage;
