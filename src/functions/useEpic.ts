"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import type { epicType } from "@/types/epic";

export function useEpic(projectId: string, epicId: string, enabled = true) {
  const [epic, setEpic] = useState<epicType | null>(null);
  const [fullLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !projectId || !epicId) return;

    async function fetchEpic() {
      try {
        setLoading(true);
        setError(null);
        const res = await apiClient.get(
          `/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
        );
        setEpic(res.data[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load epic");
      } finally {
        setLoading(false);
      }
    }

    fetchEpic();
  }, [projectId, epicId, enabled]);

  return { epic, fullLoading, error, setEpic };
}
