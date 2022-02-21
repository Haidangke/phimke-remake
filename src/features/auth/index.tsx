import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'react-cssfx-loading';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { auth } from 'Firebase/config';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { authSelector, resetUserInfo, setUserInfo } from './authSlice';
import AuthPopover from './components/Popover';

import styles from './Auth.module.scss';

function Auth() {
    const dispatch = useAppDispatch();
    const { isLoggedIn, user } = useAppSelector(authSelector);
    const { photoURL, displayName } = user;
    const authRef = useRef<any>();
    const [isPoppver, setIsPopover] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const unlisten = auth.onAuthStateChanged((user) => {
            console.log('b');

            if (user) {
                const { email, displayName, photoURL } = user;
                const userId = user.uid;
                setIsLoading(false);
                dispatch(
                    setUserInfo({
                        email: email as string,
                        displayName: displayName as string,
                        photoURL: photoURL as string,
                        userId,
                    })
                );
            } else {
                dispatch(resetUserInfo());
                setIsLoading(false);
            }
        });
        return () => unlisten();
    }, [dispatch]);

    useOnClickOutside(authRef, () => setIsPopover(false));

    return isLoggedIn ? (
        <div className={styles.root} ref={authRef}>
            <div className={styles.avatar}>
                {isLoggedIn && (
                    <img src={photoURL} alt={displayName} onClick={() => setIsPopover(!isPoppver)} />
                )}
            </div>
            {isPoppver && <AuthPopover />}
        </div>
    ) : isLoading ? (
        <CircularProgress color='white' />
    ) : (
        <Link to='/login' className={styles.login}>
            Đăng nhập
        </Link>
    );
}

export default Auth;
