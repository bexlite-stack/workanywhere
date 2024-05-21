export const reviewsSchema = `
    CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        workplace_id TEXT NOT NULL,
        review TEXT NOT NULL,
        food_quality INTEGER NOT NULL,
        food_price INTEGER NOT NULL,
        toilet INTEGER NOT NULL,
        quiteness INTEGER NOT NULL,
        internet INTEGER NOT NULL,
        electricity INTEGER NOT NULL,
        comfortness INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;
