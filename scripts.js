let attendees = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Not Checked In" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Checked In" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Not Checked In" },
];

const timesheet = [];

function renderAttendanceList() {
    const attendanceItems = document.getElementById('attendanceItems');
    attendanceItems.innerHTML = '';
    attendees.forEach(attendee => {
        const item = document.createElement('div');
        item.className = 'attendanceItem';
        item.innerHTML = `
            <img src="https://via.placeholder.com/40" alt="${attendee.name}">
            <span>${attendee.name}</span>
            <button class="checkButton ${attendee.status === 'Checked In' ? 'checkOutButton' : 'checkInButton'}" 
                    onclick="toggleStatus(${attendee.id})">
                ${attendee.status === 'Checked In' ? 'Check Out' : 'Check In'}
            </button>
        `;
        item.onclick = () => showProfile(attendee);
        attendanceItems.appendChild(item);
    });
}

function showProfile(attendee) {
    const profileDetails = document.getElementById('profileDetails');
    profileDetails.innerHTML = `
        <div class="profileHeader">
            <img src="https://via.placeholder.com/100" alt="${attendee.name}">
            <h2>${attendee.name}</h2>
        </div>
        <div class="profileDetails">
            <p><strong>Email:</strong> ${attendee.email}</p>
            <p><strong>Status:</strong> ${attendee.status}</p>
        </div>
    `;
}

function toggleStatus(id) {
    const attendee = attendees.find(a => a.id === id);
    const currentTime = new Date();
    if (attendee.status === 'Checked In') {
        attendee.status = 'Not Checked In';
        timesheet.push({ id: attendee.id, name: attendee.name, action: 'Check Out', time: currentTime });
    } else {
        attendee.status = 'Checked In';
        timesheet.push({ id: attendee.id, name: attendee.name, action: 'Check In', time: currentTime });
    }
    renderAttendanceList();
    showProfile(attendee);
    saveData();
}

function addAttendee() {
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    const newId = attendees.length + 1;
    attendees.push({ id: newId, name: newName, email: newEmail, status: "Not Checked In" });
    renderAttendanceList();
}

function saveData() {
    localStorage.setItem('attendees', JSON.stringify(attendees));
}

function loadData() {
    const storedData = localStorage.getItem('attendees');
    if (storedData) {
        attendees = JSON.parse(storedData);
    }
}

window.onload = function() {
    loadData();
    renderAttendanceList();
};
