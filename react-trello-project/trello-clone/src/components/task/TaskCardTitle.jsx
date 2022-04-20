import React, { useState } from 'react';

export const TaskCardTitle = () => {
	//クリックした時の状態を管理
	const [isClick, setIsClick] = useState(false);
	//入力内容の状態を管理
	const [inputCardTitle, setInputCardTitle] = useState('Today');

	const handleClick = () => {
		setIsClick(true);
		//console.log(isClick) isClickはstate変数だからfalseかtrueが入ってくる
	};

	const handleChange = (e) => {
		setInputCardTitle(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault(); //Enter押した時(onSubmit時)にページが更新されてしまうのを防ぐ
		setIsClick(false);
	};

	return (
		<div onClick={handleClick}>
			{isClick ? (
				<form onSubmit={handleSubmit}>
					<input type="text" onChange={handleChange} />
				</form>
			) : (
				<h3>{inputCardTitle}</h3>
			)}
		</div>
	);
};
