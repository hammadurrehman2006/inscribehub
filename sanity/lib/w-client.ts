import "server-only"
import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId, token } from "@/sanity/env"

export const writeClient = createClient({
    apiVersion,
    dataset,
    projectId,
    token,
    useCdn: false,
});
if (!writeClient.config().token) {
    throw new Error("Missing token")
}



