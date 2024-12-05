import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const FIREBASE_CONFIG = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG); // Firebase configuration

export const APP = initializeApp(FIREBASE_CONFIG);

export const FB_DB = getDatabase(APP);
export const FB_DB_MUSIC_LISTS = "dbMusicLists";
export const FB_DB_MUSIC_USERS = "dbMusicUsers";
export const FB_DB_USERS_DATA = "dbUsersData";

export const FB_AUTH = getAuth(APP);
