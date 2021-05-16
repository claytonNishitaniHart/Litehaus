import React from 'react';
import styles from './SymbolList.module.css';

import SymbolListItem from '../SymbolListItem/SymbolListItem';

const SymbolList = ({ symbols }) => {
  return (
    <>
      <div className={styles.header}>
        <p>Symbol</p>
        <p className={styles.name}>Name</p>
        <p className={`${styles.wideOnly} ${styles.industry}`}>Industry</p>
        <p className={styles.price}>Price</p>
        <p className={`${styles.wideOnly} ${styles.marketCap}`}>Market Cap</p>
        <p className={`${styles.wideOnly} ${styles.exchange}`}>Exchange</p>
      </div>
      <div className={styles.list}>
        {symbols.map((symbol, index) => {
          return (
            <SymbolListItem key={index} symbol={symbol} />
          );
        })}
      </div>
    </>
  );
};

export default SymbolList;