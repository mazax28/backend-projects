// dbQueries.js
import db from './db.js';  // Importa la instancia de la base de datos

// Función para insertar un nuevo usuario
export const insertUser = (username, hashedPassword) => {
    const insertUserStmt = db.prepare('INSERT INTO users (name, password) VALUES (?, ?)');
    return insertUserStmt.run(username, hashedPassword);
};

// Función para insertar una tarea por defecto para el usuario
export const insertTodo = (userId, defaultTask) => {
    const insertTodoStmt = db.prepare('INSERT INTO todos (user_id, task, completed) VALUES (?, ?, ?)');
    return insertTodoStmt.run(userId, defaultTask, 0);
};

export const getUser = (username) => {
    const getUserStmt = db.prepare('SELECT * FROM users WHERE name = ?');
    return getUserStmt.get(username);
}