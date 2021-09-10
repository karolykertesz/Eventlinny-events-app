import dynamic from "next/dynamic";

const DynamicZoom = dynamic(() => import("../meetings-main"), {
  ssr: false,
});
export default DynamicZoom;
