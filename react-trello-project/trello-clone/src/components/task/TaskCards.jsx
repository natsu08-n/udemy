import React from 'react';
import { TaskCard } from './TaskCard';
import { AddTaskCardButton } from '../button/AddTaskCardButton';

export const TaskCards = () => {
	return (
		<div className="taskCardsArea">
			<TaskCard />
			<AddTaskCardButton />
		</div>
	);
};
