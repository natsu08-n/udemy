import React from 'react';

//{props名}で受け取る
export const Tasks = ({ inputText, taskList }) => {
	return (
		<div>
			{taskList.map((task) => (
				<div>{task.text}</div>
			))}
		</div>
	);
};
