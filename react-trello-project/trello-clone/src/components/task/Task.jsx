import React from 'react';
import { Tasks } from './Tasks';

//Tasks.jsxからpropsを受け取っている
export const Task = ({ task, taskList, setTaskList }) => {
	const handleDelete = (id) => {
		setTaskList(taskList.filter((task) => task.id !== id));
	};
	return (
		<div className="taskBox">
			<p className="taskText">{task.text}</p>
			<button className="taskTrashButton" onClick={() => handleDelete(task.id)}>
				<i className="fa-solid fa-trash-can"></i>
			</button>
		</div>
	);
};
