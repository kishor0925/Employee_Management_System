import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { ChangeEvent } from "react";
import { setEmploymentField } from "../../redux/employeeSlice";
import Input from "../common/Input";

function EmploymentDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const employment = useSelector(
    (state: RootState) => state.employee.employment
  );

  const fields = [
    { label: "Department", name: "department", type: "text" },
    { label: "Designation", name: "designation", type: "text" },
    { label: "Joining Date", name: "joining_date", type: "date" },
    { label: "Work Location", name: "work_location", type: "text" },
  ] as const;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(
      setEmploymentField({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <div className="employment-details">
      <div className="common-heading"> 
        <h3>Employment Details</h3>
        <p>Enter the employee's employment information.</p>
      </div>

      <div className="employment-grid">
        <div className="employment-field">
          <label htmlFor="employment_type">Employment Type</label>
          <select
            id="employment_type"
            name="employment_type"
            value={employment.employment_type || ""}
            onChange={handleChange}
          >
            <option value="">Select Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="employment-field">
          <label htmlFor="experience_type">Experience Type</label>
          <select
            id="experience_type"
            name="experience_type"
            value={employment.experience_type || ""}
            onChange={handleChange}
          >
            <option value="">Select Experience Type</option>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
        </div>

        {fields.map((field) => (
          <div className="employment-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              value={employment[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmploymentDetails;