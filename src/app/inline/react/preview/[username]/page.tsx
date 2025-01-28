import dynamic from "next/dynamic";

const ReactArea = dynamic(() => import("../../components/ReactAreaNew"), {
  ssr: false,
});
const Page = () => {
  return <ReactArea isPreview />;
};

export default Page;
