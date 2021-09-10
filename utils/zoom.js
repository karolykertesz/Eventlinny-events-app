import { ZoomMtg } from "@zoomus/websdk";
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
const API_KEY = process.env.NEXT_PUBLIC_ZOOM_KEY;
