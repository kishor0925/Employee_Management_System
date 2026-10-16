
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { ChangeEvent } from "react";
import { setEmployeeField } from "../../redux/employeeSlice";
import Input from "../common/Input";

function PersonalDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const employee = useSelector((state: RootState) => state.employee.employee);

  const fields = [
    { label: "Full Name", name: "full_name", type: "text" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Phone Number", name: "phone", type: "tel" },
    { label: "Date of Birth", name: "date_of_birth", type: "date" },
    { label: "Profile Image", name : "profile_image", type : "file"}
  ] as const;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setEmployeeField({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleImageChange = (e : ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(
        setEmployeeField({
          name : "profile_image",
          value : reader.result
        })
      )
    }
    reader.readAsDataURL(file);

  }
  return (
    <div className="personal-details">
      <div className="common-heading">
        <h3>Personal Details</h3>
        <p>Enter the employee's basic information.</p>
        <div></div>
      </div>

      <div className="personal-details-grid">
        {fields.map((field) => (
          <div className="personal-details-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "file" ? (
              <input
                id={field.name}
                name={field.name}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
              />
            ) : (
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              value={employee[field.name] || ""}
              onChange={handleChange}
            />)}
          </div>
        ))}

        <div className="personal-details-field">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={employee.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="personal-details-field">
          <label htmlFor="blood_group">Blood Group</label>
          <select
            id="blood_group"
            name="blood_group"
            value={employee.blood_group || ""}
            onChange={handleChange}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="personal-details-field personal-details-address">
          <label htmlFor="address">Residential Address</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            placeholder="Enter complete residential address"
            value={employee.address || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
