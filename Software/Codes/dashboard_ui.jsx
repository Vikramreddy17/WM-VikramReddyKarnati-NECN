import React, { useEffect, useState } from "react";

function Dashboard() {
  const [bins, setBins] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchBins();
    fetchAlerts();

    const interval = setInterval(() => {
      fetchBins();
      fetchAlerts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchBins = async () => {
    const res = await fetch("http://localhost:5000/api/bin-data");
    const data = await res.json();
    setBins(data);
  };

  const fetchAlerts = async () => {
    const res = await fetch("http://localhost:5000/api/alerts");
    const data = await res.json();
    setAlerts(data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🗑️ Smart Waste Bin Dashboard</h2>

      <h3>📊 Live Bin Status</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Fill %</th>
            <th>Weight (kg)</th>
            <th>Zone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: bin.level > 80 ? "#ffcccc" : "white"
              }}
            >
              <td>{bin.id}</td>
              <td>{bin.level}%</td>
              <td>{bin.weight ?? "N/A"}</td>
              <td>{bin.zone}</td>
              <td>{bin.lat}, {bin.lon}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "30px" }}>🚨 Critical Alerts</h3>
      {alerts.length === 0 && <p>No critical bins</p>}

      {alerts.map((bin, index) => (
        <div
          key={index}
          style={{
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid red"
          }}
        >
          <strong>{bin.id}</strong> — Fill: {bin.level}% | Weight: {bin.weight} kg
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
