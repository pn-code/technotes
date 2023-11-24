import UserCard from "./UserCard";
import { useGetUsersQuery } from "./usersApiSlice";

export default function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("");

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "bg-red-500 text-white" : "hidden"}>
        We ran into an error fetching users data. Please try again.
      </p>
    );
    console.log(error);
  }

  if (isSuccess) {
    const { ids } = users;

    content = (
      <ul className="flex flex-col gap-2 p-2">
        <h2 className="text-xl font-semibold">Users List</h2>
        {ids.map((userId: string) => (
          <UserCard key={userId} userId={userId} />
        ))}
      </ul>
    );
  }

  return content;
}
