"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "@/constants/token";
import { ApiKey, BaseUrl } from "@/constants/apiConstants";

interface MemberType {
  user_id: string;
  name: string;
  email: string;
  role: string;
  metadata?: {
    name: string;
  };
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
        const accessToken = await getAccessToken();

        if (!accessToken?.value) {
          throw new Error("No access token available");
        }

        const response = await axios.get(
          `${BaseUrl}/rest/v1/get_project_members?project_id=eq.${projectId}`,
          {
            headers: {
              apikey: ApiKey,
              Authorization: `Bearer ${accessToken.value}`,
              "Content-Type": "application/json",
            },
          }
        );

        setMembers(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching project members:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch members"
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
