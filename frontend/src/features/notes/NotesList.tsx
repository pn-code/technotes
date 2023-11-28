import NoteCard from "./NoteCard";
import { useGetNotesQuery } from "./notesApiSlice";

export default function NotesList() {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
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
        <h1 className="text-xl font-semibold">Notes List</h1>
        {ids.map((noteId: string) => (
          <NoteCard key={noteId} noteId={noteId} />
        ))}
      </ul>
    );
  }

  return content;
}
