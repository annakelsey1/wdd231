document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;
});

const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('#animateMe');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const membersContainer = document.querySelector("#members-container");

fetchMemberData();

async function fetchMemberData() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMemberData(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMemberData(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');

        const gridContent = `
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <img src="${member.image}" alt="${member.name} Logo" width="100" height="100">
            <p><strong>Membership Level:</strong> ${member.membership_level}</p>
        `;

        const listContent = `
            <p><strong>${member.name}</strong></p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        `;

        memberDiv.dataset.gridContent = gridContent;
        memberDiv.dataset.listContent = listContent;
        memberDiv.innerHTML = gridContent;

        membersContainer.appendChild(memberDiv);
    });

    toggleContentView();
}

function toggleContentView() {
    const isListView = membersContainer.classList.contains("list");
    document.querySelectorAll(".member").forEach(member => {
        member.innerHTML = isListView ? member.dataset.listContent : member.dataset.gridContent;
    });
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    toggleContentView();
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    toggleContentView();
});
