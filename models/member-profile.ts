export type MemberProfile = {
    id: string,
    displayName: string,
    email: string,
    firstName: string,
    lastName: string,
    picture: {
        id: string,
        handle: string,
        url: string,
    }
}