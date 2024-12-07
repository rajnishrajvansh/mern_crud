import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete=(id)=>{
    axios.delete('http://localhost:3001/deleteUser/'+id)
    .then(res=>{console.log(res)
        window.location.reload()
    })
    .catch(err=>console.log(err))
  }

  return (
    <div className="d-flex vh-100 vw-100 bg-dark justify-content-center align-items-center">
      <div className="w-90 bg-white rounded p-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`/update/${user._id}`}>
                      <button className="bg-warning rounded">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button className="bg-danger rounded" onClick={(e)=>handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <Link to="/create">
            <button className="bg-success rounded">Add</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Users;
