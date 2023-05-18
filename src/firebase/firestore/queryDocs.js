import firebase_app from "../config";
import { getFirestore, collection, where, doc, query, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDocument(col, query1Key, query1Val) {
    const q = query(collection(db, col), where(query1Key, "==", query1Val));
    
    let querySnapshot = null
    let result = [];
    let error = null;
    
    try {
        querySnapshot = await getDocs(q);
    } catch (e) {
        error = e;
    }
    
    querySnapshot.forEach((doc) => {
        result.push(doc.data())
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
    });

    return { result, error };
}
