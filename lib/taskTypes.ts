//共通情報

export interface Task {
    id: string;
    title: string;
    description: string;
    todo: string;
    notTodo: string;
}

export interface UserTask {
    userID: string,
    taskId: string;
    selection: boolean; // true: To Do, false: Not To Do
}

export interface User {
    userID: string,
    taskName: string,
}

