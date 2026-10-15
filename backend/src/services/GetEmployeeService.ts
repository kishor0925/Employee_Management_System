import { pool } from "../db/dbconnect";

class GetEmployeeService {
  async getEmployees() {
    const result = await pool.query(`
      SELECT
        e.id,
        e.full_name,
        e.email,
        e.phone,
        e.profile_image,
        e.status,
        ed.department,
        ed.designation,
        ed.employment_type
      FROM employees e
      LEFT JOIN employment_details ed
        ON e.id = ed.employee_id
      ORDER BY e.id DESC
    `);

    return result.rows;
  }

  async getEmployeeById(id: number) {
    const result = await pool.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    const employee = result.rows[0];

    const [
      employment,
      education,
      experience,
      internships,
      roles,
      schedules,
      payroll,
    ] = await Promise.all([
      pool.query("SELECT * FROM employment_details WHERE employee_id = $1", [
        id,
      ]),
      pool.query("SELECT * FROM employee_education WHERE employee_id = $1", [
        id,
      ]),
      pool.query("SELECT * FROM employee_experience WHERE employee_id = $1", [
        id,
      ]),
      pool.query("SELECT * FROM employee_internships WHERE employee_id = $1", [
        id,
      ]),
      pool.query("SELECT * FROM employee_roles WHERE employee_id = $1", [id]),
      pool.query("SELECT * FROM work_schedules WHERE employee_id = $1", [id]),
      pool.query("SELECT * FROM payroll_configs WHERE employee_id = $1", [id]),
    ]);

    return {
      ...employee,
      employment_details: employment.rows,
      education: education.rows,
      experience: experience.rows,
      internships: internships.rows,
      roles: roles.rows,
      work_schedules: schedules.rows,
      payroll_configs: payroll.rows,
    };
  }

  async deleteEmployee(id: number) {
    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING id",
      [id],
    );

    return result.rows[0] || null;
  }
}

export default GetEmployeeService;
