export interface UserSummary {
    id: string | null
    UserName: string
    EmailAddress: string
    UserStatus: string | null
}
export interface User extends UserSummary {
    SignupDate: string
    OwnershipID: string | null
    CommentListID: string | null
    ProfileID: string | null
    CredentialID: string | null
} //viewmodel-id erinevad backend-ist
export interface UserRegister {
    UserName: string
    EmailAddress: string
    UserStatus: string | null
    SignupDate: string
    OwnershipID: string | null
    CommentListID: string | null
    ProfileID: string | null
    CredentialID: string | null
    Password: string
    PasswordConfirmation: string | null
}
