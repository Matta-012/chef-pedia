import React from 'react';
import PropTypes from 'prop-types';

function FilterCategory({ categoryName, filterCategory }) {
  return (
    <div className="mx-auto">
      <button
        type="button"
        data-testid={ `${categoryName}-category-filter` }
        onClick={ () => filterCategory(categoryName) }
        className="border border-login-bg text-login-bg w-24 rounded-xl"
      >
        {categoryName}
      </button>
    </div>
  );
}

FilterCategory.propTypes = {
  categoryName: PropTypes.string.isRequired,
  filterCategory: PropTypes.func.isRequired,
};

export default FilterCategory;
