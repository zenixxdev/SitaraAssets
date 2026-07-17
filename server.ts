import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(process.cwd(), "db.json");

// Helper to read DB
const readDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    const defaultData = {
      assets: [],
      reviews: [],
      categories: [
        { id: "3d-models", name: "3D Models" },
        { id: "materials", name: "Materials" },
        { id: "environments", name: "Environments" },
        { id: "animations", name: "Animations" }
      ],
      settings: {
        siteName: "Sitara",
        description: "Premium 3D asset library for web games",
      },
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
};

// Helper to write DB
const writeDB = (data: any) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- API ROUTES ---

// Public Routes
app.get("/api/assets", (req, res) => {
  const db = readDB();
  res.json(db.assets.filter((a: any) => a.visibility !== 'hidden'));
});

app.get("/api/assets/:id", (req, res) => {
  const db = readDB();
  const asset = db.assets.find((a: any) => a.id === req.params.id || a.slug === req.params.id);
  if (asset) res.json(asset);
  else res.status(404).json({ error: "Asset not found" });
});

app.get("/api/categories", (req, res) => {
  const db = readDB();
  res.json(db.categories);
});

app.get("/api/reviews/:assetId", (req, res) => {
  const db = readDB();
  const assetReviews = db.reviews.filter((r: any) => r.assetId === req.params.assetId && r.approved !== false);
  res.json(assetReviews);
});

app.post("/api/reviews", (req, res) => {
  const db = readDB();
  const newReview = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    approved: true // Auto approve for now, admin can manage later
  };
  db.reviews.push(newReview);
  
  // Update asset average rating and review count
  if (newReview.assetId) {
     const asset = db.assets.find((a: any) => a.id === newReview.assetId);
     if (asset) {
       const assetReviews = db.reviews.filter((r: any) => r.assetId === newReview.assetId);
       asset.reviewCount = assetReviews.length;
       asset.stars = assetReviews.reduce((acc: number, r: any) => acc + r.rating, 0) / assetReviews.length;
     }
  }

  writeDB(db);
  res.status(201).json(newReview);
});


// Admin Auth Middleware Mock
const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === "Bearer 1234ansh") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === "1234ansh") {
    res.json({ token: "1234ansh" });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

// Admin Routes (Protected)
app.get("/api/admin/assets", adminAuth, (req, res) => {
  const db = readDB();
  res.json(db.assets);
});

app.post("/api/admin/assets", adminAuth, (req, res) => {
  const db = readDB();
  const newAsset = {
    id: uuidv4(),
    ...req.body,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    stars: 0,
    reviewCount: 0
  };
  db.assets.push(newAsset);
  writeDB(db);
  res.status(201).json(newAsset);
});

app.put("/api/admin/assets/:id", adminAuth, (req, res) => {
  const db = readDB();
  const index = db.assets.findIndex((a: any) => a.id === req.params.id);
  if (index !== -1) {
    db.assets[index] = { ...db.assets[index], ...req.body, updatedDate: new Date().toISOString() };
    writeDB(db);
    res.json(db.assets[index]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

app.delete("/api/admin/assets/:id", adminAuth, (req, res) => {
  const db = readDB();
  db.assets = db.assets.filter((a: any) => a.id !== req.params.id);
  writeDB(db);
  res.status(204).send();
});

// Settings, Categories, Reviews admin routes can be similarly added as needed...


// --- VITE MIDDLEWARE ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
