import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { ChangeEvent } from "react";
import { setRoleField } from "../../redux/employeeSlice";
import Input from "../common/Input";

function RoleDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const role = useSelector((state: RootState) => state.employee.role);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRoleField({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <div className="role-details">
      <div className="common-heading">
        <div>

        <h3>Role Details</h3>
        <p>Enter the employee's primary role and skills.</p>
        </div>
      </div>

      <div className="role-grid">
        <div className="role-field">
          <label htmlFor="primary_role">Primary Role</label>
          <Input
            id="primary_role"
            name="primary_role"
            type="text"
            value={role.primary_role || ""}
            onChange={handleChange}
          />
        </div>

        <div className="role-field">
          <label htmlFor="skills">Skills (comma-separated)</label>
          <Input
            id="skills"
            name="skills"
            type="text"
            value={role.skills || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default RoleDetails;