import React, { ReactChild, ReactChildren } from 'react';
import styles from './SubPage.module.scss';
import { useAppSelector } from 'app/hooks';
import Loading from 'components/Loading/Loading';

interface SubPageProps {
    children: ReactChild | ReactChildren | any;
    main: boolean;
}

function SubPage({ children, main }: SubPageProps) {
    const { isLoading } = useAppSelector((state) => state.detail);

    return (
        <div className={styles.root}>
            {isLoading ? (
                <Loading space={226} />
            ) : main ? (
                <div className={styles.main}>{children}</div>
            ) : (
                children
            )}
        </div>
    );
}

export default SubPage;
