import { Link } from "react-router-dom";

export default function DashHeader() {
  return (
    <header>
      <div>
        <h1>
          <Link to="/dashboard/notes">TechNotes</Link>
        </h1>
        <nav>
          <ul></ul>
        </nav>
      </div>
    </header>
  );
}
