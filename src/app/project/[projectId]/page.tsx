export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = await params; // unwrap the ReactPromise
  return <>details {resolvedParams.projectId}</>;
}
