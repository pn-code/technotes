import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectNoteById } from "./notesApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";

export default function EditNote() {
  const { id } = useParams();

  const note = useSelector((state) =>
    selectNoteById(state, id as string)
  ) as Note;
  const users = useSelector(selectAllUsers) as Users[];

  return note && users ? (
    <EditNoteForm users={users} note={note} />
  ) : (
    <p>Loading...</p>
  );
}
