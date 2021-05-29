import React from "react";
import { useSession } from "next-auth/client";
import Pagelayout from "../components/PageLayout";

function Home() {
  const [session, loading] = useSession();

  return (
    <Pagelayout>
      <div className="flex justify-center w-full">
        {session ? (
          <div className="text-black font-bold text-2xl m-8">
            Welcome {session.user.name} <br />
          </div>
        ) : loading ? (
          <h2>Loading...</h2>
        ) : null}
      </div>
    </Pagelayout>
  );
}

export default Home;
