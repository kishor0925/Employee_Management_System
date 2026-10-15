import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { setScheduleField } from "../../redux/employeeSlice";

function WorkSchedule() {
  const dispatch = useDispatch<AppDispatch>();

  const schedule = useSelector((state: RootState) => state.employee.schedule);

  const fields = [
    { label: "Start Time", name: "start_time", type: "time" },
    { label: "End Time", name: "end_time", type: "time" },
    {
      label: "Break Duration (Minutes)",
      name: "break_duration_minutes",
      type: "number",
    },
  ];

  const workingDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (name: string, value: string | number) => {
    dispatch(setScheduleField({ name, value }));
  };

  const handleWorkingDay = (day: string, checked: boolean) => {
    let days = schedule.working_days || [];

    if (checked) {
      days = [...days, day];
    } else {
      days = days.filter((item: string) => item !== day);
    }

    dispatch(
      setScheduleField({
        name: "working_days",
        value: days,
      }),
    );
  };

  return (
    <div className="work-schedule">
      <div className="common-heading">
        <div>
          <h3>Work Schedule</h3>
          <p>Set working hours, break duration, and working days.</p>
        </div>
      </div>

      <div className="schedule-grid">
        {fields.map((field) => (
          <div className="schedule-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>

            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={schedule[field.name] ?? ""}
              onChange={(e) =>
                handleChange(
                  field.name,
                  field.type === "number"
                    ? e.target.value === ""
                      ? ""
                      : Number(e.target.value)
                    : e.target.value,
                )
              }
            />
          </div>
        ))}
      </div>

      <div className="schedule-days">
        <label className="schedule-days-label">Working Days</label>

        <div className="schedule-days-grid">
          {workingDays.map((day) => (
            <div className="schedule-day" key={day}>
              <input
                id={day}
                type="checkbox"
                checked={(schedule.working_days || []).includes(day)}
                onChange={(e) => handleWorkingDay(day, e.target.checked)}
              />
              <label htmlFor={day}>{day}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkSchedule;
