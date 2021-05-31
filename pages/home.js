import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import Pagelayout from "../components/PageLayout";
import PostCard from "../components/PostCard";
import { getPost } from "../services/post";

export default function Home() {
  const [session, loading] = useSession();
  const [data, setData] = useState();
  const [fetching, setFetching] = useState(true);
  useEffect(async () => {
    await getPost()
      .then((data) => {
        // console.log(data);
        setData(data);
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
      });
  }, []);

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
        {fetching && <h3>Loading Data...</h3>}
        <PostCard posts={data} />
      </div>
    </Pagelayout>
  );
}

/* server side rendering */
// export async function getStaticProps(context) {
// const response = await axios.get(`http://localhost:3000/api/post/getPost`);
// const data = await response.data;
// console.log(response);
//   const res = await prisma.post.findMany({
//     select: {
//       id: true,
//       title: true,
//       link: true,
//       tags: true,
//       author: true,
//       author: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   const data = JSON.parse(JSON.stringify(res));
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: { data }, // will be passed to the page component as props
//   };
// }
