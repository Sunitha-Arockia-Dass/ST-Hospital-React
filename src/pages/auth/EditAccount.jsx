import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import URL from "../../links/links.json";
import { AuthContext } from "./../../context/auth.context";

function EditAccount() {

  /* Reveal password */
  const revealPassword = () => {
    const password = document.getElementById("passwordInput")

    if (password.type === "password") {
      password.type = "text"
    } else {
      password.type = "password"
    }
  }


  const { user, logOutUser } = useContext(AuthContext);
  const [gpData, setGPData] = useState();
  const [myGPData, setMyGPData] = useState();

  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(URL.gPractice).then((response) => {
      setGPData(response.data);
    });
  }, []);
  useEffect(() => {
    if (user.patientDetails) {
      axios
        .get(`${URL.gPractice}/${user.patientDetails.gp[0]._id}`)
        .then((response) => {
          console.log(response.data);
          setMyGPData(response.data);
        })
        .catch((error) => console.log("error", error));
    }
  }, [user.patientDetails]);
  const updateUser = (e) => {
    e.preventDefault();
    let data = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      newPassword: e.target.newPassword.value,
      role: user.role,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
    }
    if (e.target.dateOfBirth.value.trim() !== '') {
      data.patientDetails.dateOfBirth = e.target.dateOfBirth.value
    }
    if (e.target.gp.value.trim() !== '') {
      data.patientDetails.gp = e.target.gp.value
    }
    if (e.target.phone.value.trim() !== '') {
      data.patientDetails.contactNumber = e.target.phone.value
    }
    if (e.target.houseNumber.value.trim() !== '') {
      data.patientDetails.houseNumber = e.target.houseNumber.value
    }
    if (e.target.street.value.trim() !== '') {
      data.patientDetails.street = e.target.street.value
    }
    if (e.target.city.value.trim() !== '') {
      data.patientDetails.city = e.target.city.value
    }
    if (e.target.country.value.trim() !== '') {
      data.patientDetails.country = e.target.country.value
    }
    if (e.target.postalCode.value.trim() !== '') {
      data.patientDetails.postalCode = e.target.postalCode.value
    }
    console.log("data", data);
    axios
      .put(`${URL.patientUpdate}/${user._id}`, data)
      .then((response) => {
        logOutUser();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error);
      });
  };

  return (
    <div id="editaccount" className="full center-frame">
      <div className="half-frame">
        <form onSubmit={updateUser}>
          <h3>Edit Account</h3>
          <p>
            Wanna go back ?
            <NavLink to="/account" className="style-one">
              {" "}
              account
            </NavLink>
          </p>

          <div className="two-inputs">
            <input
              type="text"
              name="firstname"
              defaultValue={user.firstname}
              placeholder="Enter your First Name"
            />
            <br />
            <input
              type="text"
              name="lastname"
              defaultValue={user.lastname}
              placeholder="Enter your Last Name"
            />
          </div>
          <br />


          <input
            type="text"
            name="username"
            defaultValue={user.username}
            placeholder="Enter Username"
          />
          <br />
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            placeholder="Enter Email"
          />

          <br />


          <div className="two-inputs">

            <input
              type="tel"
              name="phone"
              defaultValue={user.patientDetails?.contactNumber}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
            />
            <br />

            <input
              type="date"
              name="dateOfBirth"
              defaultValue={user.patientDetails?.dateOfBirth}
              placeholder="Enter your date of birth"
            />

          </div>
          <br />
          <select name="gp">
            <option value="" disabled selected>
              {myGPData?.name || "Select General Practitioner"}
            </option>

            {gpData?.map((gp) => {
              return (
                <option key={gp._id} value={gp._id}>
                  {gp.name}, {gp.address.city}
                </option>
              );
            })}
          </select>
          <br />

          <div className="twothird-inputs">
            <input
              type="text"
              name="houseNumber"
              defaultValue={user.patientDetails?.address.houseNumber}
              placeholder="Number"
            />
            <br />
            <input
              type="text"
              name="street"
              defaultValue={user.patientDetails?.address.street}
              placeholder="Enter Street Name"
            />
          </div>
          <br />

          <div className="two-inputs">
            <input
              type="text"
              name="postalCode"
              defaultValue={user.patientDetails?.address.postalCode}
              placeholder="Enter Post Code"
            />
            <br />
            <input
              type="text"
              name="city"
              defaultValue={user.patientDetails?.address.city}
              placeholder="Enter City"
            />
            <br />
            <input
              type="text"
              name="country"
              defaultValue={user.patientDetails?.address.country}
              placeholder="Enter Country"
            />
          </div>
          <br />

          <div className="password">
            <input id="passwordInput"
              type="password"
              name="password"
              placeholder="Enter Old Password"
            />
            <svg onClick={revealPassword} className="eye" fill="black" width="32px" height="32px" viewBox="0 0 32.00 32.00"><path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z"></path></svg>
          </div>
          <br />
          <div className="password">
            <input id="passwordInput"
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
            />
            <svg onClick={revealPassword} className="eye" fill="black" width="32px" height="32px" viewBox="0 0 32.00 32.00"><path d="M4.4955 7.44088C3.54724 8.11787 2.77843 8.84176 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C13.2958 19 14.4799 18.8108 15.5523 18.4977L13.8895 16.8349C13.2936 16.9409 12.6638 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366C4.23754 10.2097 4.99526 9.50784 5.93214 8.87753L4.4955 7.44088Z"></path> <path d="M8.53299 11.4784C8.50756 11.6486 8.49439 11.8227 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5C12.1716 15.5 12.3458 15.4868 12.516 15.4614L8.53299 11.4784Z"></path> <path d="M15.4661 12.4471L11.5473 8.52829C11.6937 8.50962 11.8429 8.5 11.9944 8.5C13.9274 8.5 15.4944 10.067 15.4944 12C15.4944 12.1515 15.4848 12.3007 15.4661 12.4471Z"></path> <path d="M18.1118 15.0928C19.0284 14.4702 19.7715 13.7805 20.3413 13.1634C20.9657 12.4872 20.9657 11.5128 20.3413 10.8366C18.8117 9.18002 16.0331 7 12 7C11.3594 7 10.7505 7.05499 10.1732 7.15415L8.50483 5.48582C9.5621 5.1826 10.7272 5 12 5C16.8112 5 20.0833 7.60905 21.8107 9.47978C23.1426 10.9222 23.1426 13.0778 21.8107 14.5202C21.2305 15.1486 20.476 15.8603 19.5474 16.5284L18.1118 15.0928Z"></path> <path d="M2.00789 3.42207C1.61736 3.03155 1.61736 2.39838 2.00789 2.00786C2.39841 1.61733 3.03158 1.61733 3.4221 2.00786L22.0004 20.5862C22.391 20.9767 22.391 21.6099 22.0004 22.0004C21.6099 22.3909 20.9767 22.3909 20.5862 22.0004L2.00789 3.42207Z"></path></svg>
          </div>


          <br />
          <button className="form" type="submit">Edit Account</button>
        </form>
      </div>
    </div>
  );
}

export default EditAccount;
