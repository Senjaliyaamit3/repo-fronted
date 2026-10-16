import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  // Get all users
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://diva-repo-1.onrender.com/api/get-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data) {
        setUsers(response.data.data);
      } else {
        setUsers([]);
        alert(response.data.message || "No users found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add user
  const handleAddUser = () => {
    navigate("/users/add");
  };

  // Edit user
  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `https://diva-repo-1.onrender.com/api/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data) {
        alert("User deleted successfully");
        getUserData();
      } else {
        alert(response.data.message || "Failed to delete user");
      }
    } catch (error) {
      console.log(error.message);

      alert(
        error.response?.data?.message ||
        error.response?.data?.errorMessage ||
        "Unable to delete user"
      );
    }
  };

  // Logout
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            User List
          </h1>

          <div className="flex gap-3">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
              onClick={handleAddUser}
            >
              + Add User
            </button>

            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
              onClick={handlelogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">

            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  #
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Image
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Name
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Phone
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  Address
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50"
                  >
                    {/* Number */}
                    <td className="px-4 py-3 text-sm text-gray-700 border-b">
                      {index + 1}
                    </td>

                    {/* Image */}
                    <td className="px-4 py-3 border-b">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No image
                        </span>
                      )}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3 text-sm text-gray-700 border-b">
                      {user.name}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-sm text-gray-700 border-b">
                      {user.email}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3 text-sm text-gray-700 border-b">
                      {user.phone}
                    </td>

                    {/* Address */}
                    <td className="px-4 py-3 text-sm text-gray-700 border-b">
                      {user.address}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-sm border-b">
                      <div className="flex justify-center gap-2">

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleEdit(user._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;