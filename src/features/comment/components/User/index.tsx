import React, { useEffect, useState } from 'react';
import cmtApi from 'apis/cmtApi';
import { useAppSelector } from 'app/hooks';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'Firebase/config';

interface CommentUserProps {
    filmId: string;
}

function CommentUser({ filmId }: CommentUserProps) {
    const [comment, setComment] = useState('');
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);
    const { userId, displayName, photoURL } = user;

    const handleAddComment = async () => {
        if (comment && userId) {
            setComment('');
            const q = query(
                collection(db, 'comments'),
                where('filmId', '==', filmId),
                where('isFirst', '==', true)
            );
            getDocs(q).then((querySnapshot) => {
                const length = querySnapshot.docs.length;
                cmtApi.addCmt(
                    {
                        filmId,
                        content: comment,
                        isFirst: true,
                        quantity: 0,
                        index: length + 1,
                    },
                    { userId, displayName, photoURL }
                );
            });
        }
    };

    useEffect(() => {
        setComment('');
    }, [filmId]);

    return isLoggedIn ? (
        <div className='comment-me'>
            <div className='comment-me__container'>
                <img src={photoURL} alt='avatar' className='comment-me__avatar' />
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Bạn nghĩ gì về bộ phim này'
                    className='comment-me__input'
                />
            </div>
            <div className='comment-me__button'>
                <div onClick={() => setComment('')} className='comment-me__button-cancel'>
                    Hủy
                </div>
                <div
                    onClick={handleAddComment}
                    className={`comment-me__button-push ${comment && 'comment-me__button-push--hightlight'}`}
                >
                    Bình luận
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
}

export default CommentUser;
