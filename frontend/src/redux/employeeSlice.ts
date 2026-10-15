import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as employeeService from "../service/employeeService";

export const submitEmployee = createAsyncThunk(
  "employee/submitEmployee",
  async (data: any, { rejectWithValue }) => {
    try {
      return await employeeService.createEmployee(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Employee onboarding failed",
      );
    }
  },
);

export const getEmployees = createAsyncThunk(
  "employee/getEmployee",
  async (_, { rejectWithValue }) => {
    try {
      return await employeeService.getEmployee();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Employee Fetching is failed",
      );
    }
  },
);
export const deleteEmployeeById = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number) => {
    await employeeService.DeleteEmployee(id);
    return id;
  },
);
const initialState = {
  employee: {} as Record<string, any>,
  employees: [] as any[],
  employment: {} as Record<string, any>,

  education: [
    {
      college_university: "",
      degree: "",
      field_of_study: "",
      graduation_year: "",
      education_level: "",
    },
  ],

  experience: [
    {
      company_name: "",
      previous_role: "",
      previous_salary: "",
      employment_start_date: "",
      employment_end_date: "",
    },
  ],

  internships: [
    {
      company_name: "",
      internship_role: "",
      start_date: "",
      end_date: "",
      internship_type: "",
    },
  ],

  role: {} as Record<string, any>,
  schedule: {} as Record<string, any>,
  payroll: {} as Record<string, any>,

  loading: false,
  error: null as string | null,
  success: false,
  employeeId: null as string | null,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {
    setEmployeeField: (state, action) => {
      state.employee[action.payload.name] = action.payload.value;
    },

    setEmployeeForm: (state, action) => {
      state.employee = action.payload.employee;
      state.employment = action.payload.employment;
      state.education = action.payload.education;
      state.experience = action.payload.experience;
      state.internships = action.payload.internships;
      state.role = action.payload.role;
      state.schedule = action.payload.schedule;
      state.payroll = action.payload.payroll;
    },

    setEmploymentField: (state, action) => {
      state.employment[action.payload.name] = action.payload.value;
    },

    setEducation: (state, action) => {
      state.education = action.payload;
    },

    setExperience: (state, action) => {
      state.experience = action.payload;
    },

    setInternship: (state, action) => {
      state.internships = action.payload;
    },

    setRoleField: (state, action) => {
      state.role[action.payload.name] = action.payload.value;
    },

    setScheduleField: (state, action) => {
      state.schedule[action.payload.name] = action.payload.value;
    },

    setPayrollField: (state, action) => {
      state.payroll[action.payload.name] = action.payload.value;
    },

    resetEmployeeForm: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(submitEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(submitEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.employeeId = action.payload.employee_id;
      })

      .addCase(submitEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })

      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteEmployeeById.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload,
        );
      });
  },
});

export const {
  setEmployeeField,
  setPayrollField,
  setEmployeeForm,
  resetEmployeeForm,
  setScheduleField,
  setEmploymentField,
  setEducation,
  setExperience,
  setInternship,
  setRoleField,
} = employeeSlice.actions;

export default employeeSlice.reducer;
