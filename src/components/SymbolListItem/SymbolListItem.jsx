import React, { useState, useEffect } from 'react';

import styles from './SymbolListItem.module.css';

const SymbolListItem = ({ symbol }) => {
  const [symbolObj, setSymbolObj] = useState({
    symbol: symbol,
    name: '',
    industry: '',
    price: '',
    marketCap: '',
    exchange: ''
  });

  useEffect(() => {
    const FetchData = async () => {
      const profile = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FH_TOKEN}`);
      const profileJson = await profile.json();
      const quote = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.REACT_APP_FH_TOKEN}`);
      const quoteJson = await quote.json();
      setSymbolObj({ symbol: symbol, name: profileJson.name, industry: profileJson.finnhubIndustry, price: quoteJson.c ? Math.round((quoteJson.c + Number.EPSILON) * 100) / 100 : 'N/A', marketCap: profileJson.marketCapitalization, exchange: profileJson.exchange });
    };
    FetchData();
  }, [symbol]);

  return (
    <div className={styles.container}>
      <p>{symbolObj.symbol}</p>
      <p>{symbolObj.name}</p>
      <p>{symbolObj.industry}</p>
      <p>{symbolObj.price}</p>
      <p>{symbolObj.marketCap}</p>
      <p>{symbolObj.exchange}</p>
    </div>
  );
};

export default SymbolListItem;