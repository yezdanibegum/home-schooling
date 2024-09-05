const apiUrl = 'http://localhost:3000/attendees';

async function fetchAttendees() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

async function renderAttendanceList() {
    const attendees = await fetchAttendees();
    const attendanceItems = document.getElementById('attendanceItems');
    attendanceItems.innerHTML = '';
    attendees.forEach(attendee => {
        const item = document.createElement('div');
        item.className = 'attendanceItem';
        item.innerHTML = `
            <img src="https://via.placeholder.com/40" alt="${attendee.name}">
            <span>${attendee.name}</span>
            <button class="checkButton ${attendee.status === 'Checked In' ? 'checkOutButton' : 'checkInButton'}" 
                    onclick="toggleStatus('${attendee._id}', '${attendee.status}')">
                ${attendee.status === 'Checked In' ? 'Check Out' : 'Check In'}
            </button>
        `;
        item.onclick = () => showProfile(attendee);
        attendanceItems.appendChild(item);
    });
}

async function showProfile(attendee) {
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

async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'Checked In' ? 'Not Checked In' : 'Checked In';
    await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
    });
    renderAttendanceList();
}

async function addAttendee() {
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName, email: newEmail })
    });
    renderAttendanceList();
}

window.onload = function() {
    renderAttendanceList();
};
