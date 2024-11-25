import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(res.data.message);
      } catch (error) {
        alert("Access denied: " + error.response.data.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <p>{data}</p>
    </div>
  );
};

export default Dashboard;
