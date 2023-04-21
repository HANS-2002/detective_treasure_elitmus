import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";

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
  const [time, setTime] = useState(0);

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
        if (data.curSavedTime !== -1) setTime(data.curSavedTime);
        let count = 0;
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newSudoku[i][j] !== 0) {
              count++;
            }
          }
        }
        if (count === 0) {
          axios
            .get("https://sugoku.onrender.com/board?difficulty=easy")
            .then((response) => {
              setSudoku(response.data.board);
              // console.log(response.data);
            });
          setSudoku(newSudoku);
        } else setSudoku(newSudoku);
      });
    });
  }, [email]);

  function saveSudoku(sudokuBoard) {
    let savedGame = {};
    for (let i = 1; i <= 9; i++) {
      savedGame[i] = sudokuBoard[i - 1];
    }
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
        updateDoc(doc.ref, {
          savedGame: savedGame,
          curSavedTime: time,
        });
      });
    });
  }

  function sudokuWinnerChecker() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] === 0) {
          return false;
        }
      }
    }
    for (let i = 0; i < 9; i++) {
      let row = new Set();
      let col = new Set();
      for (let j = 0; j < 9; j++) {
        row.add(sudoku[i][j]);
        col.add(sudoku[j][i]);
      }
      if (row.size !== 9 || col.size !== 9) {
        return false;
      }
    }
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        let block = new Set();
        for (let k = i; k < i + 3; k++) {
          for (let l = j; l < j + 3; l++) {
            block.add(sudoku[k][l]);
          }
        }
        if (block.size !== 9) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <>
      <p className="mb-4">
        <span className="font-bold">Current Time: </span>
        {userDetails.curSavedTime === -1 ? "None" : userDetails.curSavedTime}
      </p>
      <p>
        <span className="font-bold">Best Time: </span>
        {userDetails.bestTime === -1 ? "None" : userDetails.bestTime}
      </p>
      <div className="flex flex-col mt-4 mb-4">
        {sudoku.map((row, i) => {
          return (
            <div key={i} className="flex flex-row">
              {row.map((cell, j) => {
                return (
                  <input
                    key={i * 9 + j}
                    className={`
                    ${i % 3 === 2 && i !== 8 ? "border-b-4" : ""} 
                    ${j % 3 === 2 && j !== 8 ? "border-r-4" : ""}
                    ${cell === 0 ? "text-blue-300" : "text-red-300"}
                    border
                    border-blue-300 p-2 m-0 w-8 h-8 text-center caret-transparent hover:cursor-pointer
                    `}
                    type="text"
                    maxLength={1}
                    onKeyDown={(e) => {
                      const key = e.key;
                      if (key === "Backspace") {
                        e.target.value = "";
                        let sudokuBoard = sudoku;
                        sudokuBoard[i][j] = 0;
                        saveSudoku(sudokuBoard);
                        setSudoku(sudokuBoard);
                      } else if (key >= 1 && key <= 9) {
                        e.target.value = key;
                        let sudokuBoard = sudoku;
                        sudokuBoard[i][j] = parseInt(key);
                        saveSudoku(sudokuBoard);
                        setSudoku(sudokuBoard);
                      }
                    }}
                    onChange={(e) => {}}
                    value={cell === 0 ? "" : cell}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {/* <div className="flex flex-row mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={resetSudoku}
        >
          Reset
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            if (sudokuWinnerChecker()) {
              alert("You Won!");
            } else {
              alert("You Lost!");
            }
          }}
        >
          Check
        </button>
      </div> */}
    </>
  );
}
