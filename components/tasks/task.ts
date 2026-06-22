//共通情報

export interface Task {
    id: number;
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

export const dummy_tasks: Task[] = [
    { id: 1, title: "トロッコ問題", description: "5人を救うために1人を犠牲にするか", todo: "レバーを引く", notTodo: "何もしない" },
    { id: 2, title: "優しい嘘", description: "病気の友人に真実を隠すか", todo: "嘘をつく", notTodo: "本当のことを言う" },
];

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