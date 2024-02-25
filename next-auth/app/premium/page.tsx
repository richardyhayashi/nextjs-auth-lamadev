import { getSession } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const PremiumPage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  if (!session.isPro) {
    return (
      <div className="notPremium">
        <h1>Only premium users can see the content!</h1>
        <Link href="/profile"> Got to the profile page to upgrade to premium</Link>
      </div>
    );
  }

  return (
    <div>
        <h1>Welcome to the Premium Page</h1>
        <ul>
          <li>Apple</li>
          <li>Orange</li>
          <li>Peach</li>
        </ul>
    </div>
  );
};

export default PremiumPage;