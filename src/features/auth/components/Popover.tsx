import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';
import { auth } from 'Firebase/config';
import { authSelector } from '../authSlice';
import styles from './Popover.module.scss';

function AuthPopover() {
    const navigate = useNavigate();
    const { user } = useAppSelector(authSelector);
    const { displayName } = user;

    const handleLogout = () => {
        auth.signOut();
        navigate('/login');
    };

    return (
        <div className={styles.root}>
            <div className={styles.info}>
                <div className={styles.name}>{displayName}</div>
            </div>
            <div className={styles.list}>
                <div onClick={handleLogout} className={styles.item}>
                    Đăng xuât
                </div>
            </div>
        </div>
    );
}

export default AuthPopover;
