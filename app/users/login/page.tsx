import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Link
        href="/posts"
        className="bg-gray-100 text-black btn hover:bg-sky-500"
      >
        Home
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <LoginForm />
      <p>Don't have an account?</p>
      <Link
        href="/posts"
        className="bg-gray-100 text-black btn hover:bg-sky-500"
      >
        Create account
      </Link>
    </div>
  );
}
//move home to closer to top right and then make google button bigger and have some type of is loading state 