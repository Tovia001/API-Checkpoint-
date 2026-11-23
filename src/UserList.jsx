import { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setListOfUsers(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className="container">
      <h1>User Directory</h1>

      <input
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.map((user) => (
        <div
          className="user-card"
          key={user.id}
          onClick={() =>
            setSelectedUser(
              selectedUser?.id === user.id ? null : user
            )
          }
        >
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Company: {user.company.name}</p>

          {selectedUser?.id === user.id && (
            <div className="user-details">
              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
              <p>Street: {user.address.street}</p>
              <p>City: {user.address.city}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserList;
