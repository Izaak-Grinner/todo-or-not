import tasksData from './seed.json' with { type: 'json' };

async function main() {
    console.log('--- シード処理開始 ---');

    const API_URL = 'http://localhost:3000/api/data/task';

    for (const task of tasksData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`失敗しました: ${task.title}`, errorData);
            } else {
                console.log(`成功しました: ${task.title}`);
            }
        } catch (e) {
            console.error('通信エラー:', e);
        }
    }
}

