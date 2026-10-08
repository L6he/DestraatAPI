import express, { type Request, type Response, type NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json()); 
const PORT = process.env.PORT || 3000;

interface Wad {
    WadID: string;
    WadName: string;
    ReleaseDate: string;
    Description: string;
    Rating: number;
    UserCommentListID: string;
    ImageURL: string;
    CategoryID: string;
}

const wadsDatabase: Wad[] = [];

app.get('/api/wads', (req: Request, res: Response) => {
    res.status(200).json(wadsDatabase);
});

app.get('/api/wads/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const wad = wadsDatabase.find(w => w.WadID === id);
    
    if (!wad) {
        return res.status(404).json({ error: `Wad with ID ${id} not found.` });
    }
    res.status(200).json(wad);
});

app.post('/api/wads', (req: Request, res: Response) => {
    const { WadName, ReleaseDate, Description, Rating, UserCommentListID, ImageURL, CategoryID } = req.body;
    
    if (!WadName || !Description) {
        return res.status(400).json({ error: "Missing required fields: WadName and Description are required." });
    }

    const newWad: Wad = {
        WadID: uuidv4(),
        WadName,
        ReleaseDate,
        Description,
        Rating: Rating || 0,
        UserCommentListID,
        ImageURL,
        CategoryID
    };

    wadsDatabase.push(newWad);
    res.status(201).json(newWad);
});

app.put('/api/wads/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = wadsDatabase.findIndex(w => w.WadID === id);

    if (index === -1) {
        return res.status(404).json({ error: `Wad with ID ${id} not found.` });
    }

    wadsDatabase[index] = { ...wadsDatabase[index], ...req.body };
    res.status(200).json(wadsDatabase[index]);
});

app.delete('/api/wads/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = wadsDatabase.findIndex(w => w.WadID === id);

    if (index === -1) {
        return res.status(404).json({ error: `Wad with ID ${id} not found.` });
    }

    wadsDatabase.splice(index, 1);
    res.status(204).send();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
