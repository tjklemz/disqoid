export type ErrorResponse = {
    error: boolean;
    message?: string;
};

export type Profile = {
    username: string;
    name: string;
    profileUrl: string;
    avatarUrl: string;
};

export type ProfileResponse = {
    profile: Profile;
} | ErrorResponse;

export type Comment = {
    id: string;
    message: string;
}

export type CommentsResponse = {
    comments: Comment[];
} | ErrorResponse;
