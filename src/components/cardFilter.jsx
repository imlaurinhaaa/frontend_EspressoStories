import React from 'react';
import '../styles/cardFilter.module.css';

/**
 * @param {string} category 
 * @param {string} label
 * @param {string} imageUrl
 * @param {boolean} isActive
 * @param {function} onClick
 */

const CardFilter = ({ category, label, imageUrl, isActive, onClick }) => {
  return (
    <div
      className={`filter-card ${isActive ? 'active' : ''}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
      // Quando clicado, chama a função passada pelo pai, informando a categoria
      onClick={() => onClick(category)}
    >
      <span className="label">{label}</span>
    </div>
  );
};

export default CardFilter;