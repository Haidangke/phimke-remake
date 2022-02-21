import React, { ReactElement } from 'react';
import styles from './NotFound.module.scss'

function NotFound(): ReactElement {
    return (
        <div className={styles.root}>
            <div className={styles.content}>Oops! We can't find the page you're looking for !!!</div>
        </div>
    );
}

export default NotFound;
