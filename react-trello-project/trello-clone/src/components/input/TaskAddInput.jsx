import React from 'react';
import { v4 as uuid } from 'uuid';

export const TaskAddInput = ({
	inputText,
	setInputText,
	taskList,
	setTaskList,
}) => {
	const handleSubmit = (e) => {
		const taskId = uuid();
		e.preventDefault();
		if (inputText === '') {
			return;
		}
		//カードを追加する
		//setTaskListでは第二引数がtaskListにどんどん入っていく(スプレッド構文なので展開されていく)
		setTaskList([
			...taskList,
			{
				id: taskId,
				text: inputText,
				draggableId: `task-${taskId}`,
			},
		]);
		setInputText(''); //タスクを追加したらテキスト中身をまた空にする
	};

	const handleChange = (e) => {
		setInputText(e.target.value);
		//console.log(inputText); ここにsetInputText(e.target.value);の中身が入ってくる
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="add a task"
					className="taskAddInput"
					onChange={handleChange}
					value={inputText} //handleSubmitでsetInputText('');にしたのを受け取り、タスクを追加したらinputタグ内を空にする
				/>
			</form>
		</div>
	);
};
