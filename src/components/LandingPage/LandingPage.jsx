import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import lighthouse from '../../images/lighthouse.svg';
import { HiChevronRight, HiArrowNarrowRight } from 'react-icons/hi';

import styles from './LandingPage.module.css';

const LandingPage = () => {
  const [hovered, setHovered] = useState(false);
  const arrow = hovered ? <HiArrowNarrowRight className={styles.chevron} /> : <HiChevronRight className={styles.chevron} />

  console.log(hovered);

  return (
    <main className={styles.wrapper}>
      <Router>
        <img className={styles.logo} src={lighthouse} alt='A cartoon lighthouse' />
        <div className={styles.container}>
          <h1 className={styles.title}>Litehaus</h1>
          <p className={styles.subtitle}>Keep an eye on your favourite stocks.</p>
          <Link className={styles.button} to='/signin' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>Sign in{arrow}</Link>
        </div>

        <Switch>
          <Route path='/signin'>
            {/* TODO: add sign in page */}
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default LandingPage;