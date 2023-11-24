import NoteCard from "./NoteCard";
import { useGetNotesQuery } from "./notesApiSlice";

export default function NotesList() {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("");

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
      <ul>
        {ids.map((noteId: string) => (
          <NoteCard key={noteId} note={notes.entities[noteId]} />
        ))}
      </ul>
    );
  }

  return content;
}
