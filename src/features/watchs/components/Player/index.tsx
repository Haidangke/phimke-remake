import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import InputRange from 'react-input-range';
import ReactPlayer from 'react-player';
import ReactLoading from 'react-loading';
import { VideoSeekSlider } from 'react-video-seek-slider';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import clsx from 'clsx';

import { MdPlayDisabled } from 'react-icons/md';
import { IoIosPlay, IoMdSettings, IoIosPause } from 'react-icons/io';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import { BsArrowClockwise, BsArrowCounterclockwise, BsPip } from 'react-icons/bs';

import { DefinitionList, SubtitlingList } from 'models/loklok';
import convertSecondToTime from 'utils/convertSecondsToTime';

import 'react-input-range/lib/css/index.css';
import 'react-video-seek-slider/styles.css';
import './InputRange.scss';
import styles from './Player.module.scss';
import useResize from 'hooks/useResize';
import { Subtitle } from 'models/common';
import iOS from 'utils/onIOS';

interface PLayerProps {
    url: string;
    subs: Subtitle[];
    indexSub: number;
    isLoading: boolean;
    isError: boolean;
    definitionList: DefinitionList;
    setDefinition: Dispatch<SetStateAction<string>>;
    firstDefinition: string;
}

function Player({
    url,
    subs,
    indexSub,
    isLoading,
    isError,
    definitionList,
    setDefinition,
    firstDefinition,
}: PLayerProps) {
    const { onMobile } = useResize();
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [loadedSeconds, setLoadedSeconds] = useState(0);
    const [onBuffer, setOnBuffer] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [hoverEnabled, setHoverEnabled] = useState(true);
    const [volume, setVolume] = useState<any>(1);
    const [volumeTemp, setVolumeTemp] = useState<any>(1);
    const [onPip, setOnPip] = useState(false);

    const [isQuality, setIsQuality] = useState(false);
    const [displayTime, setDisplayTime] = useState('00:00');

    const timeoutRef = useRef<any>(null);

    const videoRef = useRef<any>(null);

    const handleRewind = (e: any) => {
        videoRef.current.seekTo(e, 'seconds');
        setCurrentTime(e);
    };

    const handleRewindSecond = (second: number) => {
        if (currentTime + second < 0) {
            setCurrentTime(0);
            videoRef.current.seekTo(0, 'seconds');
        } else {
            setCurrentTime((prev) => prev + second);
            videoRef.current.seekTo(currentTime + second, 'seconds');
        }
    };
    const handleProgress = (e: any) => {
        setDisplayTime(convertSecondToTime(e.playedSeconds));
        setLoadedSeconds(e.loadedSeconds);
        setCurrentTime(e.playedSeconds);
    };

    const handleSetIsQuality = () => {
        setIsQuality(!isQuality);
    };
    const handle = useFullScreenHandle();

    const reportChange = (state: any) => {
        setFullScreen(state);
    };

    useEffect(() => {
        setPlaying(false);
        setDuration(0);
        setCurrentTime(0);
        setLoadedSeconds(0);
        setOnBuffer(false);
        setFullScreen(false);
        setHoverEnabled(true);
        setVolume(1);
        setVolumeTemp(1);
        setIsQuality(false);
        setDisplayTime('00:00');
    }, [url]);

    if (isError && !isLoading) {
        return (
            <div className={styles.player}>
                <div className={styles.error}>
                    <MdPlayDisabled />
                    This video file cannot be played. (error code: 224003)
                </div>
            </div>
        );
    }

    if (iOS())
        return (
            <div className={styles.player}>
                <div className={styles.video}>
                    <ReactPlayer
                        key={url}
                        width='100%'
                        height='100%'
                        url={url}
                        playsinline
                        controls
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: 'anonymous',
                                },
                                tracks: [
                                    {
                                        ...subs[indexSub],
                                        default: true,
                                    },
                                ],
                            },
                        }}
                    />
                </div>
            </div>
        );

    return (
        <FullScreen handle={handle} onChange={reportChange}>
            <div
                className={styles.player}
                onMouseMove={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setHoverEnabled(true);
                    timeoutRef.current = setTimeout(() => {
                        setHoverEnabled(false);
                    }, 2000);
                }}
            >
                {url && subs.length > 0 && (
                    <div className={styles.video} onClick={() => !onMobile && setPlaying(!playing)}>
                        <ReactPlayer
                            onBuffer={() => setOnBuffer(true)}
                            onBufferEnd={() => setOnBuffer(false)}
                            onDuration={(e) => setDuration(e)}
                            onProgress={handleProgress}
                            volume={volume}
                            ref={videoRef}
                            playing={playing}
                            key={url}
                            style={{ cursor: hoverEnabled ? 'pointer' : 'none' }}
                            width='100%'
                            height='100%'
                            url={url}
                            playsinline
                            pip={onPip}
                            onDisablePIP={() => setOnPip(false)}
                            config={{
                                file: {
                                    attributes: {
                                        crossOrigin: 'anonymous',
                                    },
                                    tracks: [
                                        {
                                            ...subs[indexSub],
                                            default: true,
                                        },
                                    ],
                                },
                            }}
                        />

                        {onMobile &&
                            hoverEnabled &&
                            (!playing ? (
                                <div className={styles.iconPlay} onClick={() => setPlaying(true)}>
                                    <IoIosPlay />
                                </div>
                            ) : (
                                <div className={styles.iconPlay} onClick={() => setPlaying(false)}>
                                    <IoIosPause />
                                </div>
                            ))}

                        {!onMobile && !playing && (
                            <div className={styles.iconPlay}>
                                <IoIosPlay />
                            </div>
                        )}

                        {onBuffer && playing && (
                            <div className={styles.iconPlay}>
                                <ReactLoading type='spin' width='40px' height='40px' />
                            </div>
                        )}
                    </div>
                )}

                {hoverEnabled && (
                    <div className={styles.controls}>
                        <div className={styles.seekSlider}>
                            {duration > 0 && (
                                <VideoSeekSlider
                                    onChange={handleRewind}
                                    max={duration}
                                    currentTime={currentTime}
                                    progress={loadedSeconds}
                                    offset={0}
                                    secondsPrefix='00:00:'
                                    minutesPrefix='00:'
                                />
                            )}
                        </div>

                        <div className={styles.bottom}>
                            <div className={styles.leftControl}>
                                {playing ? (
                                    <IoIosPause
                                        onClick={() => setPlaying(!playing)}
                                        className={styles.controlPlay}
                                    />
                                ) : (
                                    <IoIosPlay
                                        onClick={() => setPlaying(!playing)}
                                        className={styles.controlPlay}
                                    />
                                )}
                                <div className={styles.controlRewind}>
                                    <BsArrowCounterclockwise onClick={() => handleRewindSecond(-15)} />
                                    <span>15</span>
                                </div>
                                <div className={styles.controlRewind}>
                                    <BsArrowClockwise onClick={() => handleRewindSecond(15)} />
                                    <span>15</span>
                                </div>

                                <div className={styles.volume}>
                                    {volume === 0 ? (
                                        <MdVolumeOff
                                            onClick={() => setVolume(volumeTemp)}
                                            className={styles.controlVolume}
                                        />
                                    ) : (
                                        <MdVolumeUp
                                            onClick={() => setVolume(0)}
                                            className={styles.controlVolume}
                                        />
                                    )}
                                    <div className={styles.rangeVolume}>
                                        <InputRange
                                            maxValue={1}
                                            minValue={0}
                                            value={volume}
                                            onChange={(value) => {
                                                setVolume(value);
                                                setVolumeTemp(value);
                                            }}
                                            step={0.2}
                                        />
                                    </div>
                                </div>

                                <div className={styles.time}>
                                    {displayTime} / {convertSecondToTime(duration)}
                                </div>
                            </div>
                            <div className={styles.rightControl}>
                                <div
                                    className={clsx(styles.qualityControl, {
                                        [styles.qualityControlActive]: isQuality,
                                    })}
                                >
                                    <IoMdSettings onClick={handleSetIsQuality} />
                                    {isQuality && (
                                        <div className={styles.listControl}>
                                            <div className={styles.titleControl}>Chất lượng</div>
                                            {definitionList.map((definition) => (
                                                <div
                                                    onClick={() => {
                                                        setDefinition(definition.code);
                                                        setIsQuality(false);
                                                    }}
                                                    key={definition.code}
                                                    className={clsx(styles.itemControl, {
                                                        [styles.itemControlActive]:
                                                            firstDefinition === definition.code,
                                                    })}
                                                >
                                                    {definition.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {fullScreen ? (
                                    <BiExitFullscreen onClick={handle.exit} />
                                ) : (
                                    <BiFullscreen onClick={handle.enter} />
                                )}
                                <BsPip onClick={() => setOnPip(true)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FullScreen>
    );
}

export default Player;
