export interface Comment {
    id: string;
    like: number;
    content: string;
    receiver?: string;
    filmId: string;
    isFirst: boolean;
    roomId: string;
    createdAt: any;
    likes: [string];
    quantity: number;
    displayName: string;
    photoURL: string;
    length: number;
}
