import React, { useState } from 'react';
import styles from './Search.module.css';

const Search = ({ updateSymbols, currentSymbols }) => {
  const [results, setResults] = useState(null);
  const search = async (input) => {
    const response = await fetch(`https://finnhub.io/api/v1/search?q=${input}&token=${process.env.REACT_APP_FH_TOKEN}`);
    const json = await response.json();
    input.length === 0 ? setResults(null) : setResults(json.result);
  };

  return (
    <form className={styles.form}>
      <label className={styles.label}>Search</label>
      <input className={`${styles.input} ${results && results.length > 0 ? styles.inputShowing : ''}`} onChange={(e) => search(e.target.value)} />
      <ul className={results ? styles.results : styles.hidden}>
        {results ? results.map((element, index) => {
          return (<li key={index}><p className={styles.symbol}>{element.displaySymbol}</p> <p className={styles.description}>{element.description}</p> <button className={styles.button} onClick={(e) => updateSymbols(e, element.displaySymbol)}>{currentSymbols.split(',').includes(element.displaySymbol) ? '-' : '+'}</button></li>);
        }) : <></>}
      </ul>
    </form>
  );
};

export default Search;