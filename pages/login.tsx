import { useAuth } from "../hooks";

export default function LoginPage() {
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false,
  });

  async function handleLoginClick() {
    try {
      await login();

      console.log("REDIRECT TO DASHBOARD");
    } catch (error) {
      console.log("Failed to login", error);
    }
  }

  async function handleLogoutClick() {
    try {
      await logout();

      console.log("REDIRECT TO LOGIN PAGE");
    } catch (error) {
      console.log("Failed to logout", error);
    }
  }

  return (
    <div>
      <div>Login Page</div>

      <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
