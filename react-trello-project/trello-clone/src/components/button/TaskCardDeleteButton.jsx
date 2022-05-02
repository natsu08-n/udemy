import React from 'react';

export const TaskCardDeleteButton = ({
	taskCardList,
	setTaskCardList,
	taskCard,
}) => {
	const taskCardDeleteButton = (id) => {
		setTaskCardList(taskCardList.filter((e) => e.id !== id));
		console.log(id);
	};
	return (
		<div>
			<button
				className="taskCardDeleteButton"
				onClick={() => {
					taskCardDeleteButton(taskCard.id);
				}}
			>
				<i className="fa-solid fa-xmark"></i>
			</button>
		</div>
	);
};
