import React, { ReactElement } from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './Score.module.scss';

interface Props {
    vote_average: number;
    textSize: number;
    backgroundPadding: number;
}

function Score({ vote_average, textSize, backgroundPadding }: Props): ReactElement {
    const average = Math.floor(vote_average * 10);
    return (
        <div className={styles.root}>
            <CircularProgressbarWithChildren
                strokeWidth={6}
                value={vote_average > 0 ? average : 100}
                background
                backgroundPadding={backgroundPadding}
                styles={buildStyles({
                    backgroundColor: '#081C22',
                    textColor: '#fff',
                    pathColor: vote_average > 0 ? '#21D07A' : '#464D4F',
                    trailColor: 'transparent',
                    textSize,
                })}
            >
                <div className={styles.display}>
                    <div
                        className={styles.text}
                        style={{
                            fontSize: textSize * 0.7 + 'px',
                            left: vote_average > 0 ? -textSize * 0.15 + 'px' : 0,
                        }}
                    >
                        {vote_average > 0 ? `${average}` : 'NR'}
                        {vote_average > 0 && (
                            <div
                                className={styles.percent}
                                style={{
                                    fontSize: textSize * 0.3 + 'px',
                                    right: -textSize * 0.34 + 'px',
                                    top: textSize * 0.17 + 'px',
                                }}
                            >
                                %
                            </div>
                        )}
                    </div>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
}

export default Score;
