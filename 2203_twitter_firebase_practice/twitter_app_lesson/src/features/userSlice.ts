import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface USER {
	displayName: string;
	photoUrl: string;
}

export const userSlice = createSlice({
	name: "user",
	initialState: {
		//Reduxのstoreで扱いたいステートを定義する、TSが推論で型付けをしてくれる
		user: { uid: "", photoUrl: "", displayName: "" },
	},
	reducers: {
		//actionのペイロードの属性にReactのコンポーネントからdispatchで呼び出すとき、引数としてfirebaseから取得したUserの情報をactionのペイロードに渡してログインで受け取れるようにする
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {
			//userの情報を初期化
			state.user = { uid: "", photoUrl: "", displayName: "" };
		},
		updateUserProfile: (state, action: PayloadAction<USER>) => {
			state.user.displayName = action.payload.displayName;
			state.user.photoUrl = action.payload.photoUrl;
		},
	},
});

export const { login, logout, updateUserProfile } = userSlice.actions;
//ReduxのストアのuserのステートをReactのコンポーネントから参照するときにuseSelectorで参照することができるがそのときに指定する関数を定義してる
//userのステートを返してくれる
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
