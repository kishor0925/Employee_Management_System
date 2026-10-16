import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeId } from "../service/employeeService";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEmployeeId(Number(id))
      .then((data) => {
        setEmployee(data);
      })
      .catch(() => {
        setError("Failed to load employee details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading employee details...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!employee) {
    return <p>Employee not found</p>;
  }

  // Personal Information
  const personalDetails = [
    { label: "Employee ID", value: employee.id },
    { label: "Full Name", value: employee.full_name },
    { label: "Email", value: employee.email },
    { label: "Phone", value: employee.phone },
    { label: "Date of Birth", value: employee.date_of_birth },
    { label: "Gender", value: employee.gender },
    { label: "Blood Group", value: employee.blood_group },
    { label: "Address", value: employee.address },
  ];
  // Employment Details
  const employmentDetails = [
    { label: "Employment Type", value: "employment_type" },
    { label: "Department", value: "department" },
    { label: "Designation", value: "designation" },
    { label: "Joining Date", value: "joining_date" },
    { label: "Experience Type", value: "experience_type" },
    { label: "Work Location", value: "work_location" },
  ];

  // Education Details
  const educationDetails = [
    { label: "Education Level", value: "education_level" },
    { label: "Course", value: "course_name" },
    { label: "Institution", value: "institution_name" },
    { label: "Completion Year", value: "completion_year" },
  ];

  // Previous Experience
  const experienceDetails = [
    { label: "Company", value: "company_name" },
    { label: "Previous Role", value: "previous_role" },
    { label: "Previous Salary", value: "previous_salary" },
    { label: "Start Date", value: "employment_start_date" },
    { label: "End Date", value: "employment_end_date" },
  ];

  // Internship Details
  const internshipDetails = [
    { label: "Company", value: "company_name" },
    { label: "Role", value: "internship_role" },
    { label: "Start Date", value: "start_date" },
    { label: "End Date", value: "end_date" },
    { label: "Internship Type", value: "internship_type" },
  ];

  // Role and Skills
  const roleDetails = [
    { label: "Primary Role", value: "primary_role" },
    { label: "Skills", value: "skills" },
  ];

  // Work Schedule
  const scheduleDetails = [
    { label: "Working Days", value: "working_days" },
    { label: "Start Time", value: "start_time" },
    { label: "End Time", value: "end_time" },
    { label: "Break Duration", value: "break_duration_minutes" },
  ];

  // Payroll Details
  const payrollDetails = [
    { label: "Payroll Type", value: "payroll_type" },
    { label: "Basic Salary", value: "basic_salary" },
    { label: "Housing Allowance", value: "housing_allowance" },
    { label: "Transport Allowance", value: "transport_allowance" },
    { label: "Other Allowance", value: "other_allowance" },
    { label: "Overtime Rate", value: "overtime_rate" },
    { label: "Deductions", value: "deductions" },
  ];

  return (
    <div className="container-fluid p-4">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/companymembers")}
      >
        Back
      </button>

      {/* Personal Information */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Personal Information</h5>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <strong>Profile Image:</strong>
            <br />

            {employee.profile_image ? (
              <img
                src={employee.profile_image}
                alt={employee.full_name}
                width="120"
                height="120"
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <p>Image not provided</p>
            )}
          </div>
          {personalDetails.map((item) => (
            <p key={item.label}>
              <strong>{item.label}:</strong> {item.value || "Not provided"}
            </p>
          ))}
        </div>
      </div>

      {/* Employment Details */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Employment Details</h5>
        </div>

        <div className="card-body">
          {employee.employment_details?.length > 0 ? (
            employee.employment_details.map((item: any) => (
              <div key={item.id}>
                {employmentDetails.map((field) => (
                  <p key={field.value}>
                    <strong>{field.label}:</strong>{" "}
                    {item[field.value] || "Not provided"}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>No employment details available</p>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Education</h5>
        </div>

        <div className="card-body">
          {employee.education?.length > 0 ? (
            employee.education.map((item: any) => (
              <div key={item.id}>
                {educationDetails.map((field) => (
                  <p key={field.value}>
                    <strong>{field.label}:</strong>{" "}
                    {item[field.value] || "Not provided"}
                  </p>
                ))}
              </div>
            ))
          ):(
            <p>No education details available</p>
          )}
        </div>
      </div>

      {/* Previous Experience */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Previous Experience</h5>
        </div>

        <div className="card-body">
          {employee.experience?.length > 0 ? (
            employee.experience.map((item: any) => (
              <div key={item.id}>
                {experienceDetails.map((field) => (
                  <p key={field.value}>
                    <strong>{field.label}:</strong>{" "}
                    {item[field.value] ?? "Not provided"}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>No experience details available</p>
          )}
        </div>
      </div>

      {/* Internships */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Internships</h5>
        </div>

        <div className="card-body">
          {employee.internships?.length > 0 ? (
            employee.internships.map((item: any) => (
              <div key={item.id}>
                {internshipDetails.map((field) => (
                  <p key={field.value}>
                    <strong>{field.label}:</strong>{" "}
                    {item[field.value] || "Not provided"}
                  </p>
                ))}
              </div>
            ))
          ):(
            <p>No internship details available</p>
          )}
        </div>
      </div>

      {/* Role and Skills */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Role and Skills</h5>
        </div>

        <div className="card-body">
          {employee.roles?.length > 0 ? (
            employee.roles.map((item: any) => (
              <div key={item.id}>
                {roleDetails.map((field) => (
                  <p key={field.value}>
                    <strong>{field.label}:</strong>{" "}
                    {Array.isArray(item[field.value])
                      ? item[field.value].join(", ")
                      : item[field.value] || "Not provided"}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>No role details available</p>
          )}
        </div>
      </div>

      {/* Work Schedule */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Work Schedule</h5>
        </div>

        <div className="card-body">
          {employee.work_schedules?.length > 0 ? (
            employee.work_schedules.map((item: any) => (
              <div key={item.id}>
                {scheduleDetails.map((field) => (
                  <p key={field.value}>
                    <strong>{field.label}:</strong>{" "}
                    {Array.isArray(item[field.value])
                      ? item[field.value].join(", ")
                      : (item[field.value] ?? "Not provided")}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>No work schedule available</p>
          )}
        </div>
      </div>

      {/* Payroll Information */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Payroll Information</h5>
        </div>

        <div className="card-body">
          {employee.payroll_configs?.length > 0 ? (
            employee.payroll_configs.map((item: any) => (
              <div key={item.id}>
                {payrollDetails.map((field) => (
                  <p key={field.value}>
                    <strong>{field.label}:</strong>{" "}
                    {item[field.value] ?? "Not provided"}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>No payroll information available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
