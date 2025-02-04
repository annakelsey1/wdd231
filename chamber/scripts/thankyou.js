document.addEventListener("DOMContentLoaded", () => {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) || "N/A";
    }

    // List of form fields
    const fields = ["firstName", "lastName", "title", "email", "telephone", "organization", "membership", "organizationDesc"];

    // Populate the fields on the Thank You page
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.textContent = getQueryParam(field);
        }
    });

    // Update the current year and last modified date
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last updated: ${new Date(document.lastModified).toLocaleString()}`;
});
