import { useContext, createContext, useState, useEffect, useRef } from "react";
import ZoomVideo from "@zoom/videosdk";
const ZoomContext = createContext(null);
const zoomClient = ZoomVideo.createClient();
export default ZoomeProvider = ({ children }) => {
  //   const modeRef = useRef(true);
  //   const [zoomClient, setZoom] = useState(null);
  //   useEffect(() => {
  //     if (modeRef.current) {
  //       const client = ZoomVideo.createClient();
  //       setZoom(client);
  //     }
  //     return () => {
  //       modeRef.current = false;
  //     };
  //   }, []);
  return (
    <ZoomContext.Provider value={zoomClient}>{children}</ZoomContext.Provider>
  );
};
// export default Zoom = () => useContext(ZoomContext);
