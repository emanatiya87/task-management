import apiClient from "@/lib/apiClient";
export async function updateEpic(epicId: string, data: EpicUpdateForm) {
  return apiClient.patch(`/rest/v1/epics?id=eq.${epicId}`, data, {
    headers: {
      Prefer: "return=representation",
    },
  });
}
