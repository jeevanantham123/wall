import React from "react";
import { useSession } from "next-auth/client";
import Pagelayout from "../components/PageLayout";
import axios from "axios";
import PostCard from "../components/PostCard";

function Home({ data }) {
  const [session, loading] = useSession();
  return (
    <Pagelayout>
      <div className="flex flex-col items-center w-full">
        {session ? (
          <div className="text-black font-bold text-2xl m-8">
            Welcome {session.user.name} <br />
          </div>
        ) : loading ? (
          <h2>Loading...</h2>
        ) : null}
        <PostCard posts={data} />
      </div>
    </Pagelayout>
  );
}
export async function getStaticProps(context) {
  const res = await axios.get(`/api/post/getPost`);
  const data = await res.data;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Home;
