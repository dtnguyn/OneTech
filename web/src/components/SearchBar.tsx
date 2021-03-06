import { ChangeEvent, KeyboardEvent } from "react";
import styles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  inputValue: string;
  autoComplete: string | undefined;
  placeHolder: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  inputValue,
  autoComplete,
  placeHolder,
  handleSearch,
  handleKeyPress,
}) => {
  return (
    <div className={styles.searchInputContainer}>
      <input
        value={inputValue}
        className={styles.searchInput}
        placeholder={placeHolder}
        onChange={handleSearch}
        onKeyPress={handleKeyPress}
      />

      <p className={styles.searchInputAutoComplete}>{autoComplete}</p>
      <img className={styles.searchInputIcon} src="/images/search-icon.svg" />
    </div>
  );
};

export default SearchBar;
