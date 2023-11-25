import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

interface NoteCardProps {
  noteId: string;
}

export default function NoteCard({ noteId }: NoteCardProps) {
  const note = useSelector((state) => selectNoteById(state, noteId)) as Note;

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dashboard/notes/${noteId}`);

    return (
      <li>
        <article className="flex flex-col bg-slate-50 gap-2 shadow-md mb-2">
          <header className="flex justify-between bg-slate-200 p-1.5 items-center">
            <p className="font-semibold text-slate-600">ID: {note.id}</p>
            <Button
              onClick={handleEdit}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Edit
            </Button>
          </header>

          <div className="p-2 pb-6">
            <p className="font-semibold mb-3">{note.title}</p>

            <p>{note.text}</p>

            <p
              className={
                note.completed
                  ? "text-blue-500 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {note.completed ? "COMPLETED" : "NOT COMPLETED"}
            </p>

            <div className="flex flex-col md:flex-row md:justify-between">
              <p className="text-xs text-slate-600">Created on {created}</p>
              <p className="text-xs text-slate-600">Last modified {updated}</p>
            </div>
          </div>
        </article>
      </li>
    );
  } else return null;
}
