import React from "react";

const LargeImageModal = ({ urlImage, openModal, setOpenModal }) => {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center outline-none focus:outline-none ">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div className="relative rounded-lg ">
            <div className="">
              <img alt="" className="rounded-3xl max-h-[680px]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LargeImageModal;
