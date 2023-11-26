import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

export default function EditUser() {
    const params = useParams();
    const id = Number(params.id);

    const user = useSelector((state) => selectUserById(state, id)) as User;

    return user ? <EditUserForm user={user} /> : <p>Loading...</p>;
}
