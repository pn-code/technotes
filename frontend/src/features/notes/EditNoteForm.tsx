import React, { useEffect, useState } from "react";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

interface EditNoteFormProps {
  users: User[];
  note: Note;
}

export default function EditNoteForm({ users, note }: EditNoteFormProps) {
  const [
    updateNote,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateNoteMutation();

  const [
    deleteNote,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [user, setUser] = useState(note.user);
  const [completed, setCompleted] = useState(note.completed);
  const [validTitle, setValidTitle] = useState(true);
  const [validText, setValidText] = useState(true);
  const [validUser, setValidUser] = useState(true);

  const validateInput = (text: string) =>
    text.trim().length > 0 && text.trim().length < 100;

  const validateUser = (userId: string) => {
    const userExists = users.filter((user: User) => user.id === userId).length;
    console.log(userExists);
    return Boolean(userId && userExists);
  };

  useEffect(() => {
    setValidTitle(validateInput(title));
  }, [title, validateInput]);

  useEffect(() => {
    setValidText(validateInput(text));
  }, [text, validateInput]);

  useEffect(() => {
    setValidUser(validateUser(user));
  }, [user, validateUser]);

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess) {
      navigate("/dashboard/notes");
    }
  }, [navigate, isUpdateSuccess, isDeleteSuccess]);

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleTextOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const handleUserOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value);
  };

  const handleCompletedOnChange = () => setCompleted((prev) => !prev);

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateNote({ id: note.id, user, title, text, completed });
    navigate("/dashboard/notes");
  };

  const handleDeleteNote = async () => {
    await deleteNote({ id: note.id });

    if (!isDeleteLoading && isDeleteSuccess) {
      navigate("/dashboard/notes");
    }
  };

  const canUpdate = [title, text, user].every(Boolean) && !isUpdateLoading;

  const userOptions = (
    <>
      <option value="">NONE SELECTED</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      ))}
    </>
  );

  const errorStyles =
    isUpdateError || isDeleteError ? "text-red-600 font-semibold" : "hidden";
  const titleStyles = validTitle ? "border-blue-600" : "border-red-600";
  const textStyles = validText ? "border-blue-600" : "border-red-600";
  const userStyles = validUser ? "border-blue-600" : "border-red-600";

  const getErrorMsg = (selectedError: any) => {
    const errorObj = selectedError as any;
    return errorObj.data.message;
  };

  return (
    <div className="p-2">
      <p className={errorStyles}>{getErrorMsg(updateError)}</p>
      <p className={errorStyles}>{getErrorMsg(deleteError)}</p>
      
      <form onSubmit={handleUpdateNote} className="flex flex-col">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Note</h2>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!canUpdate || isUpdateLoading || isDeleteLoading}
            >
              Update
            </Button>
            <Button
              type="button"
              onClick={handleDeleteNote}
              disabled={isUpdateLoading || isDeleteLoading}
            >
              Delete
            </Button>
          </div>
        </header>

        <label htmlFor="title">Title: </label>
        <input
          className={titleStyles}
          placeholder="New Note Title"
          onChange={handleTitleOnChange}
          id="title"
          name="title"
          type="text"
          value={title}
          minLength={1}
          maxLength={100}
        />

        <label htmlFor="title">Text: </label>
        <textarea
          placeholder="New Note Text"
          className={textStyles}
          onChange={(e) => handleTextOnChange(e)}
          id="title"
          name="title"
          value={text}
          minLength={1}
          maxLength={100}
        />

        <label htmlFor="user">Assigned User: </label>
        <select
          className={userStyles}
          name="user"
          id="user"
          value={user}
          onChange={handleUserOnChange}
        >
          {userOptions}
        </select>

        <label htmlFor="user">
          Completed:
          <input
            onChange={handleCompletedOnChange}
            id="completed"
            name="completed"
            type="checkbox"
          />
        </label>
      </form>
    </div>
  );
}
