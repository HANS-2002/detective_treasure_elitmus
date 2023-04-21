import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Score(props) {
  const email = props.email;
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
      });
    });
  }, [email]);
  return (
    <>
      <p>
        Best Time:{" "}
        {userDetails.bestTime === -1 ? "None" : userDetails.bestTime}
      </p>
    </>
  );
}
