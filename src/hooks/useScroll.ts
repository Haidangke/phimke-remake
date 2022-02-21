import { useState, useEffect, useCallback } from 'react';

export default function useScroll() {
    const [y, setY] = useState(window.scrollY);
    const [result, setResult] = useState(true);

    const handleNavigation = useCallback(
        (e) => {
            const window = e.currentTarget;
            if (y > window.scrollY) {
                setResult(true);
            } else if (y < window.scrollY) {
                setResult(false);
            }
            setY(window.scrollY);
        },
        [y]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener('scroll', handleNavigation);

        return () => {
            window.removeEventListener('scroll', handleNavigation);
        };
    }, [handleNavigation]);
    return { result, y };
}
