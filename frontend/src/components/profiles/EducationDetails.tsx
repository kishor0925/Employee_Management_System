import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { ChangeEvent } from "react";
import { setEducation } from "../../redux/employeeSlice";
import Input from "../common/Input";

function EducationDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const education = useSelector((state: RootState) => state.employee.education);

  const fields = [
    { label: "College / University", name: "college_university", type: "text" },
    { label: "Degree", name: "degree", type: "text" },
    { label: "Field of Study", name: "field_of_study", type: "text" },
    { label: "Graduation Year", name: "graduation_year", type: "number" },
    { label: "Education Level", name: "education_level", type: "text" },
  ] as const;

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updated = [...education];

    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value,
    };

    dispatch(setEducation(updated));
  };

  const addEducation = () => {
    dispatch(
      setEducation([
        ...education,
        {
          college_university: "",
          degree: "",
          field_of_study: "",
          graduation_year: "",
          education_level: "",
        },
      ]),
    );
  };

  const removeEducation = (index: number) => {
    dispatch(setEducation(education.filter((_, i) => i !== index)));
  };

  return (
    <div className="education-details">
      <div className="common-heading"> 
        <h3 className="education-title">Education Details</h3>
      </div>

      {education.map((item, index) => (
        <div className="education-card" key={index}>
          <div className="education-card-heading">
            <h4>Education {index + 1}</h4>

            {education.length > 1 && (
              <button
                type="button"
                className="education-remove"
                onClick={() => removeEducation(index)}
              >
                Remove
              </button>
            )}
          </div>

          <div className="education-grid">
            {fields.map((field) => (
              <div className="education-field" key={field.name}>
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

      <button type="button" className="education-add" onClick={addEducation}>
        + Add Education
      </button>
    </div>
  );
}

export default EducationDetails;
