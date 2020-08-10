import React from 'react';
import styles from './layout_index.css';

export default props => {
  return (
    <div>
      <h1 className={styles.title}>Page layout_index</h1>
      {props.children}
    </div>
  );
};
