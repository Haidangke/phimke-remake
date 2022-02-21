import { db } from 'Firebase/config';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const cmtApi = {
    addCmt(comment: any, user: any) {
        return addDoc(collection(db, 'comments'), {
            createdAt: serverTimestamp(),
            roomId: uuidv4(),
            like: 0,
            likes: [],
            ...comment,
            ...user,
        });
    },

    increaseCmt(idFilm: any, proterty: any) {
        return updateDoc(doc(db, 'comments', idFilm), {
            [proterty]: increment(1),
        });
    },

    decreaseCmt(idFilm: any, proterty: any) {
        return updateDoc(doc(db, 'comments', idFilm), {
            [proterty]: increment(-1),
        });
    },
};

export default cmtApi;
