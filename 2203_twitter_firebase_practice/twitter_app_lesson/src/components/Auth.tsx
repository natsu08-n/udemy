import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../features/userSlice";
import { auth, provider, storage } from "../firebase";

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Paper,
	Box,
	Grid,
	Typography,
	makeStyles,
	IconButton,
	Modal,
} from "@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	modal: {
		outline: "none",
		position: "absolute",
		width: 400,
		borderRadius: 10,
		backgroundColor: "white",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(10),
	},
}));

const Auth: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [avatarImage, setAvatarImage] = useState<File | null>(null); //取りうる型を｜のユニオン型で定義
	const [isLogin, setIsLogin] = useState(true);
	const [openModal, setOpenModal] = React.useState(false); //なんでここだけReact.ってつけてるの？？？？
	const [resetEmail, setResetEmail] = useState("");

	const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
		await auth
			.sendPasswordResetEmail(resetEmail)
			.then(() => {
				//成功したらモーダルを閉じる、setResetEmail初期化
				setOpenModal(false);
				setResetEmail("");
			})
			.catch((err) => {
				alert(err.message);
				setResetEmail("");
			});
	};

	const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files![0]) {
			//!はnonnulltypeアサーション
			setAvatarImage(e.target.files![0]);
			e.target.value = ""; //htmlのファイルダイアログを毎回同じものを指定したときに毎回反応しない仕様、そのため毎回空の文字列で初期化する必要がある
		}
	};

	const signInEmail = async () => {
		await auth.signInWithEmailAndPassword(email, password);
	};

	const signUpEmail = async () => {
		const authUser = await auth.createUserWithEmailAndPassword(email, password);
		let url = "";
		if (avatarImage) {
			const S =
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUCVWXYZ0123456789";
			const N = 16;
			const randomeChar = Array.from(crypto.getRandomValues(new Uint32Array(N))) //Crypto.getRandomValues() メソッドは、暗号強度の強い乱数値を取得する
				.map((n) => S[n % S.length])
				.join("");

			const fileName = randomeChar + "_" + avatarImage.name;

			await storage.ref(`avatars/${fileName}`).put(avatarImage);
			url = await storage.ref("avatars").child(fileName).getDownloadURL();
			//firebaseの仕様で、同じファイル名の画像を複数回アップロードすると元々あったファイルが削除されてしまう
			//そのため、自動でランダムなファイル名を作っていく必要がある
		}
		await authUser.user?.updateProfile({
			displayName: username,
			photoURL: url,
		});
		dispatch(
			updateUserProfile({
				displayName: username,
				photoUrl: url,
			})
		);
	};

	const signInGoogle = async () => {
		await auth.signInWithPopup(provider).catch((err) => alert(err.message));
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{isLogin ? "Login" : "Register"}
					</Typography>
					<form className={classes.form} noValidate>
						{!isLogin && (
							<>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
									autoFocus
									value={username}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setUsername(e.target.value);
									}}
								/>
								<Box textAlign="center">
									<IconButton>
										<label>
											<AccountCircleIcon
												fontSize="large"
												className={
													avatarImage
														? styles.login_addIconLoaded
														: styles.login_addIcon
												}
											/>
											<input
												className={styles.login_hiddenIcon}
												type="file"
												onChange={onChangeImageHandler}
											/>
										</label>
									</IconButton>
								</Box>
							</>
						)}
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setEmail(e.target.value);
							}}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setPassword(e.target.value);
							}}
						/>
						<Button
							disabled={
								isLogin
									? !email || password.length < 6
									: !username || !email || password.length < 6 || !avatarImage
							}
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							startIcon={<EmailIcon />}
							onClick={
								isLogin
									? async () => {
											try {
												await signInEmail();
											} catch (err: any) {
												alert(err.message);
											}
									  }
									: async () => {
											try {
												await signUpEmail();
											} catch (err: any) {
												alert(err.message);
											}
									  }
							}
						>
							{isLogin ? "Login" : "Register"}
						</Button>
						<Grid container>
							<Grid item xs>
								<span
									className={styles.login_reset}
									onClick={() => setOpenModal(true)}
								>
									Forgot password?
								</span>
							</Grid>
							<Grid item>
								<span
									className={styles.login_toggleMode}
									onClick={() => setIsLogin(!isLogin)}
								>
									{isLogin ? "Create new account ? " : "Back to login"}
								</span>
							</Grid>
						</Grid>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							startIcon={<CameraIcon />}
							className={classes.submit}
							onClick={signInGoogle}
						>
							Sign in with Google
						</Button>
						<Box mt={5}></Box>
					</form>

					{/*material-uiのModalタグ*/}
					<Modal open={openModal} onClose={() => setOpenModal(false)}>
						<div style={getModalStyle()} className={classes.modal}>
							<div className={styles.login_modal}>
								{/*material-uiのTextFieldタグ、InputLabelPropsはプレースホルダー(ここではlabelという)が入力時に縮小するように、強制的に縮小状態にする*/}
								<TextField
									InputLabelProps={{ shrink: true }}
									type="email"
									name="email"
									label="Reset E-mail"
									value={resetEmail} //ここは打ち込んだresetEmailの値を保持できる属性なのか？
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setResetEmail(e.target.value);
									}}
								/>
								<IconButton onClick={sendResetEmail}>
									<SendIcon />
								</IconButton>
							</div>
						</div>
					</Modal>
				</div>
			</Grid>
		</Grid>
	);
};

export default Auth;
