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
    taskId: number;
    selection: boolean; // true: To Do, false: Not To Do
}

export interface User {
    userID: string,
    taskName: string,
}


export const dummy_user_tasks: UserTask[] = [
    { userID: "hoge1", taskId: 1, selection: true },
    { userID: "hoge1", taskId: 2, selection: false },
    { userID: "hoge2", taskId: 1, selection: true },  // トロッコは To Do を選択
    { userID: "hoge2", taskId: 2, selection: false }, // 優しい嘘は Not To Do を選択
    { userID: "hoge3", taskId: 1, selection: true },  // トロッコは To Do を選択
    { userID: "hoge3", taskId: 2, selection: false }, // 優しい嘘は Not To Do を選択
    { userID: "hoge4", taskId: 1, selection: true },  // トロッコは To Do を選択
    { userID: "hoge4", taskId: 2, selection: false }, // 優しい嘘は Not To Do を選択
];