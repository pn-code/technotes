import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fingerprint, Home, StickyNote, User } from "lucide-react";
import { useLogOutMutation } from "../../features/auth/authApiSlice";
import Button from "../ui/Button";
import { useEffect } from "react";

export default function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [logOut, { isLoading, isSuccess, isError, error }] =
    useLogOutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const handleLogOut = () => logOut(null);

  if (isLoading) return <p>Logging Out...</p>;

  const errorObj = error as any;

  if (isError) return <p>Error: {errorObj?.data?.message}</p>;

  return (
    <header className="px-2">
      <div className="py-1 flex gap-2 md:gap-8 items-center border-y-2 border-slate-400">
        <h1>
          <Link
            className="flex gap-1 items-center font-semibold hover:text-slate-600"
            to="/dashboard"
          >
            <Home size={18} /> Home
          </Link>
        </h1>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link
                className="flex gap-1 items-center font-semibold hover:text-slate-600"
                to="/dashboard/notes"
              >
                <StickyNote size={18} /> Notes
              </Link>
            </li>
            <li>
              <Link
                className="flex gap-1 items-center font-semibold hover:text-slate-600"
                to="/dashboard/users"
              >
                <User size={18} /> Users
              </Link>
            </li>
            <li>
              <Button
                onClick={handleLogOut}
                type="button"
                className="flex gap-1 items-center font-semibold hover:text-slate-600"
              >
                <Fingerprint size={18} /> Log Out
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
