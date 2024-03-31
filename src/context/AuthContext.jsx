import { useEffect, useState, createContext } from "react";
import { getAuth, signInWithPopup } from 'firebase/auth';
import { app, googleAuthProvider } from "../firebase/app";
import googleIcon from '../assets/googleIcon.webp'
import { setDoc, getDoc, getFirestore, doc } from "firebase/firestore";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        localStorage.setItem('authToken', authUser.uid);
      } else {
        setUser(null);
        localStorage.removeItem('authToken');
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    console.log("SIGNING");
    try {
      const signInInfo = await signInWithPopup(auth, googleAuthProvider)

      const db = getFirestore(app);
      const userRef = doc(db, "profiles", signInInfo.user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        console.log("creating docs");
        await setDoc(userRef, {
          name: signInInfo.user.displayName,
        });
      } else {
        console.log("aadsadads");
      }


    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.setItem('user', JSON.stringify({ active: false }));
      console.log('User logged out successfully');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
