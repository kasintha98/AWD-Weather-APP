import React, { useState, useEffect } from "react";
import { Navbar, Container, Tabs, Tab, Alert, Card } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";

export const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [allEmps, setAllEmps] = useState("");

  useEffect(() => {
    getAllEmployees();
  }, []);

  const addEmployee = async () => {
    try {
      if (!firstName || !lastName || !position || !email || !contactNo) {
        toast.error("Fill all the fileds!");
        return;
      }

      const employee = { firstName, lastName, position, email, contactNo };

      const response = await axios.post(
        "http://localhost:8080/api/employee/addEmployee",
        employee
      );

      console.log(response);
      toast.success("Added Successfully!");
      getAllEmployees();
      resetData();
    } catch (error) {
      console.error(error);
      toast.error("There was an error when getting data!");
    }
  };

  const getAllEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/employee/getAllEmployees"
      );

      console.log(response);
      setAllEmps(response.data);
    } catch (error) {
      console.error(error);
      toast.error("There was an error when getting data!");
    }
  };

  const resetData = () => {
    setFirstName("");
    setLastName("");
    setPosition("");
    setContactNo("");
    setEmail("");
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Employee Manager App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3 mt-3"
        >
          <Tab eventKey="home" title="Add Employee">
            <TextField
              className="mt-3"
              id="firstName"
              label="Enter First Name"
              variant="standard"
              sx={{ width: "100%" }}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              className="mt-3"
              id="lastName"
              label="Enter Last Name"
              variant="standard"
              sx={{ width: "100%" }}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <TextField
              className="mt-3"
              id="position"
              label="Enter Position"
              variant="standard"
              sx={{ width: "100%" }}
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
            />

            <TextField
              className="mt-3"
              id="email"
              label="Enter Email"
              variant="standard"
              sx={{ width: "100%" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <TextField
              className="mt-3"
              id="contactNo"
              label="Enter Contact Number"
              variant="standard"
              sx={{ width: "100%" }}
              value={contactNo}
              onChange={(e) => {
                setContactNo(e.target.value);
              }}
            />

            <Button
              className="mt-3"
              variant="contained"
              color="success"
              onClick={addEmployee}
            >
              Add Employee
            </Button>
          </Tab>
          <Tab eventKey="profile" title="Show All Employees">
            {allEmps ? (
              <>
                {allEmps.map((emp) => (
                  <Card style={{ width: "100%" }} className="mb-3" key={emp.id}>
                    <Card.Body>
                      <Card.Title>
                        {emp.firstName} {emp.lastName}
                      </Card.Title>
                      <Card.Text>
                        Position: {emp.position}
                        <br></br>
                        Contact Number: {emp.contactNo}
                        <br></br>
                        Email: {emp.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </>
            ) : (
              <Alert variant="danger">No data!</Alert>
            )}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};
