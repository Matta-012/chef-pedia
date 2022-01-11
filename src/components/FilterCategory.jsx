import React from 'react';
import PropTypes from 'prop-types';

function FilterCategory({ categoryName, filterCategory, classes }) {
  return (
    <div className="mx-auto">
      <button
        type="button"
        data-testid={ `${categoryName}-category-filter` }
        onClick={ () => filterCategory(categoryName) }
        className={classes}
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
