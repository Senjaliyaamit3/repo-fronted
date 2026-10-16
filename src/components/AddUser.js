import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Validation
  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{6,15}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Phone must be 6 to 15 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 3) {
      newErrors.address = "Address must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file || null);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const data_form = new FormData();

      data_form.append("name", formData.name);
      data_form.append("email", formData.email);
      data_form.append("password", formData.password);
      data_form.append("phone", formData.phone);
      data_form.append("address", formData.address);

      if (image) {
        data_form.append("image", image);
      }

      const response = await axios.post(
        "https://diva-repo-1.onrender.com/api/add-user",
        data_form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data) {
        alert(response.data.message || "User added successfully");
        navigate("/dashboard");
      } else {
        alert(response.data.message || "Failed to add user");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(
          error.response.data.message ||
          error.response.data.errorMessage ||
          "Something went wrong"
        );
      } else {
        alert("Unable to connect to server");
      }
    }
  };

  // Cancel
  const handleCancel = () => {
    navigate("/dashboard");
  };

  // Input class
  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add User
          </h2>

          <button
            type="button"
            onClick={handleCancel}
            className="text-sm text-blue-600 hover:underline"
          >
            &larr; Back to list
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="add-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>

            <input
              type="text"
              id="add-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass("name")}
              placeholder="Enter full name"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="add-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>

            <input
              type="email"
              id="add-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email")}
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              htmlFor="add-phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>

            <input
              type="text"
              id="add-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass("phone")}
              placeholder="Enter phone number"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="add-address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>

            <input
              type="text"
              id="add-address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClass("address")}
              placeholder="Enter address"
            />

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="add-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>

            <input
              type="password"
              id="add-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass("password")}
              placeholder="Enter password"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="mb-6">
            <label
              htmlFor="add-image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image
            </label>

            <input
              type="file"
              id="add-image"
              name="image"
              onChange={handleImageChange}
              className={inputClass("image")}
              accept="image/*"
            />

            {preview && (
              <img
                src={preview}
                alt="Image preview"
                width="100"
                className="mt-2 rounded-md"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Add User
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddUser;