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
