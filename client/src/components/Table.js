import React from "react";
import { Table, Button, Col, Row ,InputGroup,FormControl} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

const TableData = ({ array, deleteHandler,name }) => {

  let obj = array[0];

  return (
    <>
      <Row className="d-flex justify-content-center mb-4" md="auto">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="Search"
              onChange={(e) => null}
            />
          </InputGroup>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            {obj &&
              Object.keys(obj)
                .filter((key) => key !== "__v")
                .map((key, index) => <th key={index}>{key}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {array &&
            array?.map((item) => (
              <tr key={item._id}>
                {Object.values(item)
                  .filter((val) => val !== 0)
                  .map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}

                <td>
                  <Col style={{ display: "flex" }}>
                    <LinkContainer to={`/admin/api/update/${name}/${item._id}`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableData;
