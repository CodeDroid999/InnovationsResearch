import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import HeroBackground from '../public/svg/SpinnerX.svg';
import Image from 'next/image';

type User = {
  displayName?: string;
  userId?: string;
  profilePicture?: string;
  email?: string;
  role?: string;
  balance?: number;
  createdAt: Timestamp;
};

interface AuthContextType {
  profilePicture: string;
  user: User | null;
  userRole: string | null;
  displayName: string | null;
  userId: string | null;
  balance: number;
  logOut: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  displayName: '',
  profilePicture: '',
  userId: '',
  balance: 0,
  logOut: () => { },
  loading: false,
  error: null,
});

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        const q = query(collection(db, 'users'), where('userId', '==', currentUser.uid));

        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const userData = doc.data() as User;

            setUser(userData);
            setUserRole(userData.role);
            setDisplayName(userData.displayName);
            setUserId(userData.userId);
            setBalance(userData.balance);
            setProfilePicture(userData.profilePicture);

            setError(null);
          } else {
            console.error('User not found.');
            setError('User not found.');
          }

          setLoading(false);
        });

        return () => {
          unsubscribeSnapshot();
        };
      } else {
        setUser(null);
        setUserRole(null);
        setDisplayName(null);
        setUserId(null);
        setBalance(0);
        setProfilePicture(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex mx-auto h-[100vh] w-100 bg-gray-100 justify-center align-center">
        <div className="container flex justify-center align-middle min-h-screen">
          <Image src={HeroBackground} alt="Background" width="200" height="200" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        logOut,
        loading,
        error,
        balance,
        displayName,
        profilePicture,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create an alias for UserAuth hook
export const UserAuth = () => {
  return useContext(AuthContext);
};
