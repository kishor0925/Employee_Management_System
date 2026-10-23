import { pool } from "../db/dbconnect";
import axios from "axios";

export class UpdateEmployeeService {
  async uploadImage(image: string) {
    const apikey = process.env.IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("image", image.split(",")[1]);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apikey}`,
      formData
    );

    return response.data.data.url;
  }

  async updateEmployee(id: number, data: any) {
    const {
      employee,
      employment,
      education = [],
      experience = [],
      internships = [],
      role,
      schedule,
      payroll,
    } = data;

    if (!employee?.full_name || !employee?.email) {
      throw new Error("Full name and email are required");
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const existingEmployee = await client.query(
        `SELECT id, profile_image
         FROM employees
         WHERE id = $1`,
        [id]
      );

      if (existingEmployee.rows.length === 0) {
        throw new Error("Employee not found");
      }

      let imageUrl = existingEmployee.rows[0].profile_image;

      if (employee.profile_image) {
        imageUrl = employee.profile_image.startsWith("data:")
          ? await this.uploadImage(employee.profile_image)
          : employee.profile_image;
      }

      await client.query(
        `UPDATE employees
         SET full_name = $1,
             email = $2,
             phone = $3,
             date_of_birth = $4,
             gender = $5,
             blood_group = $6,
             address = $7,
             profile_image = $8,
             status = $9
         WHERE id = $10`,
        [
          employee.full_name,
          employee.email,
          employee.phone || null,
          employee.date_of_birth || null,
          employee.gender || null,
          employee.blood_group || null,
          employee.address || null,
          imageUrl,
          employee.status || "Active",
          id,
        ]
      );

      if (employment) {
        const employmentResult = await client.query(
          `UPDATE employment_details
           SET employment_type = $1,
               department = $2,
               designation = $3,
               joining_date = $4,
               experience_type = $5,
               work_location = $6
           WHERE employee_id = $7`,
          [
            employment.employment_type,
            employment.department,
            employment.designation,
            employment.joining_date || null,
            employment.experience_type,
            employment.work_location || null,
            id,
          ]
        );

        if (employmentResult.rowCount === 0) {
          await client.query(
            `INSERT INTO employment_details
             (employee_id, employment_type, department, designation,
              joining_date, experience_type, work_location)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              id,
              employment.employment_type,
              employment.department,
              employment.designation,
              employment.joining_date || null,
              employment.experience_type,
              employment.work_location || null,
            ]
          );
        }
      }

      await client.query(
        `DELETE FROM employee_education WHERE employee_id = $1`,
        [id]
      );

      for (const item of education) {
        await client.query(
          `INSERT INTO employee_education
           (employee_id, education_level, course_name, institution_name,
            completion_year)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            id,
            item.education_level,
            item.degree,
            item.college_university,
            item.graduation_year || null,
          ]
        );
      }

      await client.query(
        `DELETE FROM employee_experience WHERE employee_id = $1`,
        [id]
      );

      if (employment?.experience_type === "Experienced") {
        for (const item of experience) {
          if (!item.employment_start_date) {
            continue;
          }

          await client.query(
            `INSERT INTO employee_experience
             (employee_id, company_name, previous_role, previous_salary,
              employment_start_date, employment_end_date)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              id,
              item.company_name,
              item.previous_role,
              item.previous_salary || 0,
              item.employment_start_date,
              item.employment_end_date || null,
            ]
          );
        }
      }

      await client.query(
        `DELETE FROM employee_internships WHERE employee_id = $1`,
        [id]
      );

      for (const item of internships) {
        await client.query(
          `INSERT INTO employee_internships
           (employee_id, company_name, internship_role, start_date,
            end_date, internship_type)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            id,
            item.company_name,
            item.internship_role || item.role,
            item.start_date || null,
            item.end_date || null,
            item.internship_type,
          ]
        );
      }

      if (role) {
        const skills = Array.isArray(role.skills)
          ? role.skills
          : role.skills
            ? role.skills
                .split(",")
                .map((skill: string) => skill.trim())
                .filter(Boolean)
            : [];

        const roleResult = await client.query(
          `UPDATE employee_roles
           SET primary_role = $1, skills = $2
           WHERE employee_id = $3`,
          [role.primary_role, skills, id]
        );

        if (roleResult.rowCount === 0) {
          await client.query(
            `INSERT INTO employee_roles
             (employee_id, primary_role, skills)
             VALUES ($1, $2, $3)`,
            [id, role.primary_role, skills]
          );
        }
      }

      if (schedule) {
        const scheduleResult = await client.query(
          `UPDATE work_schedules
           SET working_days = $1,
               start_time = $2,
               end_time = $3,
               break_duration_minutes = $4
           WHERE employee_id = $5`,
          [
            schedule.working_days || [],
            schedule.start_time || null,
            schedule.end_time || null,
            schedule.break_duration_minutes ?? 0,
            id,
          ]
        );

        if (scheduleResult.rowCount === 0) {
          await client.query(
            `INSERT INTO work_schedules
             (employee_id, working_days, start_time, end_time,
              break_duration_minutes)
             VALUES ($1, $2, $3, $4, $5)`,
            [
              id,
              schedule.working_days || [],
              schedule.start_time || null,
              schedule.end_time || null,
              schedule.break_duration_minutes ?? 0,
            ]
          );
        }
      }

      if (payroll) {
        const payrollResult = await client.query(
          `UPDATE payroll_configs
           SET payroll_type = $1,
               basic_salary = $2,
               housing_allowance = $3,
               transport_allowance = $4,
               other_allowance = $5,
               overtime_rate = $6,
               deductions = $7
           WHERE employee_id = $8`,
          [
            payroll.payroll_type || "Monthly",
            payroll.basic_salary ?? 0,
            payroll.housing_allowance ?? 0,
            payroll.transport_allowance ?? 0,
            payroll.other_allowance ?? 0,
            payroll.overtime_rate ?? 0,
            payroll.deductions ?? 0,
            id,
          ]
        );

        if (payrollResult.rowCount === 0) {
          await client.query(
            `INSERT INTO payroll_configs
             (employee_id, payroll_type, basic_salary, housing_allowance,
              transport_allowance, other_allowance, overtime_rate, deductions)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              id,
              payroll.payroll_type || "Monthly",
              payroll.basic_salary ?? 0,
              payroll.housing_allowance ?? 0,
              payroll.transport_allowance ?? 0,
              payroll.other_allowance ?? 0,
              payroll.overtime_rate ?? 0,
              payroll.deductions ?? 0,
            ]
          );
        }
      }

      await client.query("COMMIT");

      return {
        message: "Employee updated successfully",
        employee_id: id,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}