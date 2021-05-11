import { getProviders, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import github from "../images/github.png";

export default function SignIn({ providers }) {
  const router = useRouter();
  return (
    <div className="min-h-screen justify-center items-center w-full flex">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="border-2 rounded-md p-10 focus:outline-none border-black flex justify-between items-center"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: router.query.callbackUrl + "home",
              })
            }
          >
            <>
              {provider.id === "github" && (
                <img
                  src={github}
                  alt={provider.id}
                  className="w-34 h-34 mr-4"
                />
              )}
            </>
            <div>Sign in with {provider.name}</div>
          </button>
        </div>
      ))}
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
