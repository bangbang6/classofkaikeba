import React from 'react';
import styles from './_layout.css';

export default props => {
  return (
    <div>
      <h1 className={styles.title}>Page product/_layout</h1>
      {props.children} {/* 实现layput内部渲染不同的组件路径相同 */}
    </div>
  );
};
