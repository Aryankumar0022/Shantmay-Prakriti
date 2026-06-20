// lib/firestore.ts — All Firestore read/write operations
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  increment,
} from "firebase/firestore";
import { db } from "./firebase";
import type { UserProfile, Session, Language } from "@/types";

// ── User Profile ──────────────────────────────────────────

export async function getOrCreateProfile(uid: string, data: Omit<UserProfile, "uid" | "totalSeconds" | "leafCount" | "createdAt">): Promise<UserProfile> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as UserProfile;

  const profile: UserProfile = {
    uid,
    ...data,
    totalSeconds: 0,
    leafCount: 0,
    createdAt: Date.now(),
  };
  await setDoc(ref, profile);
  return profile;
}

export async function updateProfile(uid: string, updates: Partial<Pick<UserProfile, "country" | "language">>): Promise<void> {
  await updateDoc(doc(db, "users", uid), updates);
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

// ── Sessions ──────────────────────────────────────────────

export async function saveSession(session: Omit<Session, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "sessions"), session);

  // Update cumulative stats on user document
  const userRef = doc(db, "users", session.uid);
  const statsUpdate: Record<string, unknown> = {
    totalSeconds: increment(session.elapsedSeconds),
  };
  if (session.status === "completed") {
    statsUpdate.leafCount = increment(1);
  }
  await updateDoc(userRef, statsUpdate);

  return ref.id;
}

export async function getUserSessions(uid: string): Promise<Session[]> {
  const q = query(
    collection(db, "sessions"),
    where("uid", "==", uid),
    orderBy("startedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Session));
}
