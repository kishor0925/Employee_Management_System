import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import {
  submitEmployee,
  updateEmployeeById,
  setEmployeeForm,
} from "../redux/employeeSlice";
import { getEmployeeId } from "../service/employeeService";

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
  const [loadingEmployee, setLoadingEmployee] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const employee = useSelector((state: RootState) => state.employee);

  useEffect(() => {
    if (!id) return;

    setLoadingEmployee(true);

    getEmployeeId(Number(id))
      .then((data) => {
        const employee = data.employee || data;
        const employment =
          data.employment || data.employment_details?.[0] || {};
        const schedule = data.schedule || data.work_schedules?.[0] || {};

        dispatch(
          setEmployeeForm({
            employee: {
              ...employee,
              date_of_birth: employee.date_of_birth?.split("T")[0] || "",
              profile_image: employee.profile_image || "",
            },

            employment: {
              ...employment,
              joining_date: employment.joining_date?.split("T")[0] || "",
            },

            education: data.education || [],

            experience: (data.experience || []).map((item: any) => ({
              ...item,
              employment_start_date:
                item.employment_start_date?.split("T")[0] || "",
              employment_end_date:
                item.employment_end_date?.split("T")[0] || "",
            })),

            internships: (data.internships || []).map((item: any) => ({
              ...item,
              start_date: item.start_date?.split("T")[0] || "",
              end_date: item.end_date?.split("T")[0] || "",
            })),

            role: data.role || data.roles?.[0] || {},
            schedule,
            payroll: data.payroll || data.payroll_configs?.[0] || {},
          }),
        );
      })
      .catch((error) => {
        console.error("Failed to load employee:", error);
      })
      .finally(() => {
        setLoadingEmployee(false);
      });
  }, [id, dispatch]);

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
    const data = {
      employee: employee.employee,
      employment: employee.employment,
      education: employee.education,
      experience: employee.experience,
      internships: employee.internships,
      role: employee.role,
      schedule: employee.schedule,
      payroll: employee.payroll,
    };

    if (id) {
      dispatch(
        updateEmployeeById({
          id: Number(id),
          data,
        }),
      )
        .unwrap()
        .then(() => navigate("/companymembers"))
        .catch(() => {});
    } else {
      dispatch(submitEmployee(data));
    }
  };

  if (loadingEmployee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <div className="profile-page container">
      <div className="profile-form">
        <div className="profile-header">
          <div>
            <h3>{id ? "Update Employee" : "Employee Onboarding"}</h3>
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
            <Button
              onClick={handleSubmit}
              disabled={employee.loading}
              className="Submit-button"
            >
              {employee.loading
                ? id
                  ? "Updating..."
                  : "Submitting..."
                : id
                  ? "Update Employee"
                  : "Submit"}
            </Button>
          )}
        </div>

        {employee.error && (
          <p className="text-danger profile-message">{employee.error}</p>
        )}

        {employee.success && !id && (
          <p className="text-success profile-message">
            Employee onboarded successfully! ID: {employee.employeeId}
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
