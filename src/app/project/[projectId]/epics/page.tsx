"use client";
import { use, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";
import { formatDate } from "@/utils/dateFormatter";
import Loading from "@/app/loading";
import { Button } from "flowbite-react";
import Avatar from "@/components/avatar";
import EpicPopup from "@/components/epicDetailsPopup";
import type { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenEpicDetailsModal } from "@/state/features/epicDetailsModal/epicDetailsModalSlice";
import { useEpics } from "@/functions/useEpics";
export default function Epics({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const dispatch = useDispatch();
  const openModalValue = useSelector(
    (state: RootState) => state.isOpenEpicDetailsModal.value,
  );
  const [epicId, setEpicId] = useState("");
  const { projectId } = use(params);
  const { epics, loadingEpics, errorMsg } = useEpics(projectId, openModalValue);
  if (errorMsg) {
    return (
      <p className="text-center">
        <b className="text-red-700">{errorMsg}</b>
      </p>
    );
  } else {
    return (
      <>
        {loadingEpics ? (
          <Loading />
        ) : epics ? (
          <>
            <h2 className="mb-3 text-gray-600 text-xl font-semibold">
              <Link href={"/project"}>Project</Link>/ {projectId}/ Epics
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 w-full flex flex-col gap-4 overflow-x-auto md:overflow-visible">
              {epics.length > 0 ? (
                <>
                  {epics.map((epic) => (
                    <div
                      key={epic.id}
                      className="cursor-pointer min-w-[700px] md:min-w-0 shadow-2xl p-3 rounded-2xl flex justify-between items-center"
                      onClick={() => {
                        dispatch(setIsOpenEpicDetailsModal(true));
                        setEpicId(epic.id);
                      }}
                    >
                      <div className="flex textStyle items-center gap-1">
                        <FaRegLightbulb />
                        <div className="flex flex-col ">
                          <strong>{epic.title}</strong>
                          <p className="text-gray-500">
                            {epic.epic_id} Opened By{" "}
                            <b>{epic.created_by?.name}</b>
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-600 font-semibold dark:text-gray-300">
                        <p>Created At</p>
                        <div className="flex justify-between items-center gap-1">
                          <SlCalender /> <p>{formatDate(epic.created_at)}</p>
                        </div>
                      </div>
                      {epic?.assignee?.name ? (
                        <div className="flex gap-0.5 items-center ">
                          <Avatar name={epic?.assignee?.name} />
                          <p className="textStyle font-semibold">
                            {epic?.assignee?.name}
                          </p>
                        </div>
                      ) : (
                        <div className=" flex items center gap-1">
                          <Avatar name="?" />
                          <p className="textStyle font-semibold">Unassigned</p>
                        </div>
                      )}

                      <FaEllipsisVertical className="cursor-pointer textStyle" />
                    </div>
                  ))}
                  <EpicPopup epicId={epicId} projectId={projectId} />
                </>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 w-full flex flex-col items-center justify-center gap-4 h-1/2">
                  <h2 className="textStyle text-2xl font-semibold">
                    You don't have any epics yet.
                  </h2>

                  <Button>
                    <Link href={`/project/${projectId}/epics/new`}>
                      Create New Epic
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <b className="text-red-700">
              error accord , check connnection and try Again
            </b>
          </>
        )}
      </>
    );
  }
}
