export const usersSchema = `
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        avatar TEXT,
        created_at TEXT NOT NULL
    );
`;
