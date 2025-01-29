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
      courseDiv.className = course.completed ? "completed" : "not-completed";
      
      const button = document.createElement("button");
      button.textContent = course.name;
      button.classList.add("course-button");
      button.addEventListener("click", () => displayCourseDetails(course));
      
      courseDiv.appendChild(button);
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

const dialog = document.getElementById("course-details");
const closeButton = document.getElementById("close-modal");
const modalContent = document.getElementById("modal-content");

function displayCourseDetails(course) {
  modalContent.innerHTML = `
    <h2>${course.name}</h2>
    <p><strong>Type:</strong> ${course.type}</p>
    <p><strong>Completed:</strong> ${course.completed ? "Yes" : "No"}</p>
  `;

  dialog.showModal();
}

closeButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
