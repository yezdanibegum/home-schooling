const apiUrl = 'https://home-schooling.onrender.com/attendees';

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
           <h2>${attendee.name}</h2>
           <p><strong>Email:</strong> ${attendee.email}</p>
           <p><strong>Status:</strong> ${attendee.status}</p>
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

   async function addAttendee(event) {
       event.preventDefault();
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
       document.getElementById('addAttendeeForm').reset();
   }

   document.addEventListener('DOMContentLoaded', function() {
       renderAttendanceList();
       document.getElementById('addAttendeeForm').addEventListener('submit', addAttendee);
   });
