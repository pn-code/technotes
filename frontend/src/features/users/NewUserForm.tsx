import { useNavigate } from "react-router-dom";
import { useCreateNewUserMutation } from "./usersApiSlice";
import { useEffect, useState } from "react";
import { ROLES } from "../../config/roles";
import Button from "../../components/ui/Button";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function NewUserForm() {
    const [createNewUser, { isLoading, isSuccess, isError, error }] =
        useCreateNewUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(["Employee"]);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess) {
            setUsername("");
            setPassword("");
            setRoles([]);
            navigate("/dashboard/users");
        }
    }, [isSuccess, navigate]);

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const onRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRoles(values);
    };

    const canSave =
        [roles.length, validUsername, validPassword].every(Boolean) &&
        !isLoading;

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await createNewUser({ username, password, roles });
        }
    };

    const options = Object.values(ROLES).map((role) => {
        return (
            <option key={role} value={role}>
                {role}
            </option>
        );
    });

    const errorStyles = isError ? "border-red-600" : "border-blue-500";
    const validUserStyles = validUsername ? "border-blue-500" : "border-red-600";
    const validPasswordStyles = validPassword ? "border-blue-500" : "border-red-600";
    const validRolesStyles = roles.length ? "border-blue-500" : "border-red-600";

    return (
        <div className="p-2">
            <p className={errorStyles}>{error?.data?.message}</p>

            <form className="flex flex-col" onSubmit={onSaveUserClicked}>
                <header className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">New User</h2>
                    <div>
                        <Button disabled={!canSave}>Save</Button>
                    </div>
                </header>

                <label htmlFor="username">
                    Username: <span>[3-20 letters]</span>
                </label>
                <input
                    className={validUserStyles}
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    autoComplete="off"
                    onChange={onUsernameChanged}
                />

                <label htmlFor="password">
                    Password: <span>[4-12 chars including !@#$%]</span>
                </label>
                <input
                    className={validPasswordStyles}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    autoComplete="off"
                    onChange={onPasswordChanged}
                />

                <label htmlFor="roles">Assigned Roles:</label>
                <select
                    className={validRolesStyles}
                    name="roles"
                    id="roles"
                    multiple={true}
                    size={3}
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
            </form>
        </div>
    );
}
