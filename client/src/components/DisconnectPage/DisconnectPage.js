import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./disconnectPage.css";
import { SERVER_URL } from "../../config";

const DisconnectPage = () => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
        const res = await fetch(`${SERVER_URL}/userdata`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken"),
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log(`Logged in as ${data.name}`);
    } catch (error) {
      alert("Internal Server Error");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <section className="delete-disconnectpage">
        <div className="delete-disconnect-box">
          <div className="form-value">
            <h2 className="delete-disconnect-text">
              Facebook Page Integration
            </h2>

            <h3 className="integration-text">
              Integrated Page: <b>{pid}</b>
            </h3>

            <div className="delete">
              <input
                type="submit"
                value="Delete Integration"
                onClick={() => navigate("/connectfb")}
              />
            </div>

            <div className="reply">
              <input
                type="submit"
                value="Reply To Messages"
                onClick={() => navigate("/agent")}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DisconnectPage;
