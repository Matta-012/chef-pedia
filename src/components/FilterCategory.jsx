import React from 'react';
import PropTypes from 'prop-types';

function FilterCategory({ categoryName }) {
  return (
    <div>
      <button
        type="button"
        data-testid={ `${categoryName}-category-filter` }
      >
        {categoryName}
      </button>
    </div>
  );
}

FilterCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default FilterCategory;
