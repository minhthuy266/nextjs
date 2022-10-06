import { authApi } from "./../api-client/auth-api";
import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate,
  } = useSWR("/profile", {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
  });

  async function login() {
    await authApi.login({
      username: "test1",
      password: "262626",
    });

    mutate();
  }

  async function logout() {
    await authApi.logout();

    mutate({}, false);
  }

  return {
    profile,
    error,
    login,
    logout,
  };
}
