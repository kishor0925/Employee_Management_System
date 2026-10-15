import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { submitEmployee } from "../redux/employeeSlice";
import Personaldetails from "../components/profiles/Personaldetails";
import EmploymentDetails from "../components/profiles/EmploymentDetails";
import EducationDetails from "../components/profiles/EducationDetails";
import ExperienceDetails from "../components/profiles/ExperienceDetails";
import InternshipDetails from "../components/profiles/InternshipDetails";
import RoleDetails from "../components/profiles/RoleDetails";
import WorkSchedule from "../components/profiles/WorkSchedule";
import PayrollDetails from "../components/profiles/PayrollDetails";
import "../styles/Profile.css";
import Button from "../components/common/Button";
function Profile() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const employee = useSelector((state: RootState) => state.employee);

  const experienceType = employee.employment.experience_type;

  const steps = [
    <Personaldetails />,
    <EmploymentDetails />,
    <EducationDetails />,
  ...(experienceType === "Experienced" ? [<ExperienceDetails />] : []),
    <InternshipDetails />,
    <RoleDetails />,
    <WorkSchedule />,
    <PayrollDetails />,
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    dispatch(
      submitEmployee({
        employee: employee.employee,
        employment: employee.employment,
        education: employee.education,
        experience: employee.experience,
        internships: employee.internships,
        role: employee.role,
        schedule: employee.schedule,
        payroll: employee.payroll,
      }),
    );
  };

  return (
    <div className="profile-page container">
      <div className="profile-form">
        <div className="profile-header">
          <div>
            <h3>Employee Onboarding</h3>
            <p>
              Step {step} of {steps.length}
            </p>
          </div>
        </div>

        <div className="profile-content">{steps[step - 1]}</div>

        <div className="profile-footer">
          <Button
            onClick={handlePrevious}
            disabled={step === 1 || employee.loading}
            className="Previous-button"
          >
            Previous
          </Button>

          {step < steps.length ? (
            <Button
              onClick={handleNext}
              disabled={employee.loading}
              className="Next-button"
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={employee.loading} className="Submit-button">
              {employee.loading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>

        {employee.error && (
          <p className="text-danger profile-message">{employee.error}</p>
        )}

        {employee.success && (
          <p className="text-success profile-message">
            Employee onboarded successfully! ID: {employee.employeeId}
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
