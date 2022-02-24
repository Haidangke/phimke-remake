import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';

import { db } from 'Firebase/config';
import CommentInfo from './components/Info';
import CommentUser from './components/User';
import CommentInputReply from './components/InputReply';
import CommentListReply from './components/ListReply';

import './Comment.scss';
import { useAppSelector } from 'app/hooks';
import { Link } from 'react-router-dom';

function Comment({ filmId }: { filmId: any }) {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const [totalComment, setTotalComment] = useState(0);
    const [isLoadComment, setIsLoadComment] = useState(false);
    const [limitState, setLimitState] = useState(10);
    const [listCommentFrist, setListCommentFirst] = useState<Comment[]>([]);

    useEffect(() => {
        setListCommentFirst([]);
        const unsubcribe = onSnapshot(
            query(collection(db, 'comments'), where('filmId', '==', filmId)),
            (querySnapshot) => {
                setTotalComment(querySnapshot.docs.length);
            }
        );

        return unsubcribe;
    }, [filmId]);

    useEffect(() => {
        setListCommentFirst([]);
        const unsubcribe = onSnapshot(
            query(
                collection(db, 'comments'),
                where('filmId', '==', filmId),
                where('isFirst', '==', true),
                orderBy('createdAt', 'desc'),
                limit(30)
            ),

            (querySnapshot) => {
                const data: any = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });

                setListCommentFirst(() => [...data]);
            }
        );

        return unsubcribe;
    }, [filmId]);

    const handleLoadAddCommment = () => {
        if (listCommentFrist.length > limitState) {
            setLimitState((prev) => prev + 10);
        }
    };

    useEffect(() => {
        if (listCommentFrist.length <= limitState) {
            setIsLoadComment(false);
        }
    }, [limitState, listCommentFrist.length]);

    return (
        <div className='comment'>
            {!isLoggedIn && (
                <div className='comment-plslog'>
                    <Link to='/login' className='comment-plslog__link'>
                        Đăng nhập
                    </Link>
                    <span> để bình luận !</span>
                </div>
            )}
            {isLoggedIn && (
                <>
                    <div className='comment-heading'>{totalComment} bình luận</div>
                    {filmId && <CommentUser filmId={filmId} />}
                    <div className='comment-main'>
                        {listCommentFrist.slice(0, limitState).map((commentFirst: any) => (
                            <div key={commentFirst.id} className='comment-group'>
                                <div className='comment-item'>
                                    <div className='comment-item__container'>
                                        <img
                                            className='comment-item__avatar'
                                            src={commentFirst.photoURL}
                                            alt='avatar'
                                        />
                                        <CommentInfo comment={commentFirst} />
                                    </div>
                                    <CommentInputReply
                                        filmId={filmId}
                                        comment={commentFirst}
                                        commentFirst={commentFirst}
                                    />
                                </div>
                                <CommentListReply
                                    filmId={filmId}
                                    comment={commentFirst}
                                    commentFirst={commentFirst}
                                />
                            </div>
                        ))}
                    </div>
                    {isLoadComment && (
                        <div className='comment-load' onClick={handleLoadAddCommment}>
                            Tải thêm bình luận
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Comment;
