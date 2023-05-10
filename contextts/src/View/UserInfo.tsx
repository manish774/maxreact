import React, { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { userInfo } from "os";
const UserInfo = () => {
  const ctx = useContext(UserContext);
  const userMap = ctx?.user?.userInfo.map((o) => <p>{o.address}</p>);
  return (
    <div>
      {ctx?.user && <p>{}</p>}
      {ctx?.user?.userInfo ? (
        <>Address: {userMap}</>
      ) : (
        <div>No Info Available</div>
      )}
    </div>
  );
};

export default UserInfo;
