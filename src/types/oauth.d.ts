export type OAuthToken = {
    username: string;
    user_id: number;
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
}
