import { permanentRedirect } from "next/navigation"

export default async function Page({
  params: { projectId },
}: {
  params: { projectId: string }
}) {
  permanentRedirect(`/projects/${projectId}/dashboard`)
}
