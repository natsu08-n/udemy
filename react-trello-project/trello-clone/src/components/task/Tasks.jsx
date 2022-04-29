import React from 'react';
import { Task } from './Task';

//{props名}でTaskCard.jsxからpropsを受け取る
export const Tasks = ({ taskList, setTaskList }) => {
	return (
		<div>
			{taskList.map((task) => (
				<div>
					<Task task={task} taskList={taskList} setTaskList={setTaskList} />
				</div>
			))}
		</div>
	);
};
