import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { AddTaskCardButton } from '../button/AddTaskCardButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const reOrder = (taskCardList, startIndex, endIndex) => {
	//タスクを並び変える
	const remove = taskCardList.splice(startIndex, 1);
	taskCardList.splice(endIndex, 0, remove[0]);
};

export const TaskCards = () => {
	//初期段階でカードリストエリアを一つだけ出しておく
	const [taskCardList, setTaskCardList] = useState([
		{ id: '0', draggableId: 'item0' },
	]);
	const handleDragEnd = (result) => {
		reOrder(taskCardList, result.source.index, result.destination.index);

		setTaskCardList(taskCardList);
	};
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided) => (
					<div
						className="taskCardsArea"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{taskCardList.map((taskCard, index) => (
							<TaskCard
								key={taskCard.id}
								index={index}
								taskCardList={taskCardList}
								setTaskCardList={setTaskCardList}
								taskCard={taskCard}
							/>
						))}
						{provided.placeholder}
						<AddTaskCardButton
							taskCardList={taskCardList}
							setTaskCardList={setTaskCardList}
						/>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
