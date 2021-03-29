import { useEffect, useState } from 'react';
import SearchBar from 'Components/MainPage/SearchBar/SearchBar.jsx';

const useSearchBar = (
  placeholder = 'Введите запрос для поиска...',
  updates = [],
  onButtonClick,
  searchOptions,
  advancedOptions,
) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(
    searchOptions ? searchOptions[0].value : null,
  );
  const [advanced, setAdvanced] = useState(advancedOptions);

  useEffect(() => {}, [...updates]);

  const searchBar = (
    <SearchBar
      placeholder={placeholder}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      searchOptions={searchOptions}
      onButtonClick={onButtonClick}
      onOptionChange={(value) => setSelectedOption(value)}
      advancedOptions={advanced}
      setAdvancedOptions={setAdvanced}
    />
  );

  return { searchBar, searchQuery, setSearchQuery, selectedOption, advanced };
};

export default useSearchBar;
