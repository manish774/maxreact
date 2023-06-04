import React, { useEffect, useMemo, useState } from "react";
import Table from "../components/Table/Table";
import axios from "axios";
import { BulletList } from "react-content-loader";
interface UserAttributes {
  id: string;
  type: string;
}
interface UserProps {
  data: UserAttributes[];
}
const UserTable = () => {
  const [users, setUsers] = useState<UserAttributes[]>();
  const [isLoading, setLoading] = useState<boolean>(true);
  //   const [selectedUsers, setSelectedUsers] = useState();
  useEffect(() => {
    axios
      .get("https://api.github.com/events")
      .then((response: any) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [isLoading]);

  const columns = [
    {
      name: "id",
      id: "id",
    },
    {
      name: "type",
      id: "type",
    },
  ];
  const checkBoxClicked = (e: any) => {
    console.log(e);
  };
  const config = useMemo(() => {
    return {
      data: users,
      columns: columns,
      checkBox: true,
      onCheck: checkBoxClicked,
    };
  }, [users, columns, checkBoxClicked]);
  return <>{!isLoading ? <Table {...config} /> : <BulletList />}</>;
};

export default UserTable;
