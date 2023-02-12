interface User {
    id: number;
    username: string;
}

interface Vote {
    id: number;
    userId: number;
    quoteId: number;
    type: 0 | 1;
}

export interface Quote {
    id: number;
    quote: string;
    user: User;
    upvotes: number;
    downvotes: number;
    votes?: Vote[],
    isUpvoted: boolean;
    isDownvoted: boolean;
}
