document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;
});

const courses = [
  { name: "CSE 110", type: "CSE", completed: true },
  { name: "WDD 130", type: "WDD", completed: true },
  { name: "CSE 111", type: "CSE", completed: true },
  { name: "CSE 210", type: "CSE", completed: true },
  { name: "WDD 131", type: "WDD", completed: true },
  { name: "WDD 231", type: "WDD", completed: false },
];

function displayCourses(courseList) {
  const coursesContainer = document.getElementById("courses");
  coursesContainer.innerHTML = "";
  courseList.forEach(course => {
      const courseDiv = document.createElement("div");
      courseDiv.textContent = course.name;
      courseDiv.className = course.completed ? "completed" : "not-completed";
      coursesContainer.appendChild(courseDiv);
  });
}

function filterCourses(type) {
  const filteredCourses = type === 'all' ? courses : courses.filter(course => course.type === type);
  displayCourses(filteredCourses);
}

displayCourses(courses);

const hamburgerButton = document.getElementById("hamburger");
const navList = document.querySelector("nav ul.nav-list");

hamburgerButton.addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("active");
  hamburgerButton.classList.toggle("active");
});



