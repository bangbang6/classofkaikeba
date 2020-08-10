import React from 'react';
import styles from './[id].css';

export default props => {
  console.log('props', props);
  return (
    <div>
      <h1 className={styles.title}>Page product/{props.match.params.id}</h1>
    </div>
  );
};
