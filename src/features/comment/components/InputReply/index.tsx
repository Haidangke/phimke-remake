import cmtApi from 'apis/cmtApi';
import { useAppSelector } from 'app/hooks';
import { authSelector } from 'features/auth/authSlice';
import { Comment } from 'models/comment';
import React, { Fragment, useEffect, useState } from 'react';
import formatDate from 'utils/formatTime';
import LikeComment from '../Like';

interface CommentInputReplyProps {
    filmId: string;
    comment: Comment;
    commentFirst: Comment;
}

function CommentInputReply({ filmId, comment, commentFirst }: CommentInputReplyProps) {
    const { user, isLoggedIn } = useAppSelector(authSelector);
    const { photoURL, displayName, userId } = user;

    const [isInputReply, setIsInputReply] = useState(false);
    const [cmtReply, setCmtReply] = useState('');

    const handleReply = async () => {
        const cmtId = commentFirst.id;
        const roomId = comment.roomId;
        const receiverName = comment.displayName;

        if (userId && displayName && photoURL) {
            await cmtApi.addCmt(
                {
                    filmId,
                    content: cmtReply,
                    isFirst: false,
                    roomId,
                    receiver: receiverName !== displayName ? receiverName : '',
                },
                { userId, displayName, photoURL }
            );

            await cmtApi.increaseCmt(cmtId, 'quantity');

            setCmtReply('');
        }
    };

    useEffect(() => {
        setIsInputReply(false);
        setCmtReply('');
    }, [filmId]);

    return (
        <Fragment>
            <div className='comment-item__features'>
                {isLoggedIn && (
                    <Fragment>
                        <LikeComment comment={comment} />
                        <div
                            onClick={() => setIsInputReply(!isInputReply)}
                            className='comment-item__features-reply'
                        >
                            Trả lời
                        </div>
                    </Fragment>
                )}
                <div className='comment-item__features-dates'>{formatDate(comment?.createdAt?.seconds)}</div>
            </div>

            {isInputReply && (
                <div className='comment-me--reply'>
                    <div className='comment-me__container'>
                        <img src={photoURL} alt='' className='comment-me__avatar' />
                        <input
                            autoFocus
                            value={cmtReply}
                            onChange={(e) => setCmtReply(e.target.value)}
                            placeholder={`Trả lời ${comment.displayName}`}
                            className='comment-me__input'
                        />
                    </div>
                    <div onClick={() => setIsInputReply(!isInputReply)} className='comment-me__button'>
                        <div className='comment-me__button-cancel'>Hủy</div>
                        <div
                            onClick={handleReply}
                            className={`comment-me__button-push ${
                                cmtReply && 'comment-me__button-push--hightlight'
                            }`}
                        >
                            Trả lời
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default CommentInputReply;
