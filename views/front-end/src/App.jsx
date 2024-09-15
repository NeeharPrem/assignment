import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Card, Alert, Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [projectionData, setProjectionData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);

  const fetchRevenueAndProjectionData = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    try {
      setError(null);
      const revenueResponse = await axios.get("http://localhost:3000/api/revenue", {
        params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      });
      const projectionResponse = await axios.get("http://localhost:3000/api/projection", {
        params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      });

      const revenue = revenueResponse.data;
      const projection = projectionResponse.data;

      const revenueMonths = revenue.map(item => item.month);
      const revenueValues = revenue.map(item => item.total_revenue);
      const projectionMonths = projection.map(item => item.month);
      const projectionValues = projection.map(item => item.projected_revenue);

      const allMonths = [...new Set([...revenueMonths, ...projectionMonths])].sort();

      const revenueData = allMonths.map(month => {
        const data = revenue.find(item => item.month === month);
        return data ? data.total_revenue : null;
      });

      const projectionData = allMonths.map(month => {
        const data = projection.find(item => item.month === month);
        return data ? data.projected_revenue : null;
      });

      setLabels(allMonths);
      setRevenueData(revenueData);
      setProjectionData(projectionData);

    } catch (error) {
      console.error("Error fetching revenue data", error);
      setError("An error occurred while fetching data. Please try again.");
    }
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueData,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Projected Revenue",
        data: projectionData,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue and Projection Data",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Header>
          <Card.Title as="h2">Revenue Analysis and Projections</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button onClick={fetchRevenueAndProjectionData} variant="primary">
            Fetch Data
          </Button>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mb-4">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {labels && labels.length > 0 ? (
        <Card>
          <Card.Body>
            <Line data={chartData} options={options} />
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">
          No data available. Please select a date range and fetch data.
        </Alert>
      )}
    </Container>
  );
};

export default App;