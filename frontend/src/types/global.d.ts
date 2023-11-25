interface User {
  id: string;
  roles: any[];
  username: string;
  active: boolean;
}

interface Note {
  id: string;
  user: string;
  title: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string
}
