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
      <ul>
        {ids.map((userId: string) => (
          <UserCard key={userId} user={users.entities[userId]} />
        ))}
      </ul>
    );
  }

  return content;
}
