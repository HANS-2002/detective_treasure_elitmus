import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  function handleLogoutClick() {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <>
      {loading ? (
        <></>
      ) : !user ? (
        <>
          <nav className="flex items-center justify-between flex-wrap text-white bg-zinc-800 p-2">
            <div className="flex items-center flex-shrink-0 mr-6 ml-2">
              <span className="font-semibold text-xl tracking-tight">
                <Link to="/">Sudoku Puzzle</Link>
              </span>
            </div>
            <div className="flex items-center justify-between flex-wrap">
              <a
                className="btn btn-ghost"
                href="https://github.com/HANS-2002/detective_treasure_elitmus"
                target="_blank"
                rel="noreferrer"
                content="noopener noreferrer"
              >
                SOURCE CODE
              </a>
            </div>
          </nav>
        </>
      ) : (
        <>
          {/* Login ke baad profile pic chipka dena */}
          <nav className="flex items-center justify-between flex-wrap text-white bg-zinc-800 p-2">
            <div className="flex items-center flex-shrink-0 mr-6 ml-2">
              <span className="font-semibold text-xl tracking-tight">
                <Link to="/">Teasure Hunt</Link>
              </span>
            </div>
            <div className="flex flex-row">
              <div className="flex items-center justify-between flex-wrap mr-4">
                <a
                  className="btn btn-ghost"
                  href="https://github.com/HANS-2002/detective_treasure_elitmus"
                  target="_blank"
                  rel="noreferrer"
                  content="noopener noreferrer"
                >
                  SOURCE CODE
                </a>
              </div>
              <div className="flex-none gap-2 dropdown dropdown-end dropdown-hover">
                <button
                  className="btn btn-ghost mr-2"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}