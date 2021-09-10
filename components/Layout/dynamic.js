import dynamic from "next/dynamic";

export const DynamicZoom = dynamic(() => import("./zoomContext"), {
  ssr: false,
});
