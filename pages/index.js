import { signIn, useSession } from "next-auth/client";
import Router from "next/router";
import { useEffect } from "react";

export default function Page() {
  const [session, loading] = useSession();
  useEffect(() => {
    if (session && !loading) {
      Router.push("/home");
    }
  });
  return (
    <div className="flex justify-center items-center min-h-screen w-full flex-col gap-4">
      {!session && !loading ? (
        <>
          Not signed in <br />
          <button
            onClick={() => signIn()}
            className="border-2 rounded-md  focus:outline-none border-black flex justify-center items-center h-40 w-200"
          >
            Sign in
          </button>
        </>
      ) : (
        loading && <h1>Loading..</h1>
      )}
    </div>
  );
}
