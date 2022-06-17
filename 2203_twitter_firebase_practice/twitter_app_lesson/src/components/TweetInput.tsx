import React, { useState } from "react";
import styles from "./TweetInput.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { storage, db, auth } from "../firebase";
import { Avatar, Button, IconButton } from "@material-ui/core";
import firebase from "firebase/app";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const TweetInput = () => {
	const user = useSelector(selectUser);
	const [tweetImage, setTweetImage] = useState<File | null>(null);
	const [tweetMsg, setTweetMsg] = useState("");

	const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files![0]) {
			//!はnonnulltypeアサーション
			setTweetImage(e.target.files![0]);
			e.target.value = ""; //htmlのファイルダイアログを毎回同じものを指定したときに毎回反応しない仕様、そのため毎回空の文字列で初期化する必要がある
		}
	};

	const sendTweet = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); //送信したときにブラウザが自動リフレッシュされてしまうので、それを防ぐ

		if (tweetImage) {
			const S =
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUCVWXYZ0123456789";
			const N = 16;
			const randomeChar = Array.from(crypto.getRandomValues(new Uint32Array(N))) //Crypto.getRandomValues() メソッドは、暗号強度の強い乱数値を取得する
				.map((n) => S[n % S.length])
				.join("");

			const fileName = randomeChar + "_" + tweetImage.name;
			const uploadTweetImg = storage.ref(`images/${fileName}`).put(tweetImage);
			uploadTweetImg.on(
				//storageの処理に何らかの変更があった場合の後処理を追加できる
				firebase.storage.TaskEvent.STATE_CHANGED,
				//引数3つ取れる
				() => {}, //進捗状況管理、必要ないので空で
				(err) => {
					alert(err.message);
				}, //エラーハンドリング
				async () => {
					await storage
						.ref("images")
						.child(fileName)
						.getDownloadURL()
						.then(async (url) => {
							await db.collection("posts").add({
								avatar: user.photoUrl,
								image: url,
								text: tweetMsg,
								timestamp: firebase.firestore.FieldValue.serverTimestamp(), //firebaseのサーバータイム
								username: user.displayName,
							});
						});
				}
			);
		} else {
			db.collection("posts").add({
				avatar: user.photoUrl,
				image: "",
				text: tweetMsg,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(), //firebaseのサーバータイム
				username: user.displayName,
			});
		}
		//投稿が終わったら初期化
		setTweetImage(null);
		setTweetMsg("");
	};
	return (
		<>
			<form onSubmit={sendTweet}>
				<div className={styles.tweet_form}>
					<Avatar
						className={styles.tweet_avatar}
						src={user.photoUrl}
						onClick={async () => {
							await auth.signOut();
						}}
					/>

					<input
						type="text"
						className={styles.tweet_input}
						placeholder="what's happening?"
						autoFocus //ウェブページが表示された際に、指定した入力欄にカーソルが当たって自動的にフォーカスされます。
						value={tweetMsg}
						onChange={(e) => setTweetMsg(e.target.value)}
					/>

					<IconButton>
						<label>
							<AddAPhotoIcon
								className={
									tweetImage ? styles.tweet_addIconLoaded : styles.tweet_addIcon
								}
							/>
							<input
								type="file"
								className={styles.tweet_hiddenIcon}
								onChange={onChangeImageHandler}
							/>
						</label>
					</IconButton>
				</div>
				<Button
					type="submit"
					disabled={!tweetMsg}
					className={
						tweetMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
					}
				>
					送信
				</Button>
			</form>
		</>
	);
};

export default TweetInput;
