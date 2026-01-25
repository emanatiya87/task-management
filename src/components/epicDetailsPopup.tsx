"use client";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FaRegUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { formatDate } from "@/utils/dateFormatter";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import Loading from "@/app/loading";
import type { RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenEpicDetailsModal } from "@/state/features/epicDetailsModal/epicDetailsModalSlice";
interface ProjectType {
  id: string;
  epic_id: string;
  title: string;
  description: string;
  created_at: string;
  assignee?: User;
  created_by?: User;
}
interface User {
  sub: string;
  name: string;
}
export default function EpicPopup({
  epicId,
  projectId,
}: {
  epicId: string;
  projectId: string;
}) {
  const tasks = null;
  const openModalValue = useSelector(
    (state: RootState) => state.isOpenEpicDetailsModal.value,
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [epic, setEpic] = useState<ProjectType | null>(null);
  useEffect(() => {
    async function getEpics() {
      if (!openModalValue) return;
      setLoading(true);
      setEpic(null);
      try {
        const res = await apiClient.get(
          `/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
        );
        setEpic(res.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getEpics();
  }, [openModalValue]);
  return (
    <>
      <Modal
        show={openModalValue}
        onClose={() => dispatch(setIsOpenEpicDetailsModal(false))}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <ModalHeader className="border-b-0 ">
              <p className="text-gray-500 text-[14px]">
                Project/{epic?.epic_id}
              </p>
            </ModalHeader>
            <ModalBody className="mt-0  pt-0">
              <h2 className="textStyle text-xl font-bold capitalize mb-3">
                {epic?.title}
              </h2>

              <div className=" inline-grid grid-cols-[auto_auto] gap-x-6 gap-y-2  ">
                <p className="flex items-center text-gray-700 gap-2">
                  <FaRegUser className="text-gray-700" />
                  <span>Created By </span>
                </p>
                <p>
                  <span>M</span> <span>{epic?.created_by?.name}</span>
                </p>
                <p className="flex items-center text-gray-700 gap-2">
                  <FaRegUserCircle className="text-gray-700" />
                  <span>Assignee </span>
                </p>
                {epic?.assignee?.name ? (
                  <p>
                    <span>M</span> <span>{epic?.assignee?.name}</span>
                  </p>
                ) : (
                  <>Unassigned</>
                )}
                <p className="flex items-center text-gray-700 gap-2">
                  <SlCalender className="text-gray-700" />
                  <span>Created At </span>
                </p>
                <p>{epic ? formatDate(epic.created_at) : ""}</p>
              </div>
              <hr className="text-gray-400 my-3.5" />
              <h3 className=" mb-5 font-semibold textStyle">Description</h3>
              {epic?.description ? (
                <p className="textStyle">{epic?.description}</p>
              ) : (
                <p className="font-semibold"> No description provided</p>
              )}
              <hr className="text-gray-400 my-3.5" />
              <h3 className=" mb-5 font-semibold textStyle">Tasks</h3>
              <div>
                {tasks ? (
                  <p className="textStyle">Tasks</p>
                ) : (
                  <div className=" py-10 flex flex-col gap-2 items-center justify-center">
                    <p className=" textStyle font-bold ">
                      No tasks have been added to this epic yest
                    </p>
                    <Button>Create New Tasks</Button>
                  </div>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </Modal>
    </>
  );
}
