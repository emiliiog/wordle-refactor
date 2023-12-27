import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.get("/winner", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'winner.html'));
});
app.get("/loser", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'loser.html'));
});
app.listen(3000, () => { console.log("Wordle is listening at port 3000..."); });
