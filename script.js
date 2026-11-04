
let patients = JSON.parse(localStorage.getItem("patients")) || [];

const form = document.getElementById("patientForm");
const patientList = document.getElementById("patientList");
const search = document.getElementById("search");

function displayPatients(data = patients) {
    patientList.innerHTML = "";

    data.forEach((patient, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(patient.name)}</td>
            <td>${escapeHTML(patient.age)}</td>
            <td>${escapeHTML(patient.gender)}</td>
            <td>${escapeHTML(patient.phone)}</td>
            <td>${escapeHTML(patient.disease)}</td>
            <td>${escapeHTML(patient.date)}</td>
            <td>
                <button class="edit" onclick="editPatient(${index})">
                    Edit
                </button>
                <button class="delete" onclick="deletePatient(${index})">
                    Delete
                </button>
            </td>
        `;

        patientList.appendChild(row);
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const editIndex = document.getElementById("editIndex").value;

    const patient = {
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value.trim(),
        disease: document.getElementById("disease").value.trim(),
        date: document.getElementById("date").value
    };

    if (editIndex === "") {
        patients.push(patient);
    } else {
        patients[Number(editIndex)] = patient;
    }

    localStorage.setItem("patients", JSON.stringify(patients));

    form.reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("submitBtn").textContent = "Add Patient";

    displayPatients();
});

function editPatient(index) {
    const patient = patients[index];

    document.getElementById("name").value = patient.name;
    document.getElementById("age").value = patient.age;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("disease").value = patient.disease;
    document.getElementById("date").value = patient.date;

    document.getElementById("editIndex").value = index;
    document.getElementById("submitBtn").textContent = "Update Patient";
}

function deletePatient(index) {
    if (confirm("Are you sure you want to delete this patient?")) {
        patients.splice(index, 1);

        localStorage.setItem("patients", JSON.stringify(patients));

        displayPatients();
    }
}

search.addEventListener("input", function() {
    const value = search.value.toLowerCase();

    const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(value)
    );

    displayPatients(filtered);
});

displayPatients();
