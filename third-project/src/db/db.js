import {DatabaseSync} from 'node:sqlite'

const db = new DatabaseSync(':memory:')

    db.exec(`
        CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        password TEXT
        )
    `)



    db.exec(`
        CREATE TABLE todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN,
        FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `)

export default db