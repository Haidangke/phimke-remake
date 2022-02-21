import { db } from 'Firebase/config';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Comment } from 'models/comment';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CommentContainer from '../Info';
import InputCommentReply from '../InputReply';

interface CommentListReplyProps {
    comment: Comment;
    filmId: string;
    commentFirst: Comment;
}

function CommentListReply({ comment, filmId, commentFirst }: CommentListReplyProps) {
    const roomId = comment.roomId;
    const [isCmtsReply, setIsCmtReply] = useState(false);
    const [listCommentReply, setListCommentReply] = useState<Comment[]>([]);

    const handleFetchReply = () => {
        if (isCmtsReply) {
            setIsCmtReply(false);
            return;
        }
        setIsCmtReply(true);
    };

    useEffect(() => {
        setIsCmtReply(false);
        setListCommentReply([]);

        const unsubcribe = onSnapshot(
            query(
                collection(db, 'comments'),
                where('filmId', '==', filmId),
                where('isFirst', '==', false),
                where('roomId', '==', roomId),
                orderBy('createdAt', 'asc'),
                limit(10)
            ),
            (querySnapshot) => {
                const data: any = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setListCommentReply(data);
            }
        );
        return () => unsubcribe();
    }, [roomId, filmId]);

    return (
        <div className='comment-item__reply'>
            <div onClick={() => handleFetchReply()} className='comment-item__reply-more'>
                {comment.quantity > 0 &&
                    (!isCmtsReply ? (
                        <>
                            Xem thêm {comment.quantity} câu trả lời <IoIosArrowDown />
                        </>
                    ) : (
                        <>
                            Ẩn câu trả lời <IoIosArrowUp />
                        </>
                    ))}
            </div>
            {isCmtsReply &&
                listCommentReply?.map((commentReply, index) => (
                    <div key={index} className='comment-item'>
                        <div className='comment-item__container'>
                            <img src={commentReply.photoURL} className='comment-item__avatar' alt='avatar' />
                            <CommentContainer comment={commentReply} />
                        </div>
                        <InputCommentReply
                            comment={commentReply}
                            filmId={filmId}
                            commentFirst={commentFirst}
                        />
                    </div>
                ))}
        </div>
    );
}

export default CommentListReply;
