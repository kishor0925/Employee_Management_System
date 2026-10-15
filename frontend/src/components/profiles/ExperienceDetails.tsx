import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { ChangeEvent } from "react";
import { setExperience } from "../../redux/employeeSlice";
import Input from "../common/Input";

function ExperienceDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const experience = useSelector(
    (state: RootState) => state.employee.experience,
  );

  const fields = [
    { label: "Company Name", name: "company_name", type: "text" },
    { label: "Previous Role", name: "previous_role", type: "text" },
    { label: "Previous Salary", name: "previous_salary", type: "number" },
    {
      label: "Employment Start Date",
      name: "employment_start_date",
      type: "date",
    },
    {
      label: "Employment End Date",
      name: "employment_end_date",
      type: "date",
    },
  ] as const;

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updated = [...experience];

    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value,
    };

    dispatch(setExperience(updated));
  };

  const addExperience = () => {
    dispatch(
      setExperience([
        ...experience,
        {
          company_name: "",
          previous_role: "",
          previous_salary: "",
          employment_start_date: "",
          employment_end_date: "",
        },
      ]),
    );
  };

  const removeExperience = (index: number) => {
    dispatch(setExperience(experience.filter((_, i) => i !== index)));
  };

  return (
    <div className="experience-details">
      <div  className="common-heading"> 
        <div>

        <h3>Experience Details</h3>
        <p>Add the employee's previous work experience.</p>
        </div>
      </div>

      {experience.map((item, index) => (
        <div className="experience-card" key={index}>
          <div className="experience-card-heading">
            <h4>Experience {index + 1}</h4>

            {experience.length > 1 && (
              <button
                type="button"
                className="experience-remove"
                onClick={() => removeExperience(index)}
              >
                Remove
              </button>
            )}
          </div>

          <div className="experience-grid">
            {fields.map((field) => (
              <div className="experience-field" key={field.name}>
                <label htmlFor={`${field.name}-${index}`}>{field.label}</label>

                <Input
                  id={`${field.name}-${index}`}
                  name={field.name}
                  type={field.type}
                  value={item[field.name] ?? ""}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button type="button" className="experience-add" onClick={addExperience}>
        + Add Experience
      </button>
    </div>
  );
}

export default ExperienceDetails;
