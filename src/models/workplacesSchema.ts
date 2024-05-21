export const workplacesSchema = `
    CREATE TABLE IF NOT EXISTS workplaces (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        slug TEXT NOT NULL,
        type TEXT NOT NULL,
        city TEXT NOT NULL,
        address TEXT NOT NULL,
        images TEXT NOT NULL,
        created_at TEXT NOT NULL,
        verified INTEGER,
        submitter_id TEXT NOT NULL,
        FOREIGN KEY (submitter_id) REFERENCES users(id)
    );
`;
