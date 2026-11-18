import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
    info: {
        title: "My WADs API",
        description: "This is a description",
        version: "1.0.0"
    },
    host: process.env.HOST+':'+process.env.PORT,
    tags: [
        {name: 'WADs'}, 
        {name: 'Users'},
        {name: 'Categories'}
    ],
    definitions: {
        Wad: {
            id: "01a1da2e-742a-70c8-95a4-d93b27b117ba",
            WadName: "1squares.wad",
            WadDescription: "A one-map DOOM WAD released like 30 years ago. Slaughter map, I think?",
            ReleaseDate: "2026-11-14",
            ImageURL: null,
            Downloads: 0,
            Comments: null,
            CategoryID: "099",
            createdAt: "2026-11-14 13:10:39",
            updatedAt: "2026-11-14 13:10:39"
        },
        NewWad: {
            $GameName: "1squares.wad",
            $GameDescription: "A one-map DOOM WAD released like 30 years ago. Slaughter map, I think?",
            $ReleaseDate: "2026-11-14",
            $CategoryID: "099",
            ImageURL: null,
            Downloads: 0,
            Comments: null
        },
        WadListItem: {
            id: "01a1da2e-742a-70c8-95a4-d93b27b117ba",
            WadName: "1squares.wad"
        },
        User: {
            id: "01a17d83-59cc-74da-9241-360eb490ed56",
            UserName: "newell",
            PasswordHash: "$2b$10$9BAcw3rT9Uw0gtfXpyJJheh4VKMxxQjJV49loyNA9UpLAYtkgI3.O",
            SignupDate: "2026-10-27",
            UserStatus: "unverified",
            OwnershipID: null,
            CommentListID: null,
            ProfileID: null,
            EmailAddress: "a@a.a",
            CredentialID: null,
            createdAt: "2026-10-27 13:18:42",
            updatedAt: "2026-10-27 13:18:42"
        },
        NewUser: {
            $UserName: "newell",
            $Password: "MoolyFTW",
            $PasswordConfirmation: "MoolyFTW",
            $EmailAddress: "a@a.a",
            UserStatus: "unverified",
            OwnershipID: null,
            CommentListID: null,
            ProfileID: null,
            CredentialID: null
        },
        UserListItem: {
            id: "01a17d83-59cc-74da-9241-360eb490ed56",
            UserName: "newell",
            UserStatus: "unverified",
            EmailAddress: "a@a.a"
        },
        Category: {
            id: "01a1883a-4b43-7569-ad6f-a93b014340d6",
            CategoryName: "Doom 1",
            CategoryDescription: "Dooooooom 1",
            createdAt: "2026-10-28 14:57:13",
            updatedAt: "2026-10-28 14:57:13"
        },
        NewCategory: {
            $CategoryName: "Doom 1",
            $CategoryDescription: "Dooooooom 1"
        },
        CategoryListItem: {
            id: "01a1883a-4b43-7569-ad6f-a93b014340d6",
            CategoryName: "Doom 1",
            CategoryDescription: "Dooooooom 1"
        },
        ErrorResponse: {
            error: "Error message"
        }
    }
};

const outputFile = '../docs/swagger-autogen.json';
const routes = ['../routes/appRoutes.ts'];
/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc... */

swaggerAutogen()(outputFile, routes, doc);
