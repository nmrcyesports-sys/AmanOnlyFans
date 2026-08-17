import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface ProfileData {
  displayName: string;
  username: string;
  profileImage: string;
  posts: number;
  followers: number;
  following: number;
  category: string;
  location: string;
  otherProfile?: string;
  highlights?: { title: string; coverImage?: string }[];
  visuals?: string[];
}

const defaultData: ProfileData = {
  displayName: 'PSYCHO ⚡',
  username: '@amaaan._.1',
  profileImage: 'https://images.unsplash.com/photo-1618641986557-1de270cb4848?q=80&w=3174&auto=format&fit=crop',
  posts: 2,
  followers: 531,
  following: 585,
  category: 'Personal blog',
  location: 'Varanasi',
  otherProfile: 'aman_prrv',
  highlights: [
    { title: 'highlight_1', coverImage: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop' },
    { title: 'highlight_2', coverImage: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=500&auto=format&fit=crop' },
  ],
  visuals: [
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=3270&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=3271&auto=format&fit=crop'
  ]
};

interface ProfileContextType {
  data: ProfileData;
  updateProfile: (newData: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ProfileData>(defaultData);
  const profileDocRef = doc(db, 'profile', 'main');

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const unsubscribe = onSnapshot(profileDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as ProfileData);
      } else {
        // If it doesn't exist, seed it with default data
        setDoc(profileDocRef, defaultData);
      }
    }, (error) => {
      console.error("Firestore Error:", error);
    });

    return () => unsubscribe();
  }, []);

  const updateProfile = async (newData: Partial<ProfileData>) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData); // Optimistic UI update
    try {
      await setDoc(profileDocRef, updatedData, { merge: true });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ProfileContext.Provider value={{ data, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) throw new Error('useProfile must be used within ProfileProvider');
  return context;
};
