import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";

export default function Score() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("bestTime"), limit(8));

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.isAdmin === true) return;
        let newData = users;
        newData.push({
          username: data.username,
          bestTime: data.bestTime,
        });
        setUsers(newData);
      });
    });
  }, []);

  return (
    <>
      <div className="mb-4">
        <p className="font-bold text-center mt-4 text-red-500">
          Global Leaderboard
        </p>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Best Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.bestTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
