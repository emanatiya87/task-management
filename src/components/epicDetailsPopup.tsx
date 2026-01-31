import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import Loading from "@/app/loading";
import type { RootState } from "@/state/store";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenEpicDetailsModal } from "@/state/features/epicDetailsModal/epicDetailsModalSlice";
import FormEditEpic from "./forms/fromEditEpic";
import { useEpic } from "@/functions/useEpic";
export default function EpicPopup({
  epicId,
  projectId,
}: {
  epicId: string;
  projectId: string;
}) {
  const openModalValue = useSelector(
    (state: RootState) => state.isOpenEpicDetailsModal.value,
  );
  const dispatch = useDispatch();

  const { epic, fullLoading, error } = useEpic(
    projectId,
    epicId,
    openModalValue,
  );
  return (
    <>
      <Modal
        show={openModalValue}
        onClose={() => dispatch(setIsOpenEpicDetailsModal(false))}
      >
        {fullLoading ? (
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
                <ModalBody className="mt-0  pt-0">
                  <FormEditEpic projectId={projectId} epicId={epicId} />
                </ModalBody>
              </>
            ) : (
              <>
                <button
                  onClick={() => dispatch(setIsOpenEpicDetailsModal(false))}
                >
                  close
                </button>
                <span className="text-red-600">
                  Error: {error} , try again!!
                </span>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
}
