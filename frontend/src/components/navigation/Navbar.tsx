import { Link } from "react-router-dom";
import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="w-full flex justify-between p-2 items-center">
      <h1 className="text-lg md:text-xl">
        <Link to="/">TechNotes</Link>
      </h1>

      <ul>
        {!isLoggedIn && (
          <li>
            <Button>
              <Link to="login">Login</Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
