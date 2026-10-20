import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { deleteEmployeeById, getEmployees } from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";
import "../styles/CompanyMembers.css";

function CompanyMembers() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { employees, loading, error } = useSelector(
    (state: RootState) => state.employee,
  );

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container-fluid p-4 company-members">
      <div className="members-heading mb-4">
        <h2>Company Members</h2>
        <p>View and manage your team members</p>
      </div>

      <div className="row g-4">
        {employees.map((employee: any) => (
          <div className="col-12 col-md-6 col-xl-4" key={employee.id}>
            <div className="card employee-card h-100">
              <div className="card-body">
                <div className="employee-profile">
                  <div>
                    <img
                    src={employee.profile_image}
                    alt={employee.full_name}
                    className="employee-image"
                  />
                  </div>
                            
                   <div>
                    <h5>{employee.full_name}</h5>
                    <p>{employee.designation || "Designation not assigned"}</p>
                     <div>
                    <p>{employee.email}</p>
                  </div>
                  </div>
                </div>
                <div className="employee-actions">
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/EmployeeDetails/${employee.id}`)}
                  >
                    View Profile
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => dispatch(deleteEmployeeById(employee.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <p className="text-muted mt-4">No employees found.</p>
      )}
    </div>
  );
}

export default CompanyMembers;
