import { Link } from "react-router-dom";
import { Home, StickyNote, User } from "lucide-react";

export default function DashHeader() {
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
