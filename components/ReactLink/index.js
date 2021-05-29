import dynamic from "next/dynamic";

const ReactTinyLink = dynamic(
  () => import("react-tiny-link").then((mod) => mod.ReactTinyLink),
  { ssr: false }
);

export default ReactTinyLink;
