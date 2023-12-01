import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export default function useAuth() {
  const token = useSelector(selectCurrentToken);

  let isLoggedIn = false;
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwtDecode(token) as any;
    const { username, roles } = decoded.UserInfo;

    isLoggedIn = true;
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin, isLoggedIn };
  }

  return { username: "", roles: [], isManager, isAdmin, status, isLoggedIn };
}
