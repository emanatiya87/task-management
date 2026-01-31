"useClient";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { epicType } from "@/types/epic";

export function useEpics(projectId: string, refetchTrigger?: any) {
  const [epics, setEpics] = useState<epicType[]>([]);
  const [loadingEpics, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (refetchTrigger) return;
    async function getEpics() {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/rest/v1/project_epics?project_id=eq.${projectId}`,
        );
        setEpics(res.data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("Something went wrong, try again");
        }
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      getEpics();
    }
  }, [projectId, refetchTrigger]);

  return { epics, loadingEpics, errorMsg };
}
