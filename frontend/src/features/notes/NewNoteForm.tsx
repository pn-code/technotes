import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { useCreateNewNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";

interface NewNoteFormProps {
  users: User[];
}

export default function NewNoteForm({ users }: NewNoteFormProps) {
  const [createNote, { isLoading, isSuccess, isError, error }] =
    useCreateNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [validText, setValidText] = useState(false);
  const [validUser, setValidUser] = useState(false);

  const validateInput = (text: string) =>
    text.trim().length > 0 && text.trim().length < 100;

  const validateUser = (userId: string) => {
    const userExists = users.filter((user: User) => user.id === userId).length;
    return Boolean(userId && userExists);
  };

  useEffect(() => {
    setValidTitle(validateInput(title));
  }, [title]);

  useEffect(() => {
    setValidText(validateInput(text));
  }, [text]);

  useEffect(() => {
    setValidUser(validateUser(user));
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUser("");
      navigate("/dashboard/notes");
    }
  }, [isSuccess, navigate]);

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleTextOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);
  const handleUserOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value);
  };

  const canSave = [title, text, user].every(Boolean) && !isLoading;

  const handleCreateNewNote = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Can Save: ", canSave)
    if (canSave) {
      await createNote({ user, title, text });
    }
  };

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

  const errorStyles = isError ? "hidden" : "text-red-600 text-semibold";
  const titleStyles = validTitle ? "border-blue-600" : "border-red-600";
  const textStyles = validText ? "border-blue-600" : "border-red-600";
  const userStyles = validUser ? "border-blue-600" : "border-red-600";

  return (
    <div className="p-2">
      <p className={errorStyles}>{error?.data?.message}</p>
      <form onSubmit={handleCreateNewNote} className="flex flex-col">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">New Note</h2>
          <Button type="submit" disabled={!canSave || isLoading}>Save</Button>
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
      </form>
    </div>
  );
}
