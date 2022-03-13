import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Feed from "./components/Feed";
import Auth from "./components/Auth";
import { StylesContext } from "@material-ui/styles";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      //firebaseのユーザーに対しての何らかの変化があったときに毎回呼び出される関数。関数を実行するとsubscribeが始まってユーザーの変化の監視を行ってくれる
      if (authUser) {
        //dispatchはstoreへの情報の運び屋
        dispatch(
          login({
            //uidやphotoURLはfirebaseのuser情報に用意されている https://firebase.google.com/docs/auth/web/manage-users?hl=ja
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    }
  }, [dispatch]);
  return <>
  {user.uid ? (
    <div className={styles.app}><Feed /></div>
    
  ) : (
    <Auth />
  )
}
  </>;
};

export default App;
