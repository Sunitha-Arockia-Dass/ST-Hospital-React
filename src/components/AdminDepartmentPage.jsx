import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import URL from "../links/links.json";
import CreateDepartment from "./CreateDepartment";

function AdminDepartmentPage({ setDepartmentView }) {
  const [createDept, setCreateDept] = useState(null);
  const [updateDept, setUpdateDept] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [deptView, setDeptView] = useState(true);
  const [deptId, setDeptId] = useState()
  useEffect(() => {
    axios.get(URL.departments).then((foundDepartments) => {
      setDepartments(foundDepartments.data);
    });
  }, [deptView]);
  const updateDepartment = (id) => {
    setDeptView(false);
    setUpdateDept(true);
    setDeptId(id)
  };

  const deleteDept = (id) => {
    axios
      .delete(`${URL.deleteDept}/${id}`)
      .then((response) => {
        console.log("successfully deleted", response.data);
        setDepartments((prevDepartments) =>
          prevDepartments.filter((department) => department._id !== id)
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className="dpt-page">     
        <h4 className="admin">Admin Department Page</h4>
      <div className="all-dpt">

        <button className="back" onClick={() => { setDepartmentView(false) }} >↩ Back</button>
        <button className="back"
          onClick={() => {
            setCreateDept(true), setDeptView(false);
          }}
        >
          <h4>Add +</h4>
        </button>
        {deptView &&
          departments?.map((department) => {
            return (
              <div className="admin one-dpt" key={department._id}>
                <fieldset className="fieldset">
                  <legend>
                    <h4>{department.name}</h4>
                  </legend>
                  <p>{department.description}</p>
                  <div className="dpt-img">
                    <img src={department.image} alt="Department icon" />
                  </div>
                </fieldset>
                <button className="back"
                  onClick={() => {
                    updateDepartment(department._id);
                  }}
                >
                  Update
                </button>
                <button className="back"
                  onClick={() => {
                    deleteDept(department._id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        {createDept && <CreateDepartment create={true} setDeptView={setDeptView} setCreateDept={setCreateDept} id={""} />}
        {updateDept && <CreateDepartment create={false} setDeptView={setDeptView} setCreateDept={setUpdateDept} id={deptId} />}
      </div>
    </div>
  );
}

export default AdminDepartmentPage;
