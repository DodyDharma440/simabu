import { makeHandler } from "@/common/utils/api-route";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env["NEXT_PUBLIC_IMAGEKIT_URL"]!,
  publicKey: process.env["NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY"]!,
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"]!,
});

export default makeHandler(() => ({
  GET: async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  },
}));
