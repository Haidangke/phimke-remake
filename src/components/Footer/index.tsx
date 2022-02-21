import React, { ReactElement } from 'react';
import styles from './Footer.module.scss';

function Footer(): ReactElement {
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                © 2021, Phimke. Bản quyền thuộc về Hanhnguyenke
            </div>
        </div>
    );
}

export default Footer;
