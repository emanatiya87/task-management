"use client";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

interface MemberType {
  user_id: string;
  name: string;
  email: string;
  role: string;
  metadata?: {
    name: string;
  };
  member_id: string;
}

export default function useProjectMembers(projectId: string) {
  const [members, setMembers] = useState<MemberType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      console.error("projectId is undefined or empty");
    }
    async function getMembers() {
      try {
        setLoading(true);

        const response = await apiClient.get(
          `/rest/v1/get_project_members?project_id=eq.${projectId}`,
        );
        setMembers(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching project members:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch members",
        );
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }

    getMembers();
  }, [projectId]);

  return { members, loading, error };
}
