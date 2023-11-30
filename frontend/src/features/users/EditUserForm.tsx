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

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onRolesChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option: RoleOption) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onUpdateUserClicked = async (e: React.FormEvent) => {
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

  const handleDeleteUserClicked = async () => {
    deleteUser({ id: user.id });
  };

  const errorStyles =
    isUpdateError || isDeleteError ? "text-red-600" : "hidden";
  const validUserStyles = validUsername ? "border-blue-500" : "border-red-600";
  const validPasswordStyles = validPassword
    ? "border-blue-500"
    : "border-red-600";
  const validRolesStyles = roles.length ? "border-blue-500" : "border-red-600";

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const getErrorMsg = (selectedError: any) => {
    const errorObj = selectedError as any;
    return errorObj.data.message;
  };

  return (
    <div className="p-2">
      <p className={errorStyles}>{updateError && getErrorMsg(updateError)}</p>
      <p className={errorStyles}>{deleteError && getErrorMsg(deleteError)}</p>

      <form className="flex flex-col" onSubmit={onUpdateUserClicked}>
        <div className="flex justify-between item-center">
          <h2 className="text-xl font-semibold">Edit User</h2>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={!canUpdate || isDeleteLoading || isUpdateLoading}
            >
              Update
            </Button>
            <Button
              type="button"
              onClick={handleDeleteUserClicked}
              disabled={isDeleteLoading || isUpdateLoading}
            >
              Delete
            </Button>
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

        <label htmlFor="roles">Assigned Roles: </label>
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
            className="w-10"
            onChange={onActiveChanged}
            id="user-active"
            name="user-active"
            checked={active}
            type="checkbox"
          />
        </label>
      </form>
    </div>
  );
}
