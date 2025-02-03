
document.addEventListener('DOMContentLoaded', function () {
    const studentNameInput = document.getElementById('studentName');
    const studentImageInput = document.getElementById('studentImage');
    const studentGroupSelect = document.getElementById('studentGroup');
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');
    const studentTableBody = document.querySelector('#studentTable tbody');

    let students = [];
    document.getElementById('garan').addEventListener('input', function () {
        const searchQuery = this.value.toLowerCase(); // وەرگرتنی دەقەکە و گۆڕینی بە بچووک
        const rows = document.getElementById('studentTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
        // گەڕان بەدوای ناوەکان
        for (let i = 0; i < rows.length; i++) {
            const studentName = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
            if (studentName.includes(searchQuery)) {
                rows[i].style.display = ''; // نیشاندانی ڕیزەکە
            } else {
                rows[i].style.display = 'none'; // شاردنەوەی ڕیزەکە
            }
        }
    });
    

    saveButton.addEventListener('click', function () {
        const name = studentNameInput.value;
        const image = studentImageInput.files[0];
        const group = studentGroupSelect.value;

        if (name && image && group) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const student = {
                    name: name,
                    image: e.target.result,
                    group: group,
                    absences: 0
                };
                students.push(student);
                renderTable();
                studentNameInput.value = '';
                studentImageInput.value = '';
                studentGroupSelect.value = 'A';
            };
            reader.readAsDataURL(image);
        } else {
            alert('تکایە هەموو خانەکان پر بکەرەوە');
        }
    });

    deleteButton.addEventListener('click', function () {
        const selectedStudent = prompt('ناوی قوتابیەکە بنووسە بۆ سڕینەوە:');
        students = students.filter(student => student.name !== selectedStudent);
        renderTable();
    });

    function renderTable() {
        studentTableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td><img src="${student.image}" alt="${student.name}" class="img-thumbnail"></td>
                <td>${student.group}</td>
                <td>${student.absences}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="markAbsent(${index})">نەهاتن</button>
                </td>
            `;
            if (student.absences >= 5) {
                row.classList.add('absent-5');
            }
            if (student.absences >= 8) {
                row.classList.add('absent-8');
            }
            studentTableBody.appendChild(row);
        });
        
    }

    window.markAbsent = function (index) {
        students[index].absences++;
        renderTable();
    };
});