import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { deleteEmployeeById, getEmployees } from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";
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
    <div className="container-fluid p-4 w-100">
      <h2 className="mb-4">Company Members</h2>

      <div className="row w-100">
        {employees.map((employee: any) => (
          <div className="col-12 col-md-6 col-lg-4 mb-3" key={employee.id}>
            <div className="card w-100 h-100">
              <div className="card-body">
                <h5 className="card-title">{employee.full_name}</h5>
                <p className="card-text">{employee.email}</p>
                <p className="card-text">
                  {employee.department || "Not assigned"}
                </p>
                <p className="card-text">
                  {employee.designation || "Not assigned"}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/EmployeeDetails/${employee.id}`)}
                >
                  View
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteEmployeeById(employee.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyMembers;
