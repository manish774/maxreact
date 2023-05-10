import React, { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { http } from "../Services/Http";
import { AxiosResponse } from "axios";

const User = () => {
  const ctx = useContext(UserContext);
  const onLogin = async () => {
    const reqObj = {
      method: "GET",
      url: "https://api.github.com/users",
    };

    const resp: AxiosResponse<any, any> = await http(reqObj);

    const modified = resp?.data?.map((res: any) => ({
      address: res.login,
    }));

    ctx?.setUser({ name: "d", email: "test", userInfo: [...modified] });
  };

  const onLogout = () => {
    ctx?.setUser(null);
  };

  return (
    <>
      <div>
        <button onClick={onLogin}>Login</button>
      </div>
      <div>
        <button onClick={onLogout}>Logout</button>
      </div>
    </>
  );
};

export default User;
