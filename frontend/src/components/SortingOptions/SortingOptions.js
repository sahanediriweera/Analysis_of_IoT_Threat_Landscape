import React, { useState } from 'react';

const SortingOptions = ({ onSorting }) => {
  const [sortingOption, setSortingOption] = useState('default');

  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
    onSorting(e.target.value);
  };

  return (
    <div>
      <label>Sort by:</label>
      <select value={sortingOption} onChange={handleSortingChange}>
        <option value="default">Default</option>
        <option value="name">Name</option>
        <option value="connectionTime">Connection Time</option>
      </select>
    </div>
  );
};

export default SortingOptions;
