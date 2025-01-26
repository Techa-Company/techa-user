import dynamic from "next/dynamic";

const ReactArea = dynamic(() => import("../../_components/ReactAreaNew"), {
  ssr: false,
});
const Page = () => {
  return <ReactArea isPreview />;
};

export default Page;
