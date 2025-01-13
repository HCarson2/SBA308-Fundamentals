/*function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
    return {
        courseInfo,
        assignmentGroups,
        learnerSubmissions,
    };
}*/
function getLearnerData(courseInfo, assignmentGroups, learnerSubmissions) {
  if (
    !courseInfo ||
    !Array.isArray(assignmentGroups) ||
    !Array.isArray(learnerSubmissions)
  ) {
    throw new Error("Invalid input data format.");
  }

  // Validate assignment groups
  assignmentGroups.forEach((group) => {
    if (group.course_id !== courseInfo.id) {
      throw new Error(
        `AssignmentGroup ${group.id} does not belong to Course ${courseInfo.id}`
      );
    }
  });
  const currentDate = new Date();
  const learnerData = {};

  // Process each assignment group
  assignmentGroups.forEach((group) => {
    group.assignments.forEach((assignment) => {
      const { id: assignmentId, due_at, points_possible } = assignment;
      const dueDate = new Date(due_at);

      if (isNaN(points_possible) || points_possible <= 0) {
        throw new Error(
          `Invalid points_possible for Assignment ${assignmentId}`
        );
      }

      if (dueDate > currentDate) return; // Skip not-yet-due assignments

      // Process each learner's submission for the assignment
      learnerSubmissions
        .filter((sub) => sub.assignment_id === assignmentId)
        .forEach(({ learner_id, submission }) => {
          if (!learnerData[learner_id]) {
            learnerData[learner_id] = {
              id: learner_id,
              avg: 0,
              totalPoints: 0,
              totalWeighted: 0,
            };
          }

          const learner = learnerData[learner_id];
          const { submitted_at, score } = submission;
          const submittedDate = new Date(submitted_at);
          let adjustedScore = score;

          if (submittedDate > dueDate) {
          }

          const percentageScore = adjustedScore / points_possible;

          learner[assignmentId] = percentageScore * 100;
          learner.totalPoints += points_possible;
          learner.totalWeighted += adjustedScore;
        });
    });
  });
  // Calculate averages and format the output
  return Object.values(learnerData).map((learner) => {
    learner.avg = (learner.totalWeighted / learner.totalPoints) * 100;
    delete learner.totalPoints;
    delete learner.totalWeighted;
    return learner;
  });
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
        due_at: "2025-01-05",
        points_possible: 100,
      },
      {
        id: 102,
        name: "Assignment 2",
        due_at: "2025-01-10",
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
      submitted_at: "2025-01-04",
      score: 80,
    },
  },
  {
    learner_id: 1,
    assignment_id: 102,
    submission: {
      submitted_at: "2025-01-09",
      score: 190,
    },
  },
];

console.log(getLearnerData(courseInfo, assignmentGroups, learnerSubmissions));
