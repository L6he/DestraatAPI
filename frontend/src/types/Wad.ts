
export interface WadSummary {
    id: string,
    WadName: string,
}

//getByID
export interface Wad {
    id: string,
    WadName: string,
    WadDescription: string,
    ReleaseDate: string, //hetkel
    CategoryID: string,
    ImageURL: string | null,
    Downloads: number,
    Comments: unknown | null
}

//create
export interface WadInput {
    WadName: string,
    WadDescription: string,
    ReleaseDate: string, //hetkel
    CategoryID: string,
    ImageURL: string | null,
}

//categoryvalue
export interface Category {
    id: string,
    CategoryName: string,
    CategoryDescription: string
}