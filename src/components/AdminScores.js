import { Link } from "react-router-dom";

export default function AdminScores() {
  return (
    <>
      <div className="flex flex-row mainDiv">
        <div className="flex flex-col w-1/5 p-4 items-center border-white border-r-2">
          <p className="font-bold text-3xl text-red-500">Admin Panel</p>
          <Link to="/admin/users" className="mt-16 mb-2 font-bold text-xl">
            Users
          </Link>
          <Link to="/admin/scores" className="mt-8 mb-4 font-bold text-xl">
            Scores
          </Link>
        </div>
        <div className="flex flex-col w-4/5 p-4 items-center">
          <h1>Heading with 80% and admin scores</h1>
        </div>
      </div>
    </>
  );
}
