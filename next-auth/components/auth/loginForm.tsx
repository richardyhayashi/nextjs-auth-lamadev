'use client';

import { login } from "@/lib/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <form action={formAction}>
        <input type="text" name="username" placeholder="username" required />
        <input type="password" name="password" placeholder="password" required />
        <button>Login</button>
        {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default LoginForm;