import React from 'react';

export default function FoodCard({ item, onAdd }){
  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} className="food-img"/>
      <div className="food-body">
        <h3>{item.name}</h3>
        <p>₹ {item.price}</p>
        <button className="btn" onClick={() => onAdd(item)}>+ Add</button>
      </div>
    </div>
  );
}
