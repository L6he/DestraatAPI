export interface UserSummary {
    id: string
    UserName: string
    EmailAddress: string
    UserStatus: string
}
export interface User extends UserSummary {
    SignupDate: string
    OwnershipID: string | null
    CommentListID: string | null
    ProfileID: string | null
    CredentialID: string | null
    Password: string
    PasswordConfirmation: string | null
} //viewmodel-id erinevad backend-ist