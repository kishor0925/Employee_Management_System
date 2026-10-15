import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { setPayrollField } from "../../redux/employeeSlice";

function PayrollDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const payroll = useSelector(
    (state: RootState) => state.employee.payroll
  );

  const fields = [
    { label: "Basic Salary", name: "basic_salary", type: "number" },
    { label: "Housing Allowance", name: "housing_allowance", type: "number" },
    { label: "Transport Allowance", name: "transport_allowance", type: "number" },
    { label: "Other Allowance", name: "other_allowance", type: "number" },
    { label: "Overtime Rate", name: "overtime_rate", type: "number" },
    { label: "Deductions", name: "deductions", type: "number" },
  ];

  return (
    <div className="payroll-details">
      <div className="common-heading">
        <div>

        <h3>Payroll Details</h3>
        <p>Enter the employee's salary and payroll information.</p>
        </div>
      </div>

      <div className="payroll-field">
        <label htmlFor="payroll_type">Payroll Type</label>

        <select
          id="payroll_type"
          name="payroll_type"
          value={payroll.payroll_type || ""}
          onChange={(e) =>
            dispatch(
              setPayrollField({
                name: e.target.name,
                value: e.target.value,
              })
            )
          }
        >
          <option value="">Select Payroll Type</option>
          <option value="Monthly">Monthly</option>
          <option value="Hourly">Hourly</option>
        </select>
      </div>

      <div className="payroll-grid">
        {fields.map((field) => (
          <div className="payroll-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>

            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={payroll[field.name] ?? ""}
              onChange={(e) =>
                dispatch(
                  setPayrollField({
                    name: e.target.name,
                    value:
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value),
                  })
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PayrollDetails;