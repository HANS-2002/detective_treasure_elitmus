import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Sudoku(props) {
  const email = props.email;
  const [sudoku, setSudoku] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
        let newSudoku = [];
        for (let i = 1; i <= 9; i++) {
          newSudoku.push(data.savedGame[i]);
        }
        // if(newSudoku === sudoku)
        setSudoku(newSudoku);
      });
    });
  }, [email]);

  useEffect(() => console.log(sudoku), [sudoku]);

  return (
    <>
      <p className="mb-4">
        Cur Time:{" "}
        {userDetails.curSavedTime === -1 ? "None" : userDetails.curSavedTime}
      </p>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <input
            className="border-2 border-black p-2 m-1 w-8 h-8 text-center caret-transparent hover:cursor-pointer"
            type="text"
            maxLength={1}
            onKeyDown={(e) => {
              const key = e.key;
              if (key >= 1 && key <= 9) {
                let sudokuCopy = sudoku;
                sudokuCopy[0][0] = parseInt(key);
                setSudoku(sudokuCopy);
              }
            }}
            value={sudoku[0][0] === 0 ? "" : sudoku[0][0]}
          />
        </div>
      </div>
    </>
  );
}
