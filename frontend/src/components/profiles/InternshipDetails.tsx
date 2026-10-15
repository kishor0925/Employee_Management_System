import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { ChangeEvent } from "react";
import { setInternship } from "../../redux/employeeSlice";
import Input from "../common/Input";

function InternshipDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const internships = useSelector(
    (state: RootState) => state.employee.internships
  );

  const fields = [
    { label: "Company Name", name: "company_name", type: "text" },
    { label: "Internship Role", name: "internship_role", type: "text" },
    { label: "Start Date", name: "start_date", type: "date" },
    { label: "End Date", name: "end_date", type: "date" },
    { label: "Internship Type", name: "internship_type", type: "text" },
  ] as const;

  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...internships];

    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value,
    };

    dispatch(setInternship(updated));
  };

  const addInternship = () => {
    dispatch(
      setInternship([
        ...internships,
        {
          company_name: "",
          internship_role: "",
          start_date: "",
          end_date: "",
          internship_type: "",
        },
      ])
    );
  };

  const removeInternship = (index: number) => {
    dispatch(setInternship(internships.filter((_, i) => i !== index)));
  };

  return (
    <div className="internship-details">
      <div className="common-heading">
        <div>

        <h3>Internship Details</h3>
        <p>Add the employee's internship experience.</p>
        </div>
      </div>

      {internships.map((item, index) => (
        <div className="internship-card" key={index}>
          <div className="internship-card-heading">
            <h4>Internship {index + 1}</h4>

            {internships.length > 1 && (
              <button
                type="button"
                className="internship-remove"
                onClick={() => removeInternship(index)}
              >
                Remove
              </button>
            )}
          </div>

          <div className="internship-grid">
            {fields.map((field) => (
              <div className="internship-field" key={field.name}>
                <label htmlFor={`${field.name}-${index}`}>
                  {field.label}
                </label>

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

      <button
        type="button"
        className="internship-add"
        onClick={addInternship}
      >
        + Add Internship
      </button>
    </div>
  );
}

export default InternshipDetails;