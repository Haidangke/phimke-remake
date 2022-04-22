import clsx from 'clsx';
import useScroll from 'hooks/useScroll';
import { IoIosArrowUp } from 'react-icons/io';
import styles from './ScrollToTop.module.scss';

function ScrollToTop() {
    const { y } = useScroll();
    const handleToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div
            onClick={handleToTop}
            className={clsx(styles.toTop, {
                [styles.active]: y > 2500,
            })}
        >
            <IoIosArrowUp />
        </div>
    );
}
export default ScrollToTop;
