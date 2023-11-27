import { useEffect, useState } from "react";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { ROLES } from "../../config/roles";

interface EditUserFormProps {
    user: User;
}

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function EditUserForm({ user }: EditUserFormProps) {
    const [
        updateUser,
        {
            isLoading: isUpdateLoading,
            isSuccess: isUpdateSuccess,
            isError: isUpdateError,
            error: updateError,
        },
    ] = useUpdateUserMutation();

    const [
        deleteUser,
        {
            isLoading: isDeleteLoading,
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: deleteError,
        },
    ] = useDeleteUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.roles);
    const [active, setActive] = useState(user.active);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isUpdateSuccess || isDeleteSuccess) {
            setUsername("");
            setPassword("");
            setRoles([]);
            navigate("/dashboard/users");
        }
    }, [isUpdateSuccess, isDeleteSuccess, navigate]);

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const onRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRoles(values);
    };

    const onActiveChanged = () => setActive((prev) => !prev);

    const onUpdateUserClicked = async (e) => {
        e.preventDefault();

        if (password) {
            await updateUser({
                id: user.id,
                username,
                password,
                roles,
                active,
            });
        } else {
            await updateUser({ id: user.id, username, roles, active });
        }
    };

    let canUpdate;

    if (password) {
        canUpdate =
            [roles.length, validUsername, validPassword].every(Boolean) &&
            !isUpdateLoading;
    } else {
        canUpdate =
            [roles.length, validUsername].every(Boolean) && !isUpdateLoading;
    }

    const onDeleteUserClicked = async (e) => {
        e.preventDefault();
        deleteUser({ id: user.id });
    };

    const errorStyles =
        isUpdateError || isDeleteError ? "text-red-600" : "hidden";
    const validUserStyles = validUsername ? "hidden" : "text-red-600";
    const validPasswordStyles = validPassword ? "hidden" : "text-red-600";
    const validRolesStyles = roles.length ? "hidden" : "text-red-600";

    const options = Object.values(ROLES).map((role) => {
        return (
            <option key={role} value={role}>
                {role}
            </option>
        );
    });

    return (
        <>
            <p className={errorStyles}>
                {updateError?.data?.message || deleteError?.data?.message}
            </p>

            <form className="" onSubmit={onUpdateUserClicked}>
                <div>
                    <h2>Edit User</h2>
                    <div>
                        <Button disabled={!canUpdate}>Update</Button>
                    </div>
                </div>

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

                <label htmlFor="user-active">
                    Active:
                    <input
                        onChange={onActiveChanged}
                        id="user-active"
                        name="user-active"
                        checked={active}
                        type="checkbox"
                    />
                </label>
            </form>
        </>
    );
}