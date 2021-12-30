import React, { useEffect, useState } from "react";
import AutoComplete from "./AutoComplete";
import { get as getCountries } from "../services/countries.service";

const AutoCompleteContainer = () => {
  const [options, setOptions] = useState<Array<string>>([]);

  useEffect(() => {
    getCountries()
      .then((countries) => {
        setOptions(countries);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return (
    <>
      <h3>Welcome to countries auto-complete</h3>
      <AutoComplete options={options} />
    </>
  );
};

export default AutoCompleteContainer;
