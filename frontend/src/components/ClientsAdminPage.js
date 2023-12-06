import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "../axios";
import Loading from "./Loading";
function ClientsAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/user")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length == 0)
    return <h2 className="py-2 text-center">No users yet</h2>;

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>Client Id</th>
          <th>Client Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <Button>Suspend</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return <div>ClientsAdminPage</div>;
}

export default ClientsAdminPage;
