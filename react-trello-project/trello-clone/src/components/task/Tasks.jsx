import React from 'react';
import { Task } from './Task';

//{props名}で受け取る
export const Tasks = ({ taskList }) => {
	return (
		<div>
			{taskList.map((task) => (
				<div>
					<Task task={task} />
				</div>
			))}
		</div>
	);
};
