import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import styles from './Login.module.scss';
import { auth } from 'Firebase/config';

function Login() {
    const pathname = localStorage.getItem('pathname');
    const navigate = useNavigate();
    const handleLoginWithEmail = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                navigate(pathname || '/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.title}>Đăng nhập vào Phimke</div>
                <div className={styles.list}>
                    <div className={styles.item} onClick={handleLoginWithEmail}>
                        <div className={styles.itemImage}>
                            <FcGoogle />
                        </div>
                        <div className={styles.describe}>Đăng nhập bằng Google</div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <Link to='/'>Quay trở về trang chủ</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
