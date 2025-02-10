// App.js
import React, { useState } from "react";
import axios from "axios";
import SearchMissing from "./components/SearchMissing";
import RegisterForm from "./components/RegisterForm";
import ChangeForm from "./components/ChangeForm";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    description: "",
    contact: "",
    image: "",
  });
  const [search, setSearch] = useState({ name: "", age: "" });
  const [results, setResults] = useState([]);
  const [formChange, setFormChange] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://findyourlostmini.up.railway.app/api/missing", formData);
      alert("Report submitted successfully");
      setFormData({
        name: "",
        age: "",
        description: "",
        contact: "",
        image: "",
      });
    } catch (error) {
      alert("Error submitting report");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://findyourlostmini.up.railway.app/api/missing", {
        params: search,
      });
      setResults(response.data);
    } catch (error) {
      alert("Error searching");
    }
  };

  const markAsFound = async (id) => {
    try {
      await axios.put(`https://findyourlostmini.up.railway.app/api/missing/${id}/found`);
      alert("Family has been notified");
      setResults(results.filter((person) => person._id !== id));
    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <div className="m-5">
      <h1 className="text-4xl font-bold mb-4 text-center">Missing Persons Registry</h1>
      <ChangeForm setFormChange={setFormChange} />
      <>
        {!formChange ? (
          <RegisterForm
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <SearchMissing
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
            markAsFound={markAsFound}
            results={results}
          />
        )}
      </>
    </div>
  );
}

export default App;
