import React, { useState } from "react";
import "./AutoComplete.css";
import Key from "../constants/keys.enum";

const AutoComplete = ({ options }: { options: Array<string> }) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
  const [filteredOptions, setFilteredOptions] = useState<Array<string>>([]);
  const [showFilteredOptions, setShowFilteredOptions] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: { currentTarget: { value: string } }) => {
    const searchValue = e.currentTarget.value;

    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );

    setActiveOptionIndex(0);
    setFilteredOptions(filteredOptions);
    setShowFilteredOptions(true);
    setSearchValue(searchValue);
  };

  const handleClick = (e: { currentTarget: { innerText: string } }) => {
    const activeOptionText = e.currentTarget.innerText;

    setActiveOptionIndex(0);
    setFilteredOptions([]);
    setShowFilteredOptions(false);
    setSearchValue(activeOptionText);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === Key.ENTER) {
      setActiveOptionIndex(0);
      setShowFilteredOptions(false);
      setSearchValue(filteredOptions[activeOptionIndex]);
    } else if (e.key === Key.ARROW_UP) {
      if (activeOptionIndex === 0) {
        return;
      }

      setActiveOptionIndex(activeOptionIndex - 1);
    } else if (e.key === Key.ARROW_DOWN) {
      if (activeOptionIndex - 1 === filteredOptions.length) {
        return;
      }

      setActiveOptionIndex(activeOptionIndex + 1);
    }
  };

  const OptionsList = () => {
    if (filteredOptions.length) {
      return (
        <ul className="options">
          {filteredOptions.map((option, index) => {
            const className =
              index === activeOptionIndex ? "active-option" : "";

            return (
              <li className={className} key={index} onClick={handleClick}>
                {option}
              </li>
            );
          })}
        </ul>
      );
    }

    return <div className="no-options">No countries found</div>;
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter a country name"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
      />
      {showFilteredOptions && searchValue && <OptionsList />}
    </>
  );
};

export default AutoComplete;
