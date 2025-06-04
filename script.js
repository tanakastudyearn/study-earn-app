// User state
let currentUser = {
    points: 500,
    coursesCompleted: 12,
    materialsUploaded: 8,
    streak: 5
};

// Course data
const courses = [
    {
        id: 1,
        title: "Web Development Basics",
        description: "Learn HTML, CSS, and JavaScript fundamentals",
        points: 50,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        duration: "4 weeks"
    },
    {
        id: 2,
        title: "Mobile App Development",
        description: "Build your first mobile application",
        points: 75,
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
        duration: "6 weeks"
    },
    {
        id: 3,
        title: "Data Science Fundamentals",
        description: "Master data analysis and visualization",
        points: 100,
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
        duration: "8 weeks"
    }
];

// Render course cards
function renderCourses() {
    const courseGrid = document.getElementById('courseGrid');
    courseGrid.innerHTML = courses.map(course => `
        <div class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <img class="h-48 w-full object-cover" src="${course.image}" alt="${course.title}">
            <div class="p-4">
                <h3 class="text-lg font-medium text-gray-900">${course.title}</h3>
                <p class="mt-1 text-sm text-gray-500">${course.description}</p>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                    <i class="far fa-clock mr-2"></i>
                    <span>${course.duration}</span>
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <span class="text-sm font-medium text-blue-600">${course.points} points</span>
                    <button onclick="startCourse(${course.id})" class="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                        Start Learning
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle file upload
function handleFileUpload(event) {
    const fileInput = event.target;
    const files = fileInput.files;
    
    if (files.length > 0) {
        const file = files[0];
        if (file.size > 50 * 1024 * 1024) { // 50MB limit
            alert('File size exceeds 50MB limit');
            return;
        }
        
        // Show upload progress
        const progressBar = document.querySelector('#uploadProgress div');
        const uploadProgress = document.getElementById('uploadProgress');
        uploadProgress.style.display = 'block';
        
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    currentUser.materialsUploaded++;
                    currentUser.points += 25;
                    updateStats();
                    uploadProgress.style.display = 'none';
                    progressBar.style.width = '0%';
                    alert('File uploaded successfully! Earned 25 points.');
                }, 500);
            }
        }, 200);
    }
}

// Start course
function startCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        if (confirm(`Start learning ${course.title}? You'll earn ${course.points} points upon completion.`)) {
            // Simulate course start
            const button = event.target;
            button.textContent = 'In Progress...';
            button.disabled = true;
            button.classList.add('bg-gray-100');
            
            // Update UI after a delay
            setTimeout(() => {
                button.textContent = 'Continue Learning';
                button.disabled = false;
                button.classList.remove('bg-gray-100');
            }, 1500);
        }
    }
}

// Update stats display
function updateStats() {
    document.getElementById('pointsDisplay').textContent = `${currentUser.points} Points`;
    document.getElementById('pointsTotal').textContent = currentUser.points;
    document.getElementById('coursesCompleted').textContent = currentUser.coursesCompleted;
    document.getElementById('materialsUploaded').textContent = currentUser.materialsUploaded;
    document.getElementById('streakDays').textContent = currentUser.streak;
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (email && password) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        updateStats();
        renderCourses();
    } else {
        alert('Please enter both email and password');
    }
}

// Initialize drag and drop for file upload
function initializeDragDrop() {
    const dropZone = document.getElementById('dropZone');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('border-blue-500', 'bg-blue-50');
    }

    function unhighlight(e) {
        dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    }
    
    dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const fileInput = document.getElementById('fileInput');
            fileInput.files = files;
            handleFileUpload({ target: fileInput });
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeDragDrop();
    
    // Hide main content initially
    document.getElementById('mainContent').style.display = 'none';
    
    // Add event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
});
