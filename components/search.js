import { useEffect, useReducer, useRef } from 'react';
import { reducer, ActionCreators } from './searchReducer';

const MIN_SEARCH_CHARACTERS = 3;

export const Search = ({autoFocus, onSearch}) => {
  useEffect(() => {
    if (autoFocus) {
      searchInput.current.focus();
    }
  }, [autoFocus]);

  const [{value: searchValue, disabled: searchDisabled}, dispatch] = useReducer(reducer, {
    minRequiredChars: MIN_SEARCH_CHARACTERS,
    value: '',
    disabled: true
  });
  
  const searchInput = useRef(null);

  const handleSearch = () => {
    dispatch(ActionCreators.clearSearchValue());
    onSearch(searchValue);
  }

  const handleSearchChange = e =>
    dispatch(ActionCreators.setSearchValue(e.target.value));

  // Enter key can be used trigger the search
  const handleSearchKeyDown = e => {
    if (e.key === "Enter" && !searchDisabled) {
      handleSearch();
    }
  };

  return (
    <fieldset>
      <legend>Search for repositories:</legend>
      <input
        type="text"
        ref={searchInput}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        aria-label="Search repositories"
      />
      <button onClick={handleSearch} disabled={searchDisabled}>Search</button>

      <style jsx>
      {`
        legend {
          color: #cdcdcd;
        }
        button {
          margin-left: 1rem;
        }
      `}
      </style>
    </fieldset>
  );
};
