"use client";

import { useMemo, useState } from "react";

// Standard US 4.0 letter-grade → grade-point mapping.
const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0, A: 4.0, "A-": 3.7,
  "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7,
  "D+": 1.3, D: 1.0, "D-": 0.7,
  F: 0.0,
};
const GRADES = Object.keys(GRADE_POINTS);

interface Course { name: string; grade: string; credits: number }

export function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: "Course 1", grade: "A", credits: 3 },
    { name: "Course 2", grade: "B+", credits: 4 },
    { name: "Course 3", grade: "A-", credits: 3 },
  ]);

  const { gpa, totalCredits } = useMemo(() => {
    let points = 0;
    let credits = 0;
    for (const c of courses) {
      const cr = Math.max(0, c.credits || 0);
      points += (GRADE_POINTS[c.grade] ?? 0) * cr;
      credits += cr;
    }
    return { gpa: credits ? points / credits : 0, totalCredits: credits };
  }, [courses]);

  const update = (i: number, patch: Partial<Course>) =>
    setCourses(courses.map((c, j) => (j === i ? { ...c, ...patch } : c)));

  return (
    <div>
      {courses.map((c, i) => (
        <div className="row" key={i}>
          <div className="field" style={{ flex: 2 }}>
            <label>{i === 0 ? "Course" : ""}</label>
            <input className="input" value={c.name} onChange={(e) => update(i, { name: e.target.value })} />
          </div>
          <div className="field">
            <label>{i === 0 ? "Grade" : ""}</label>
            <select className="select" value={c.grade} onChange={(e) => update(i, { grade: e.target.value })}>
              {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="field">
            <label>{i === 0 ? "Credits" : ""}</label>
            <input className="input" type="number" min={0} value={c.credits} onChange={(e) => update(i, { credits: Number(e.target.value) })} />
          </div>
          <div className="field" style={{ flex: "0 0 auto", justifyContent: "flex-end" }}>
            <label>{i === 0 ? " " : ""}</label>
            <button type="button" className="btn" onClick={() => setCourses(courses.filter((_, j) => j !== i))} disabled={courses.length === 1} aria-label="Remove course">✕</button>
          </div>
        </div>
      ))}
      <div className="btn-row" style={{ marginBottom: 12 }}>
        <button type="button" className="btn" onClick={() => setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: "A", credits: 3 }])}>+ Add course</button>
      </div>
      <div className="stat-row">
        <div className="stat"><div className="num">{gpa.toFixed(2)}</div><div className="lbl">GPA (4.0 scale)</div></div>
        <div className="stat"><div className="num">{totalCredits}</div><div className="lbl">Total credits</div></div>
      </div>
    </div>
  );
}
