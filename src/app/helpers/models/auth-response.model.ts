export interface AuthResponseModel {
    success: boolean;
    msg: string;
    data: {
        token: string,
        userId: string,
        username: string,
        name: string,
        userFamily: string
    };
}
