import React, { useState } from 'react';

const Search = ({ updateSymbols, currentSymbols }) => {
  const [results, setResults] = useState(null);
  const search = async (input) => {
    const response = await fetch(`https://finnhub.io/api/v1/search?q=${input}&token=${process.env.REACT_APP_FH_TOKEN}`);
    const json = await response.json();
    input.length === 0 ? setResults(null) : setResults(json.result);
  };

  return (
    <form>
      <label>Search</label>
      <input onChange={(e) => search(e.target.value)} />
      <ul>
        {results ? results.map((element, index) => {
          return (<li key={index}>{element.displaySymbol} {element.description} <button onClick={(e) => updateSymbols(e, element.displaySymbol)}>{currentSymbols.includes(element.displaySymbol) ? '-' : '+'}</button></li>);
        }) : <></>}
      </ul>
    </form>
  );
};

export default Search;