import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskCardDeleteButton } from '../button/TaskCardDeleteButton';
import { TaskAddInput } from '../input/TaskAddInput';
import { TaskCardTitle } from './TaskCardTitle';
import { Tasks } from './Tasks';

export const TaskCard = ({
	taskCardList,
	setTaskCardList,
	taskCard,
	index,
}) => {
	const [inputText, setInputText] = useState('');
	const [taskList, setTaskList] = useState([]);
	return (
		<Draggable draggableId={taskCard.id} index={index}>
			{(provided) => (
				<div
					className="taskCard"
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<div
						className="taskCardTitleAndTaskCardDeleteButtonArea"
						{...provided.dragHandleProps}
					>
						<TaskCardTitle />
						<TaskCardDeleteButton
							taskCardList={taskCardList}
							setTaskCardList={setTaskCardList}
							taskCard={taskCard}
						/>
					</div>
					<TaskAddInput
						//props名={値}でpropsを渡す, TaskAddInputはpropsを受け取っていろいろやる
						inputText={inputText}
						setInputText={setInputText}
						taskList={taskList}
						setTaskList={setTaskList}
					/>
					<Tasks
						//props名={値}でpropsを渡す, Tasksもpropsを受け取っていろいろやる
						inputText={inputText}
						taskList={taskList}
						setTaskList={setTaskList}
					/>
				</div>
			)}
		</Draggable>
	);
};
