import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { AddTaskCardButton } from '../button/AddTaskCardButton';

export const TaskCards = () => {
	//初期段階でカードリストエリアを一つだけ出しておく
	const [taskCardList, setTaskCardList] = useState([
		{ id: 0, draggableId: 'item0' },
	]);
	return (
		<div className="taskCardsArea">
			{taskCardList.map((taskCardListItem) => (
				<TaskCard key={taskCardListItem.id} />
			))}
			<AddTaskCardButton
				taskCardList={taskCardList}
				setTaskCardList={setTaskCardList}
			/>
		</div>
	);
};
