import { useRef, useState } from 'react';

import './InputRange.scss';
import styles from './Player.module.scss';
import { Subtitle } from 'models/common';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import ReactHlsPlayer from 'react-hls-player/dist';

interface PLayerProps {
    url: string;
    subs: Subtitle[];
    indexSub: number;
}

function Player({ url, subs, indexSub }: PLayerProps) {
    const { detail } = useAppSelector((state) => state.detail);
    const [searchParams] = useSearchParams();
    const episode = searchParams.get('episode') || 0;
    const [loadedData, setLoadedData] = useState(false);
    const videoRef = useRef<any>(null);

    return (
        <div className={styles.player}>
            <div className={styles.video}>
                <ReactHlsPlayer
                    crossOrigin=''
                    width='100%'
                    height='100%'
                    playsInline
                    controls
                    autoPlay={false}
                    playerRef={videoRef}
                    src={url}
                    onLoadedData={() => {
                        setLoadedData(true);
                        const currentTime = Number(
                            localStorage.getItem(`${detail?.id}-${episode}-time`) as string
                        );
                        videoRef.current && (videoRef.current.currentTime = currentTime);
                    }}
                    onTimeUpdate={() => {
                        localStorage.setItem(
                            `${detail?.id}-${episode}-time`,
                            String(videoRef.current?.currentTime || 0)
                        );
                    }}
                >
                    {loadedData &&
                        subs.map((sub, index) => (
                            <track
                                key={sub.src}
                                kind='subtitles'
                                srcLang={sub.srcLang}
                                label={sub.label}
                                src={sub.src}
                                default={index === indexSub}
                            />
                        ))}
                </ReactHlsPlayer>
            </div>
        </div>
    );
}

export default Player;
