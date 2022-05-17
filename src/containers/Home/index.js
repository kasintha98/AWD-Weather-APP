import React, { useState } from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

export const Home = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const getWeather = async () => {
    try {
      if (!city) {
        toast.error("City can't be empty!");
        return;
      }

      const response = await axios.get(
        "http://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: process.env.REACT_APP_API_KEY,
            q: city,
            aqi: "yes",
          },
        }
      );

      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error(error.response?.data?.error?.message);
      toast.error(
        error.response?.data?.error?.message
          ? error.response?.data?.error?.message
          : "There was an error when getting data!"
      );
    }
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Weather App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="mt-3 mb-3">
          <Col className="col-6">
            <TextField
              id="city"
              label="Enter City"
              variant="standard"
              sx={{ width: "100%" }}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Col>
          <Col className="col-6">
            <Button variant="contained" color="success" onClick={getWeather}>
              Get Weather
            </Button>
          </Col>
        </Row>
        {data ? (
          <Row>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent>
                <Row className="align-items-center">
                  <Col>
                    <img
                      height="100px"
                      width="100px"
                      src={data.current.condition.icon}
                      alt="icon"
                    />
                  </Col>
                  <Col>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.current.condition.text}
                    </Typography>
                  </Col>
                </Row>

                <Typography variant="body2" color="text.primary">
                  Location: {`${data.location.name}, ${data.location.country}`}
                </Typography>

                <Typography variant="body2" color="text.primary">
                  Lat/ Lon: {`${data.location.lat}, ${data.location.lon}`}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Temperature: {data.current.temp_c} C
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Feels Like: {data.current.feelslike_c} C
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Humidity: {data.current.humidity}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Wind Speed: {data.current.wind_kph} kph
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Last Updated: {data.current.last_updated}
                </Typography>
              </CardContent>
            </Card>
          </Row>
        ) : null}
      </Container>
    </div>
  );
};
