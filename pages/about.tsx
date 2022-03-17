import { fetchFirebaseDb } from "../queries/fetch-firebase-db.queries"
   import {firebaseDb} from '../configs/config'
import { collection , onSnapshot } from 'firebase/firestore';
export default function About() {
  
  return (
    <div>Welcome to NextJs app
    <p className="flex">
        I can do a whole lot here</p>
        <p className="flex">
        age is</p>
        </div>
  )
}


