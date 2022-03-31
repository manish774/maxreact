import React, { useState ,Ref, useRef} from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import Wrapper from "../Helper/Wrapper";
const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [error, setError] = useState();

  const userNameref = useRef('');
  const userAgref = useRef('');

  const addUserHandler = (e) => {
    e.preventDefault();
    //
      console.log(userNameref.current.value,"ref");
      console.log(userAgref.current.value,"refage");
    //
    if (userName.trim().length === 0 && userAge === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter username and Age",
      });
      return;
    }
    if (+userAge < 1) {
      setError({
        title: "Invalid Input",
        message: "Please enter valid Age (>0)",
      });
      return;
    }
    props.onAddUser(userName, userAge);
    setUserAge(0);
    setUserName("");
  };
  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const userAgeHandler = (e) => {
    setUserAge(e.target.value);
  };
  const closeModal = (props) => {
    setError();
  };
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          content="Hello Error"
          message={error.message}
          onCloseModal={closeModal}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onInput={userNameChangeHandler}
            value={userName}
            ref={userNameref}
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            onInput={userAgeHandler}
            value={userAge}
            ref={userAgref}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
