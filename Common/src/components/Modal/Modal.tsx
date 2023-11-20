import React, { useState } from "react";

interface ModalState {
  isDialogOpen: boolean;
}

const Modal = (props: ModalState) => {
  // const [isDialogOpen, setIsDialogOpen] = useState(props?.isDialogOpen);

  return (
    <div>
      {props?.isDialogOpen && (
        <dialog open={props?.isDialogOpen}>
          <p>This is a React dialog box.</p>
          {/* <button onClick={closeDialog}>Close</button> */}
        </dialog>
      )}
    </div>
  );
};

export default Modal;
