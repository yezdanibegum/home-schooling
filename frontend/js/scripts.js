const apiUrl = '/api/attendees';

async function fetchAttendees() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch attendees:", error);
        showNotification("Failed to fetch attendees. Please try again later.", "error");
        return [];
    }
}

async function renderAttendanceList(searchTerm = '') {
    const attendees = await fetchAttendees();
    const attendanceItems = document.getElementById('attendanceItems');
    attendanceItems.innerHTML = '';
    
    const filteredAttendees = attendees.filter(attendee => 
        attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredAttendees.forEach(attendee => {
        const item = document.createElement('div');
        item.className = 'attendanceItem';
        item.innerHTML = `
            <span>${attendee.name}</span>
            <button class="checkButton ${attendee.status === 'Checked In' ? 'checkOutButton' : 'checkInButton'}" 
                    onclick="toggleStatus('${attendee._id}', '${attendee.status}')">
                <i class="fas ${attendee.status === 'Checked In' ? 'fa-sign-out-alt' : 'fa-sign-in-alt'}"></i>
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
        <h3>${attendee.name}</h3>
        <p><strong>Email:</strong> ${attendee.email}</p>
        <p><strong>Status:</strong> ${attendee.status}</p>
        <p><strong>Check-in Times:</strong></p>
        <ul>
            ${attendee.checkInTimes.map(time => `<li>${new Date(time).toLocaleString()}</li>`).join('')}
        </ul>
        <p><strong>Check-out Times:</strong></p>
        <ul>
            ${attendee.checkOutTimes.map(time => `<li>${new Date(time).toLocaleString()}</li>`).join('')}
        </ul>
    `;
}

async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'Checked In' ? 'Not Checked In' : 'Checked In';
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        renderAttendanceList();
        showNotification(`Successfully ${newStatus === 'Checked In' ? 'checked in' : 'checked out'} attendee.`, "success");
    } catch (error) {
        console.error("Could not update attendee status:", error);
        showNotification("Failed to update attendee status. Please try again.", "error");
    }
}

async function addAttendee(event) {
    event.preventDefault();
    const newName = document.getElementById('newName').value;
    const newEmail = document.getElementById('newEmail').value;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName, email: newEmail })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        renderAttendanceList();
        document.getElementById('addAttendeeForm').reset();
        showNotification("Successfully added new attendee.", "success");
    } catch (error) {
        console.error("Could not add attendee:", error);
        showNotification("Failed to add attendee. Please try again.", "error");
    }
}

function showNotification(message, type = "info") {
    const notificationContainer = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    renderAttendanceList();
    document.getElementById('addAttendeeForm').addEventListener('submit', addAttendee);
    document.getElementById('searchBar').addEventListener('input', (e) => renderAttendanceList(e.target.value));
});
