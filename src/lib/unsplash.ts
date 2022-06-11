import { createApi } from "unsplash-js"
import { config } from "../config"
import { fetch } from "undici"

export const unsplash = createApi({
  accessKey: config.get("unsplashAccessKey"),
  // TODO: Reference native fetch when Node.js v17 is stable
  fetch,
  apiUrl: "https://api.unsplash.com/",
})
