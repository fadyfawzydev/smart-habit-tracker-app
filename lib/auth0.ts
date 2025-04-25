import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();

export const getSession = async () => {
  return await auth0.getSession();
};

export const getUser = async () => {
  return await auth0.getSession().then((session) => session?.user);
};
