import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import NoteCard from "./NoteCard";
import { useGetNotesQuery } from "./notesApiSlice";

export default function NotesList() {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "bg-red-500 text-white" : "hidden"}>
        We ran into an error fetching notes data. Please try again.
      </p>
    );
    console.log(error);
  }

  if (isSuccess) {
    const { ids } = notes;

    content = (
      <ul className="w-full p-2 flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Notes List</h1>
          <Button>
            <Link to="new">Create Note</Link>
          </Button>
        </header>

        {ids.map((noteId: string) => (
          <NoteCard key={noteId} noteId={noteId} />
        ))}
      </ul>
    );
  }

  return content;
}
