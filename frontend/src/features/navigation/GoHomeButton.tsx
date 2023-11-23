import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { LucideHome } from "lucide-react";

export default function GoHomeButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dashboard");

  if (pathname !== "/dashboard") {
    return (
      <Button onClick={onGoHomeClicked} title="Home" ariaLabel="Go Home Button">
        <LucideHome />
      </Button>
    );
  } else {
    return null;
  }
}
