import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import cmtApi from 'apis/cmtApi';
import { useAppSelector } from 'app/hooks';
import { db } from 'Firebase/config';
import { Comment } from 'models/comment';

interface CommentLikeProps {
    comment: Comment;
}

function CommentLike({ comment }: CommentLikeProps) {
    const { userId } = useAppSelector((state) => state.auth.user);
    const [loadingLike, setLoadingLike] = useState(false);

    const handleLike = async () => {
        if (loadingLike) return;

        setLoadingLike(true);
        if (comment.likes.includes(userId)) {
            await updateDoc(doc(db, 'comments', comment.id), {
                likes: arrayRemove(userId),
            });
            await cmtApi.decreaseCmt(comment.id, 'like');
        } else {
            await updateDoc(doc(db, 'comments', comment.id), {
                likes: arrayUnion(userId),
            });
            await cmtApi.increaseCmt(comment.id, 'like');
        }
        setLoadingLike(false);
    };

    return (
        <div
            onClick={handleLike}
            className={`comment-item__features-like ${
                comment?.likes?.includes(userId) && 'comment-item__features-like--active'
            }`}
        >
            {loadingLike ? <ReactLoading type='spinningBubbles' width={20} height={20} /> : 'Thích'}
        </div>
    );
}

export default CommentLike;
