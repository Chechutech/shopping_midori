import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors())

const dataJson = "./data/products.json";


const getData = () => {
    try {
    const data = fs.readFileSync(dataJson, "utf8");
     return JSON.parse(data);
    } catch (error) {
    console.error(error, "Error");
   
    }
};



app.get("/api/products", (req: Request, res: Response) =>{
    const data= getData();
    res.json(data);
    if (!data) {
        return res.status(500).json({ error: "Error fetching." });
    }
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
});
