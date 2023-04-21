import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function AdminUsers() {
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
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Last Login</th>
                  <th>Best Time</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
