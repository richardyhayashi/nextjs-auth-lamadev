'use server'

import { sessionOptions, SessionData, defaultSession } from "@/lib/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let username = "john";
let isPro = true;
let isBlocked = true;

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  session.isBlocked = isBlocked;
  session.isPro = isPro;

  return session;
}

export const login = async (prevState: {error: undefined | string}, formData: FormData) => {
    const session = await getSession();

    const formUsername = formData.get("username") as string;
    const formPassword = formData.get("password") as string;

    console.log(formUsername);

    if (formUsername !== username) {
        return {error: "Wrong Credentials!"};
    }

    session.userId = "1";
    session.userName = formUsername;
    session.isPro = isPro;
    session.isLoggedIn = true;

    await session.save();
    redirect("/");
}

export const logout = async () => {
  const session = await getSession();

  session.destroy();
  redirect("/");
}

export const changePremium = async () => {
    const session = await getSession();

    isPro = !session.isPro;
    console.log(isPro);
    session.isPro = isPro;
    await session.save();
    revalidatePath("profile");
}

export const changeUsername = async (formData: FormData) => {
    const session = await getSession();

    const newUsername = formData.get("username") as string;

    username = newUsername;

    session.userName = newUsername;
    await session.save();
    revalidatePath("profile");
}