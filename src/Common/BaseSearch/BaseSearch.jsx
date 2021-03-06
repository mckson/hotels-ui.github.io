import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchClause from './SearchClause';
import BaseSearchComponent from './BaseSearchComponent';
import SearchOption from './SearchOption';
import SearchRange from './SearchRange';

const BaseSearch = ({
  clauses,
  onSearch,
  options,
  ranges,
  onChangeOptions,
  onChangeClauses,
  onChangeRanges,
  prompts,
}) => {
  const [searchClauses, setSearchClauses] = useState(clauses);
  const [searchOptions, setSearchOptions] = useState(options);
  const [searchRanges, setSearchRanges] = useState(ranges);
  const [timerId, setTimerId] = useState(null);

  const handleChangeSearchClauses = (newSearchClauses) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    let timer;
    if (onChangeClauses) {
      timer = setTimeout(() => onChangeClauses(newSearchClauses), 500);
    }

    setSearchClauses(newSearchClauses);
    if (timer) {
      setTimerId(timer);
    }
  };

  const handleChangeSearchOptions = (newSearchOptions) => {
    if (onChangeOptions) {
      onChangeOptions(newSearchOptions);
    }
    setSearchOptions(newSearchOptions);
  };

  const handleChangesSearchRanges = (newSearchRanges) => {
    if (onChangeRanges) {
      onChangeRanges(newSearchRanges);
    }
    setSearchRanges(newSearchRanges);
  };

  const handleSearch = () => {
    onSearch(searchClauses, searchOptions, searchRanges);
  };

  return (
    <BaseSearchComponent
      searchClauses={searchClauses}
      searchOptions={searchOptions}
      searchRanges={searchRanges}
      onChangeSearchClauses={handleChangeSearchClauses}
      onChangeSearchOptions={handleChangeSearchOptions}
      onChangeSearchRanges={handleChangesSearchRanges}
      onSearch={handleSearch}
      prompts={prompts}
    />
  );
};

BaseSearch.propTypes = {
  clauses: PropTypes.arrayOf(SearchClause),
  options: PropTypes.arrayOf(SearchOption),
  ranges: PropTypes.arrayOf(SearchRange),
  onSearch: PropTypes.func.isRequired,
  onChangeOptions: PropTypes.func,
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  prompts: PropTypes.array,
};

BaseSearch.defaultProps = {
  clauses: [],
  options: [],
  ranges: [],
  prompts: [],
  onChangeOptions: null,
  onChangeRanges: null,
  onChangeClauses: null,
};

export default BaseSearch;
