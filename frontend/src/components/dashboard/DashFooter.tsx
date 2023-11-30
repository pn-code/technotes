import useAuth from "../../hooks/useAuth";

export default function DashFooter() {
  const { username, status } = useAuth();
  return (
    <footer className="flex justify-between items-center p-2 text-sm fixed bottom-0 w-full">
      <p>Current User: {username} </p>
      <p>Status: {status}</p>
    </footer>
  );
}
