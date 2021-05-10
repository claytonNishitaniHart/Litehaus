import React from 'react';
import styles from './SymbolList.module.css';

import SymbolListItem from '../SymbolListItem/SymbolListItem';

const SymbolList = ({ symbols }) => {
  return (
    <>
      <div className={styles.header}>
        <p>Symbol</p>
        <p>Name</p>
        <p>Industry</p>
        <p>Price</p>
        <p>Market Cap</p>
        <p>Exchange</p>
      </div>
      {symbols.map((symbol, index) => {
        return (
          <SymbolListItem key={index} symbol={symbol} />
        );
      })}
    </>
  );
};

export default SymbolList;