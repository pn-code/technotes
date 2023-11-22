import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between p-4 md:px-8 items-center">
      <h1 className="text-lg md:text-xl">TechNotes</h1>

      <ul>
        <li>
          <Button>Login</Button>
        </li>
      </ul>
    </nav>
  );
}
