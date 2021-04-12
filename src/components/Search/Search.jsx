import React, { useState } from 'react';

const Search = () => {
  const [results, setResults] = useState(null);
  const search = async (input) => {
    const response = await fetch(`https://finnhub.io/api/v1/search?q=${input}&token=${process.env.REACT_APP_FH_TOKEN}`);
    const json = await response.json();
    input.length === 0 ? setResults(null) : setResults(json.result);
  };

  console.log(results)

  return (
    <form>
      <label>Search</label>
      <input onChange={(e) => search(e.target.value)} />
      <ul>
        {results ? results.map((element, index) => {
          return (<li key={index}>{element.displaySymbol} {element.description}</li>);
        }) : <></>}
      </ul>
    </form>
  );
};

export default Search;