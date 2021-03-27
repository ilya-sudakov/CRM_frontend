import { useEffect, useState } from 'react';
import SearchBar from 'Components/MainPage/SearchBar/SearchBar.jsx';

const useSearchBar = (
  placeholder = 'Введите запрос для поиска...',
  updates = [],
  onButtonClick,
  searchOptions,
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    searchOptions ? searchOptions[0].value : null,
  );

  useEffect(() => {}, [...updates]);

  const searchBar = (
    <SearchBar
      placeholder={placeholder}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      searchOptions={searchOptions}
      onButtonClick={onButtonClick}
      onOptionChange={(value) => setSelectedOption(value)}
    />
  );

  return { searchBar, searchQuery, setSearchQuery, selectedOption };
};

export default useSearchBar;
