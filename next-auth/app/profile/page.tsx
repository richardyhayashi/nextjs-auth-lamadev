import { changePremium, changeUsername, getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="profile">
        <h1>Welcome to the Profile Page</h1>
        <p>Welcome, <b>{session.userName}</b></p>
        <span>You are a <b>{session.isPro ? "Premium" : "Free"}</b> user</span>
        <form action={changePremium}>
            <button>{session.isPro ? "Cancel" : "Buy"} Premium</button>
        </form>

        <form action={changeUsername}>
            <input type="text" name="username" placeholder={session.userName} required />
            <button>Update</button>
        </form>
    </div>
  );
};

export default ProfilePage;