import Link from "next/link"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  return (
    <div>
      <div className="flex gap-4">
        <Link href={`/projects/${projectId}/dashboard`}>Dashboard</Link>
        <Link href={`/projects/${projectId}/namespaces`}>Namespaces</Link>
        <Link href={`/projects/${projectId}/tokens`}>Tokens</Link>
        <Link href={`/projects/${projectId}/settings`}>Settings</Link>
      </div>
      {children}
    </div>
  )
}
