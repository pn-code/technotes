import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

interface UserCardProps {
  userId: string;
}

export default function UserCard({ userId }: UserCardProps) {
  const user = useSelector((state) => selectUserById(state, userId)) as User;

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dashboard/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    return (
      <li
        className={
          user.active
            ? "bg-green-200 p-2 rounded-md"
            : "bg-slate-300 p-2 rounded-md"
        }
      >
        <article className="flex justify-between">
          <div>
            <h1 className="font-semibold">USER: {user.username}</h1>
            <p className="uppercase">ROLES: {userRolesString}</p>
            <p>STATUS: {user.active ? "ACTIVE" : "DEACTIVATED"}</p>
          </div>
          <div>
            <Button
              onClick={handleEdit}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Edit
            </Button>
          </div>
        </article>
      </li>
    );
  } else return null;
}
