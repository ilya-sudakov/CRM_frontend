import { useCallback, useEffect, useState } from 'react';
import SearchBar from 'Components/MainPage/SearchBar/SearchBar.jsx';

const useSearchBar = (
  placeholder = 'Введите запрос для поиска...',
  updates = [],
  onButtonClick,
  searchOptions,
  advancedOptions,
  setAdvancedOptions,
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    searchOptions ? searchOptions[0].value : null,
  );
  useEffect(() => {}, [...updates, advancedOptions, setAdvancedOptions]);

  const searchBar = useCallback(
    <SearchBar
      placeholder={placeholder}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      searchOptions={searchOptions}
      onButtonClick={onButtonClick}
      onOptionChange={(value) => setSelectedOption(value)}
      advancedOptions={advancedOptions}
      setAdvancedOptions={(value) => setAdvancedOptions(value)}
    />,
    [...updates, advancedOptions, setAdvancedOptions],
  );

  return { searchBar, searchQuery, setSearchQuery, selectedOption };
};

export default useSearchBar;
