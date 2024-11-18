import { fireDb } from "./initializeFirebase.js";
import {collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import {getCurrentUserInfo} from "./user/userFunctions.js";


export const fetchUserData = async => {
        getCurrentUserInfo()



}