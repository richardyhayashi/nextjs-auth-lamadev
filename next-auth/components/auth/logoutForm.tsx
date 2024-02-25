import { logout } from "@/lib/actions";

const LogoutForm = () => {
  return (
    <form action={logout}>
        <button>Logout</button>
    </form>
  );
};

export default LogoutForm;