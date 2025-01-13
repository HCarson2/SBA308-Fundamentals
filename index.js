function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
    return {
        courseInfo,
        assignmentGroups,
        learnerSubmissions,
    };
}
//Course info data  type
const courseInfo = { id: 1, name: "SBA JavaScript Fundamentals" };

//Assignment Group data type
const assignmentGroups = [
  {
    id: 1,
    name: "Homework",
    course_id: 1,
    group_weight: 50,
    assignments: [
      {
        id: 101,
        name: "Assignment 1",
        due_at: "2025-01-12",
        points_possible: 100,
      },
      {
        id: 102,
        name: "Assignment 2",
        due_at: "2025-01-12",
        points_possible: 200,
      },
    ],
  },
];
//Learner Submmission data type
const learnerSubmissions = [
  {
    learner_id: 1,
    assignment_id: 101,
    submission: {
      submitted_at: "2025-01-12",
      score: 80,
    },
  },
  {
    learner_id: 1,
    assignment_id: 102,
    submission: {
      submitted_at: "2025-01-12",
      score: 190,
    },
  }
];

console.log(getLearnerData(courseInfo, assignmentGroups, learnerSubmissions));
