import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
export { signInWithPopup, signOut };
import { getFirestore, doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs, addDoc, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// User Profile helpers
export async function ensureUserProfile(user: any) {
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  try {
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'user', // Default role
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    } else {
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
  }
}

// Estimate helpers
export async function saveEstimate(userId: string, name: string, sector: string, country: string, city: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, 'estimates'), {
      userId,
      name,
      sector,
      country,
      city,
      data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'estimates');
  }
}

export async function getUserEstimates(userId: string) {
  try {
    const q = query(
      collection(db, 'estimates'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'estimates');
  }
}

export async function deleteEstimate(estimateId: string) {
  try {
    await deleteDoc(doc(db, 'estimates', estimateId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `estimates/${estimateId}`);
  }
}

// Admin helpers
export async function getAllUsers() {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'users');
  }
}

export async function getAllEstimates() {
  try {
    const snapshot = await getDocs(collection(db, 'estimates'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'estimates');
  }
}
