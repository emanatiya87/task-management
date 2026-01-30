"use client";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FaRegUser } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { formatDate } from "@/utils/dateFormatter";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import Loading from "@/app/loading";
import Avatar from "./avatar";
import ToastComponent from "./toast";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  // update
  const schema = z.object({
    title: z.string().min(3, "the title should be min 3 chars"),
    description: z.string().max(500).optional(),
  });
  type EpicInputs = z.infer<typeof schema>;
  const [errorMsg, setErrorMsg] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EpicInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: epic?.title,
      description: epic?.description,
    },
  });
  useEffect(() => {
    if (epic) {
      reset({
        title: epic.title,
        description: epic.description,
      });
    }
  }, [epic, reset]);
  const onSubmit: SubmitHandler<EpicInputs> = async (data) => {
    setErrorMsg("");
    // Send a Patch request
    try {
      await apiClient.patch(`/rest/v1/epics?id=eq.${epicId}`, {
        title: data.title,
        description: data.description,
        // assignee_id: "user-id"||null,
        deadline: "2026-01-30",
      });
      setAddedSuccessfully(true);
      // Auto hide after 3 seconds
      setTimeout(() => {
        setAddedSuccessfully(false);
      }, 3000);
    } catch (error) {
      setErrorMsg("Failed to edit Epic: " + error);
    }
  };
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
            {epic ? (
              <>
                <ModalHeader className="border-b-0 ">
                  <p className="text-gray-500 text-[14px]">
                    Project/{epic.epic_id}
                  </p>
                </ModalHeader>
                <form onBlur={handleSubmit(onSubmit)}>
                  <ModalBody className="mt-0  pt-0">
                    <div>
                      <input
                        {...register("title")}
                        className="textStyle text-xl font-bold capitalize mb-3"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className=" inline-grid grid-cols-[auto_auto] gap-x-6 gap-y-2  ">
                      <p className="flex items-center text-gray-700 gap-2">
                        <FaRegUser className="text-gray-700" />
                        <span>Created By </span>
                      </p>
                      {epic.created_by?.name ? (
                        <p className="flex items-center">
                          <Avatar name={epic.created_by.name} />
                          <span>{epic.created_by.name}</span>
                        </p>
                      ) : (
                        <></>
                      )}

                      <p className="flex items-center text-gray-700 gap-2">
                        <FaRegUserCircle className="text-gray-700" />
                        <span>Assignee </span>
                      </p>
                      {epic.assignee?.name ? (
                        <p className="flex items-center">
                          <Avatar name={epic.assignee?.name} />{" "}
                          <span>{epic.assignee?.name}</span>
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
                    <h3 className=" mb-5 font-semibold textStyle">
                      Description
                    </h3>
                    {epic.description ? (
                      <div>
                        <textarea
                          {...register("description")}
                          rows={3}
                          className="textStyle w-full resize-none overflow-hidden"
                          onInput={(e) => {
                            const el = e.currentTarget;
                            el.style.height = "auto";
                            el.style.height = `${el.scrollHeight}px`;
                          }}
                        />

                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
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
                    <p className="text-red-500 text-sm mt-1 text-center">
                      {errorMsg}
                    </p>

                    <ToastComponent
                      message="Epic Edited successfully"
                      appear={addedSuccessfully}
                    />
                  </ModalBody>
                </form>
              </>
            ) : (
              <>
                <button
                  onClick={() => dispatch(setIsOpenEpicDetailsModal(false))}
                >
                  close
                </button>
                no epic selected!! try again{" "}
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
