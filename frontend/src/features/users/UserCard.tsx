interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return <li>{user.username}</li>;
}
