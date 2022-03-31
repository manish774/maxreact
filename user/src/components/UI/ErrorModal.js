import React from "react";
import Card from "./Card";
import classes from "./ErrorModal.module.css";
import Button from "./Button";
import ReactDOM from "react-dom";
const Backdrop = props =>{
  return <div className={classes.backdrop} onClick={props.onCloseModal}></div>
}

const ModalOverlay = props =>{
  return <Card className={classes.modal}>
  <header className={classes.header}>
    <h2>{props.title}</h2>
  </header>
  <div className={classes.content}>
    <p>{props.message}</p>
  </div>
  <footer className={classes.actions}>
    <Button type="submit" onClick={props.onCloseModal}>Okay</Button>
  </footer>
</Card>
}
const ErrorModal = (props) => {
    const closeModal = () =>{
        props.onCloseModal();
    }
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onCloseModal={props.onCloseModal}/>,document.getElementById("backdrop-root"))}
      {ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onCloseModal={props.onCloseModal}/>,document.getElementById("modal-root"))}
    </React.Fragment>
  );
};

export default ErrorModal;
