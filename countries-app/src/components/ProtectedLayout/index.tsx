import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  if(!auth.email) {
    navigate('/login');
  }

  return children;
};
