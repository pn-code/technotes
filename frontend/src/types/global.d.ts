interface User {
  id: string;
  roles: [];
  username: string;
  active: boolean;
}

interface Note {
  id: string;
  user: string
  title: string;
  text: string;
  completed: boolean;
}