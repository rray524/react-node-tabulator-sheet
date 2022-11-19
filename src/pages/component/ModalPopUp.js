import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsPencilSquare } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModalPopUp = (props) => {

  // modal local state
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)

  };

  // assign form elements value from props
  const [firstName, setFirstName] = useState(props.fname);
  const [middleName, setMiddleName] = useState(props.mname);
  const [lastName, setLastName] = useState(props.lname);
  const [doj, setDoj] = useState(props.doj);
  const [department, setDepartment] = useState(props.department);
  const [salary, setSalary] = useState(props.salary);
  const [id, setId] = useState(props.id);


  // fetch api on frontend

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const firstName = form.fname.value;
    const middleName = form.mname.value;
    const lastName = form.lname.value;
    const doj = form.doj.value;
    const department = form.department.value;
    const salary = form.salary.value;
    const id = form.id.value;

    const fetchDataDetails = async (id, firstName, middleName, lastName, doj, department, salary) => {
      const data = await axios.patch(`https://guarded-garden-00467.herokuapp.com/api/office/update-one/${id}`, {
        fName: firstName,
        mName: middleName,
        lName: lastName,
        doj: doj,
        departMent: department,
        salary: salary
      })

      return data

    }

    fetchDataDetails(id, firstName, middleName, lastName, doj, department, salary)
      .then(res => {
        if (res) {
          setShow(false)
          // window.location.reload();
          if (res) {
            toast("Edit Successful", {
              className: "success-alert",
              draggable: false,
              position: toast.POSITION.TOP_LEFT
            })
          }

        }
      })
      .catch(err => {
        console.log(err.response.data.message ? err.response.data.message : err.response.data);
        if (err) {
          toast("Duplicate Name/Title", {
            className: "error-alert",
            draggable: false,
            position: toast.POSITION.TOP_LEFT
          })
        }
      })
  }


  return (
    <>
      <Button variant="success" onClick={handleShow}><BsPencilSquare /></Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Form.Control type="text" name="id" value={id} disabled onChange={e => setId(e.target.value)} /><br />
              <Form.Control type="text" name="fname" value={firstName} onChange={e => setFirstName(e.target.value)} /><br />
              <Form.Control type="text" name="mname" value={middleName} onChange={e => setMiddleName(e.target.value)} /><br />
              <Form.Control type="text" name="lname" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form.Control type="text" name="doj" value={doj} onChange={e => setDoj(e.target.value)} /><br />
            <Form.Control type="text" name="department" value={department} onChange={e => setDepartment(e.target.value)} /><br />
            <Form.Control type="text" name="salary" value={salary} onChange={e => setSalary(e.target.value)} />

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">Update</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ModalPopUp;