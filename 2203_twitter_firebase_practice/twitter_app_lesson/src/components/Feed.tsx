import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import { db } from "../firebase";
import TweetInput from "./TweetInput";
import Post from "./Post";

const Feed: React.FC = () => {
	const [posts, setPosts] = useState([
		{
			id: "",
			avatar: "",
			image: "",
			text: "",
			timestamp: null,
			username: "",
		},
	]);

	//feedコンポーネントがマウントされたとき、useEffectの内容が実行される(firebaseから取ってくる)
	useEffect(() => {
		const unSub = db
			.collection("posts")
			.orderBy("timestamp", "desc") //最新の内容から降順
			.onSnapshot((snapshot) =>
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						avatar: doc.data().avatar,
						image: doc.data().image,
						text: doc.data().text,
						timestamp: doc.data().timestamp,
						username: doc.data().username,
					}))
				)
			);
		//アンマウントするときにクリーンアップ関数として実行される
		return () => {
			unSub();
		};
	}, []);
	return (
		//投稿がない時はレンダリングしない(idが存在したら&&の後ろがレンダリングされる)
		<div className={styles.feed}>
			<TweetInput />
			{posts[0]?.id && (
				<>
					{posts.map((post) => (
						<Post
							key={post.id}
							postId={post.id}
							avatar={post.avatar}
							image={post.image}
							text={post.text}
							timestamp={post.timestamp}
							username={post.username}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default Feed;
