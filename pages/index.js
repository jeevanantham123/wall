import { signIn, signOut, useSession } from "next-auth/client";

export default function Page() {
  const [session, loading] = useSession();
  return (
    <div className="flex justify-center items-center min-h-screen w-full flex-col gap-4">
      {!session && (
        <>
          Not signed in <br />
          <button
            onClick={() => signIn()}
            className="border-2 rounded-md  focus:outline-none border-black flex justify-center items-center h-40 w-200"
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <div className="text-black font-bold text-lg">
          Signed in as {session.user.name} <br />
          <button
            className="border-2 rounded-md  focus:outline-none border-black flex justify-center items-center h-40 w-200"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
      {loading && <p>Loading ...</p>}
    </div>
  );
}
