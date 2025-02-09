import React from "react";

const RegisterForm = ({handleSubmit,formData,setFormData}) => {
  return (
    <div className="container mx-auto">
      {/* Report Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Report Missing Person</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Description and your contact"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email Where We Contact"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
