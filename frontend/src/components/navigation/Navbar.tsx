import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between p-4 md:px-8 items-center">
      <h1 className="text-lg md:text-xl">
        <Link to="/">TechNotes</Link>
      </h1>

      <ul>
        <li>
          <Button>
            <Link to="login">Login</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
