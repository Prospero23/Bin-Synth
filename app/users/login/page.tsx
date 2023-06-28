import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (


      <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
      <LoginForm />

    </div>
  );
}
//move home to closer to top right and then make google button bigger and have some type of is loading state 

//      <div className="flex items-center mt-3">
{/* <p className="inline mr-2">Don't have an account?</p>
<Link href="/posts" className=" hover:bg-sky-500 hover:rounded-md p-1 hover:text-black">
  SIGN UP
</Link>
</div> */}