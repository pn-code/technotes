import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";
import { notesApiSlice } from "../notes/notesApiSlice";
import { store } from "../../app/store";
import { Outlet } from "react-router-dom";

export default function Prefetch() {
  useEffect(() => {
    console.log("Subscribing...");
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate(""));
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate(""));

    return () => {
      console.log("Unsubscribing...");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
}
