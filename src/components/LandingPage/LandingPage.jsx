import React, { useState } from 'react';
import lighthouse from '../../images/lighthouse.svg';
import { HiChevronRight, HiArrowNarrowRight } from 'react-icons/hi';

import styles from './LandingPage.module.css';

const LandingPage = () => {
  const [hovered, setHovered] = useState(false);
  const arrow = hovered ? <HiArrowNarrowRight className={styles.chevron} /> : <HiChevronRight className={styles.chevron} />

  return (
    <main className={styles.wrapper}>
      <img className={styles.logo} src={lighthouse} alt='A cartoon lighthouse' />
      <div className={styles.container}>
        <h1 className={styles.title}>Litehaus</h1>
        <p className={styles.subtitle}>Keep an eye on your favourite stocks.</p>
        <a className={styles.button} href='/signin' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>Sign in{arrow}</a>
      </div>
    </main>
  );
};

export default LandingPage;