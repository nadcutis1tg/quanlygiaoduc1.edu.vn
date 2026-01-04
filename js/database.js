// Database Module - Dữ liệu thực tế đầy đủ
const Database = {
    // Danh sách sinh viên theo lớp
    students: [],
    teachers: [],
    classes: [],
    schedules: [],
    finances: [],
    research: [],
    notifications: [],

    // Initialize database
    init() {
        this.initClasses();
        this.initStudents();
        this.initTeachers();
        this.initSchedules();
        this.initFinances();
        this.initResearch();
        this.initNotifications();
    },

    // Khởi tạo danh sách lớp (Đại học - Theo ngành và năm học)
    initClasses() {
        this.classes = [
            // Công nghệ Thông tin - 3 lớp mỗi năm
            { id: 'L001', name: 'CNTT-K21A', faculty: 'Công nghệ Thông tin', year: 4, totalStudents: 0, advisor: 'GV001' },
            { id: 'L002', name: 'CNTT-K21B', faculty: 'Công nghệ Thông tin', year: 4, totalStudents: 0, advisor: 'GV002' },
            { id: 'L003', name: 'CNTT-K21C', faculty: 'Công nghệ Thông tin', year: 4, totalStudents: 0, advisor: 'GV003' },
            { id: 'L004', name: 'CNTT-K22A', faculty: 'Công nghệ Thông tin', year: 3, totalStudents: 0, advisor: 'GV004' },
            { id: 'L005', name: 'CNTT-K22B', faculty: 'Công nghệ Thông tin', year: 3, totalStudents: 0, advisor: 'GV005' },
            { id: 'L006', name: 'CNTT-K23A', faculty: 'Công nghệ Thông tin', year: 2, totalStudents: 0, advisor: 'GV006' },
            { id: 'L007', name: 'CNTT-K23B', faculty: 'Công nghệ Thông tin', year: 2, totalStudents: 0, advisor: 'GV007' },
            { id: 'L008', name: 'CNTT-K24A', faculty: 'Công nghệ Thông tin', year: 1, totalStudents: 0, advisor: 'GV008' },
            { id: 'L009', name: 'CNTT-K24B', faculty: 'Công nghệ Thông tin', year: 1, totalStudents: 0, advisor: 'GV009' },
            
            // Quản trị Kinh doanh - 2 lớp mỗi năm
            { id: 'L010', name: 'QTKD-K21A', faculty: 'Quản trị Kinh doanh', year: 4, totalStudents: 0, advisor: 'GV010' },
            { id: 'L011', name: 'QTKD-K21B', faculty: 'Quản trị Kinh doanh', year: 4, totalStudents: 0, advisor: 'GV011' },
            { id: 'L012', name: 'QTKD-K22A', faculty: 'Quản trị Kinh doanh', year: 3, totalStudents: 0, advisor: 'GV012' },
            { id: 'L013', name: 'QTKD-K22B', faculty: 'Quản trị Kinh doanh', year: 3, totalStudents: 0, advisor: 'GV013' },
            { id: 'L014', name: 'QTKD-K23A', faculty: 'Quản trị Kinh doanh', year: 2, totalStudents: 0, advisor: 'GV014' },
            { id: 'L015', name: 'QTKD-K23B', faculty: 'Quản trị Kinh doanh', year: 2, totalStudents: 0, advisor: 'GV015' },
            { id: 'L016', name: 'QTKD-K24A', faculty: 'Quản trị Kinh doanh', year: 1, totalStudents: 0, advisor: 'GV016' },
            { id: 'L017', name: 'QTKD-K24B', faculty: 'Quản trị Kinh doanh', year: 1, totalStudents: 0, advisor: 'GV017' },
            
            // Kế toán - 2 lớp mỗi năm
            { id: 'L018', name: 'KT-K21A', faculty: 'Kế toán', year: 4, totalStudents: 0, advisor: 'GV018' },
            { id: 'L019', name: 'KT-K21B', faculty: 'Kế toán', year: 4, totalStudents: 0, advisor: 'GV019' },
            { id: 'L020', name: 'KT-K22A', faculty: 'Kế toán', year: 3, totalStudents: 0, advisor: 'GV020' },
            { id: 'L021', name: 'KT-K22B', faculty: 'Kế toán', year: 3, totalStudents: 0, advisor: 'GV021' },
            { id: 'L022', name: 'KT-K23A', faculty: 'Kế toán', year: 2, totalStudents: 0, advisor: 'GV022' },
            { id: 'L023', name: 'KT-K23B', faculty: 'Kế toán', year: 2, totalStudents: 0, advisor: 'GV023' },
            { id: 'L024', name: 'KT-K24A', faculty: 'Kế toán', year: 1, totalStudents: 0, advisor: 'GV024' },
            { id: 'L025', name: 'KT-K24B', faculty: 'Kế toán', year: 1, totalStudents: 0, advisor: 'GV025' },
            
            // Ngôn ngữ Anh - 2 lớp mỗi năm
            { id: 'L026', name: 'NNA-K22A', faculty: 'Ngôn ngữ Anh', year: 3, totalStudents: 0, advisor: 'GV026' },
            { id: 'L027', name: 'NNA-K22B', faculty: 'Ngôn ngữ Anh', year: 3, totalStudents: 0, advisor: 'GV027' },
            { id: 'L028', name: 'NNA-K23A', faculty: 'Ngôn ngữ Anh', year: 2, totalStudents: 0, advisor: 'GV028' },
            { id: 'L029', name: 'NNA-K23B', faculty: 'Ngôn ngữ Anh', year: 2, totalStudents: 0, advisor: 'GV029' },
            { id: 'L030', name: 'NNA-K24A', faculty: 'Ngôn ngữ Anh', year: 1, totalStudents: 0, advisor: 'GV030' },
            { id: 'L031', name: 'NNA-K24B', faculty: 'Ngôn ngữ Anh', year: 1, totalStudents: 0, advisor: 'GV031' },
            
            // Kỹ thuật Cơ khí - 2 lớp mỗi năm
            { id: 'L032', name: 'KTCK-K22A', faculty: 'Kỹ thuật Cơ khí', year: 3, totalStudents: 0, advisor: 'GV032' },
            { id: 'L033', name: 'KTCK-K22B', faculty: 'Kỹ thuật Cơ khí', year: 3, totalStudents: 0, advisor: 'GV033' },
            { id: 'L034', name: 'KTCK-K23A', faculty: 'Kỹ thuật Cơ khí', year: 2, totalStudents: 0, advisor: 'GV034' },
            { id: 'L035', name: 'KTCK-K23B', faculty: 'Kỹ thuật Cơ khí', year: 2, totalStudents: 0, advisor: 'GV035' },
            { id: 'L036', name: 'KTCK-K24A', faculty: 'Kỹ thuật Cơ khí', year: 1, totalStudents: 0, advisor: 'GV036' },
            { id: 'L037', name: 'KTCK-K24B', faculty: 'Kỹ thuật Cơ khí', year: 1, totalStudents: 0, advisor: 'GV037' },
            
            // Y Dược - 2 lớp mỗi năm
            { id: 'L038', name: 'YD-K22A', faculty: 'Y Dược', year: 3, totalStudents: 0, advisor: 'GV038' },
            { id: 'L039', name: 'YD-K22B', faculty: 'Y Dược', year: 3, totalStudents: 0, advisor: 'GV039' },
            { id: 'L040', name: 'YD-K23A', faculty: 'Y Dược', year: 2, totalStudents: 0, advisor: 'GV040' },
            { id: 'L041', name: 'YD-K23B', faculty: 'Y Dược', year: 2, totalStudents: 0, advisor: 'GV041' },
            { id: 'L042', name: 'YD-K24A', faculty: 'Y Dược', year: 1, totalStudents: 0, advisor: 'GV042' },
            { id: 'L043', name: 'YD-K24B', faculty: 'Y Dược', year: 1, totalStudents: 0, advisor: 'GV043' }
        ];
    },

    // Khởi tạo danh sách sinh viên
    initStudents() {
        const firstNames = ['An', 'Bình', 'Châu', 'Dũng', 'Hà', 'Hương', 'Khoa', 'Linh', 'Minh', 'Nam', 'Phương', 'Quân', 'Thảo', 'Tú', 'Vy', 'Anh', 'Bảo', 'Cường', 'Đạt', 'Giang', 'Hiếu', 'Khánh', 'Long', 'Mai', 'Ngọc', 'Phúc', 'Quỳnh', 'Sơn', 'Trang', 'Vân'];
        const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
        const middleNames = ['Văn', 'Thị', 'Minh', 'Hoàng', 'Thanh', 'Thu', 'Hữu', 'Đức', 'Quốc', 'Anh', 'Thành'];
        
        let studentId = 1;
        
        this.classes.forEach(classInfo => {
            const studentsPerClass = 70; // 70 sinh viên mỗi lớp
            
            for (let i = 0; i < studentsPerClass; i++) {
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
                const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                const fullName = `${lastName} ${middleName} ${firstName}`;
                
                const gpa = (Math.random() * 2 + 2).toFixed(2); // GPA từ 2.0 - 4.0
                
                // Tính attendance dựa trên activities (tự động)
                const activitiesCount = Math.floor(Math.random() * 4); // 0-3 hoạt động
                const baseAttendance = 70 + Math.floor(Math.random() * 30); // 70-100%
                const activityBonus = activitiesCount * 5; // +5% mỗi hoạt động
                const attendance = Math.min(100, baseAttendance + activityBonus);
                
                // Status dựa trên GPA và attendance
                let status = 'active';
                if (gpa < 2.0 || attendance < 60) {
                    status = 'at-risk';
                } else if (gpa < 2.5 && attendance < 75) {
                    status = 'at-risk';
                } else if (gpa >= 3.5 && attendance >= 90) {
                    status = 'excellent';
                }
                
                // Năm sinh dựa trên năm học
                const birthYear = 2024 - 18 - classInfo.year;
                
                this.students.push({
                    id: `SV${String(studentId).padStart(4, '0')}`,
                    name: fullName,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&color=fff`,
                    class: classInfo.name,
                    classId: classInfo.id,
                    faculty: classInfo.faculty,
                    year: classInfo.year,
                    email: `${this.removeAccents(fullName).toLowerCase().replace(/\s/g, '')}${studentId}@student.edu.vn`,
                    phone: `09${Math.floor(Math.random() * 100000000)}`,
                    dateOfBirth: `${birthYear}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
                    address: `${Math.floor(Math.random() * 500) + 1} Đường ${['Láng', 'Giải Phóng', 'Nguyễn Trãi', 'Cầu Giấy', 'Đại Cồ Việt', 'Xuân Thủy'][Math.floor(Math.random() * 6)]}, Hà Nội`,
                    parentName: `${lastName} ${middleNames[Math.floor(Math.random() * middleNames.length)]} ${['Anh', 'Bình', 'Cường', 'Dũng', 'Hùng'][Math.floor(Math.random() * 5)]}`,
                    parentPhone: `098${Math.floor(Math.random() * 10000000)}`,
                    parentEmail: `phuhuyn${studentId}@gmail.com`,
                    enrollmentDate: `${2024 - classInfo.year}-09-01`,
                    gpa: parseFloat(gpa),
                    attendance: attendance,
                    credits: classInfo.year * 30 + Math.floor(Math.random() * 20),
                    status: status,
                    grades: this.generateGrades(classInfo.faculty),
                    attendanceHistory: this.generateAttendanceHistory(attendance),
                    behaviorNotes: this.generateBehaviorNotes(),
                    socialInteractions: {
                        friendsCount: Math.floor(Math.random() * 20) + 5,
                        groupParticipation: activitiesCount,
                        isolationScore: activitiesCount === 0 ? Math.random() * 0.8 : Math.random() * 0.3
                    },
                    financialStatus: {
                        tuitionPaid: Math.random() > 0.2,
                        hasDebt: Math.random() < 0.2,
                        scholarshipEligible: gpa >= 3.5,
                        totalPaid: 15000000,
                        totalDue: Math.random() < 0.2 ? 5000000 : 0
                    },
                    healthData: this.generateHealthData(),
                    activities: this.generateActivities(activitiesCount),
                    goals: this.generateGoals()
                });
                
                studentId++;
            }
            
            classInfo.totalStudents = studentsPerClass;
        });
    },

    generateGrades(faculty) {
        // Môn học theo khoa
        let subjects = [];
        
        if (faculty === 'Công nghệ Thông tin') {
            subjects = ['Lập trình C++', 'Cấu trúc dữ liệu', 'Cơ sở dữ liệu', 'Mạng máy tính', 'Hệ điều hành', 'Toán rời rạc', 'Tiếng Anh chuyên ngành', 'Giáo dục thể chất'];
        } else if (faculty === 'Quản trị Kinh doanh') {
            subjects = ['Quản trị học', 'Marketing căn bản', 'Kinh tế vi mô', 'Kinh tế vĩ mô', 'Kế toán quản trị', 'Quản trị nhân lực', 'Tiếng Anh thương mại', 'Giáo dục thể chất'];
        } else if (faculty === 'Kế toán') {
            subjects = ['Kế toán tài chính', 'Kế toán quản trị', 'Kiểm toán', 'Thuế', 'Phân tích tài chính', 'Kế toán chi phí', 'Tiếng Anh chuyên ngành', 'Giáo dục thể chất'];
        } else if (faculty === 'Ngôn ngữ Anh') {
            subjects = ['Ngữ pháp', 'Nghe hiểu', 'Đọc hiểu', 'Viết', 'Nói', 'Văn học Anh-Mỹ', 'Dịch thuật', 'Giáo dục thể chất'];
        } else {
            subjects = ['Môn 1', 'Môn 2', 'Môn 3', 'Môn 4', 'Môn 5', 'Môn 6', 'Tiếng Anh', 'Giáo dục thể chất'];
        }
        
        const trends = ['up', 'down', 'stable'];
        
        return subjects.map(subject => ({
            subject: subject,
            score: (Math.random() * 4 + 6).toFixed(1),
            trend: trends[Math.floor(Math.random() * trends.length)],
            semester: 1,
            year: 2024
        }));
    },

    generateAttendanceHistory(attendanceRate) {
        const history = [];
        const statuses = ['present', 'absent', 'late'];
        const weights = attendanceRate >= 90 ? [0.9, 0.05, 0.05] : attendanceRate >= 75 ? [0.75, 0.15, 0.1] : [0.65, 0.25, 0.1];
        
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const rand = Math.random();
            let status = 'present';
            if (rand < weights[2]) status = 'late';
            else if (rand < weights[1] + weights[2]) status = 'absent';
            
            history.push({
                date: date.toISOString().split('T')[0],
                status: status
            });
        }
        
        return history;
    },

    generateBehaviorNotes() {
        const positiveNotes = [
            'Tham gia tích cực vào bài thảo luận',
            'Giúp đỡ bạn học yếu',
            'Hoàn thành bài tập đúng hạn',
            'Tham gia hoạt động ngoại khóa',
            'Có tinh thần trách nhiệm cao'
        ];
        
        const negativeNotes = [
            'Nộp bài tập trễ',
            'Vắng học không phép',
            'Quên mang sách giáo khoa',
            'Gây mất trật tự trong lớp',
            'Không tập trung trong giờ học'
        ];
        
        const notes = [];
        const noteCount = Math.floor(Math.random() * 5) + 2;
        
        for (let i = 0; i < noteCount; i++) {
            const isPositive = Math.random() > 0.4;
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 60));
            
            notes.push({
                id: i + 1,
                date: date.toISOString().split('T')[0],
                note: isPositive ? positiveNotes[Math.floor(Math.random() * positiveNotes.length)] : negativeNotes[Math.floor(Math.random() * negativeNotes.length)],
                type: isPositive ? 'positive' : 'negative',
                teacher: `Giáo viên ${['Toán', 'Văn', 'Anh', 'Lý'][Math.floor(Math.random() * 4)]}`
            });
        }
        
        return notes;
    },

    generateHealthData() {
        return {
            physical: {
                score: Math.floor(Math.random() * 30) + 70,
                status: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
                lastCheckup: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            mental: {
                score: Math.floor(Math.random() * 30) + 60,
                status: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)],
                concerns: Math.random() > 0.7 ? ['Stress học tập'] : []
            },
            sleep: {
                average: (Math.random() * 2 + 6).toFixed(1),
                recommended: 8,
                quality: ['excellent', 'good', 'fair'][Math.floor(Math.random() * 3)]
            },
            exercise: {
                frequency: Math.floor(Math.random() * 5),
                recommended: 4,
                activities: ['Bóng đá', 'Bơi lội', 'Chạy bộ'].slice(0, Math.floor(Math.random() * 3) + 1)
            }
        };
    },

    generateActivities(count) {
        const activities = [
            { name: 'CLB Robotics', role: 'Thành viên' },
            { name: 'Đội tuyển Olympic Tin học', role: 'Đội trưởng' },
            { name: 'CLB Tiếng Anh', role: 'Thành viên' },
            { name: 'Đội tuyển Toán', role: 'Thành viên' },
            { name: 'Tình nguyện Mùa hè Xanh', role: 'Tình nguyện viên' },
            { name: 'CLB Kinh doanh', role: 'Thành viên' },
            { name: 'Đội tuyển Bóng đá', role: 'Cầu thủ' },
            { name: 'CLB Âm nhạc', role: 'Thành viên' }
        ];
        
        return activities.slice(0, count).map((act, i) => ({
            id: i + 1,
            ...act,
            joined: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            hours: Math.floor(Math.random() * 50) + 10,
            achievements: Math.random() > 0.5 ? ['Giải ' + ['nhất', 'nhì', 'ba'][Math.floor(Math.random() * 3)] + ' cấp trường'] : []
        }));
    },

    generateGoals() {
        const goals = [
            { title: 'Nâng GPA lên 3.5', category: 'academic', priority: 'high' },
            { title: 'Tham gia đầy đủ các buổi học', category: 'attendance', priority: 'high' },
            { title: 'Hoàn thành dự án Khoa học', category: 'academic', priority: 'medium' }
        ];
        
        return goals.slice(0, Math.floor(Math.random() * 3) + 1).map((goal, i) => ({
            id: i + 1,
            ...goal,
            deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            progress: Math.floor(Math.random() * 100),
            status: Math.random() > 0.8 ? 'completed' : 'in-progress'
        }));
    },

    removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    },

    // Methods
    getStudent(id) {
        return this.students.find(s => s.id === id);
    },

    getAllStudents() {
        return this.students;
    },

    getStudentsByClass(className) {
        return this.students.filter(s => s.class === className);
    },

    getClassAverage(className) {
        const students = this.getStudentsByClass(className);
        if (students.length === 0) return { gpa: 0, attendance: 0, totalStudents: 0 };
        
        const avgGPA = students.reduce((sum, s) => sum + s.gpa, 0) / students.length;
        const avgAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / students.length;
        
        return {
            gpa: avgGPA,
            attendance: avgAttendance,
            totalStudents: students.length
        };
    },

    updateStudent(id, data) {
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
            this.students[index] = { ...this.students[index], ...data };
            this.saveToLocalStorage();
            return this.students[index];
        }
        return null;
    },

    addStudent(student) {
        const newId = `SV${String(this.students.length + 1).padStart(3, '0')}`;
        const newStudent = {
            id: newId,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random&color=fff`,
            grades: this.generateGrades(),
            attendanceHistory: [],
            behaviorNotes: [],
            socialInteractions: { friendsCount: 0, groupParticipation: 0, isolationScore: 0 },
            financialStatus: { tuitionPaid: false, hasDebt: false, scholarshipEligible: false, totalPaid: 0, totalDue: 15000000 },
            healthData: this.generateHealthData(),
            activities: [],
            goals: [],
            status: 'active',
            ...student
        };
        this.students.push(newStudent);
        this.saveToLocalStorage();
        return newStudent;
    },

    deleteStudent(id) {
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
            this.students.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    },

    saveToLocalStorage() {
        try {
            localStorage.setItem('edumanager_students', JSON.stringify(this.students));
            localStorage.setItem('edumanager_teachers', JSON.stringify(this.teachers));
            localStorage.setItem('edumanager_schedules', JSON.stringify(this.schedules));
            localStorage.setItem('edumanager_finances', JSON.stringify(this.finances));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },

    loadFromLocalStorage() {
        try {
            const students = localStorage.getItem('edumanager_students');
            const teachers = localStorage.getItem('edumanager_teachers');
            const schedules = localStorage.getItem('edumanager_schedules');
            const finances = localStorage.getItem('edumanager_finances');
            
            if (students) this.students = JSON.parse(students);
            if (teachers) this.teachers = JSON.parse(teachers);
            if (schedules) this.schedules = JSON.parse(schedules);
            if (finances) this.finances = JSON.parse(finances);
            
            return true;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return false;
        }
    }
};

// Initialize database khi load trang
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        // Kiểm tra và xóa dữ liệu cũ nếu có lớp 10, 11, 12
        const oldData = localStorage.getItem('edumanager_students');
        if (oldData) {
            try {
                const students = JSON.parse(oldData);
                const hasOldClass = students.some(s => 
                    s.class && (s.class.includes('10A') || s.class.includes('11A') || s.class.includes('12A') ||
                               s.class.includes('10B') || s.class.includes('11B') || s.class.includes('12B'))
                );
                
                if (hasOldClass) {
                    console.log('🔄 Phát hiện dữ liệu cũ (lớp 10, 11, 12). Đang xóa và tạo lại...');
                    localStorage.clear();
                    Database.init();
                    Database.saveToLocalStorage();
                    console.log('✅ Đã tạo lại database mới với lớp đại học!');
                    return;
                }
            } catch (e) {
                console.error('Error checking old data:', e);
            }
        }
        
        const loaded = Database.loadFromLocalStorage();
        if (!loaded || Database.students.length === 0) {
            Database.init();
            Database.saveToLocalStorage();
        }
    });
}

// Khởi tạo giáo viên (100+ giảng viên)
Database.initTeachers = function() {
    const teacherData = [];
    
    // Công nghệ Thông tin - 20 giảng viên
    const cnttSubjects = ['Lập trình C++', 'Lập trình Java', 'Lập trình Python', 'Cấu trúc dữ liệu', 'Giải thuật', 'Cơ sở dữ liệu', 'SQL Server', 'MongoDB', 'Mạng máy tính', 'An ninh mạng', 'Hệ điều hành', 'Linux', 'Trí tuệ nhân tạo', 'Machine Learning', 'Web Development', 'Mobile Development', 'Cloud Computing', 'DevOps', 'Blockchain', 'IoT'];
    cnttSubjects.forEach((subject, i) => {
        teacherData.push({ subject, faculty: 'Công nghệ Thông tin', degree: i % 3 === 0 ? 'Tiến sĩ' : 'Thạc sĩ' });
    });
    
    // Quản trị Kinh doanh - 18 giảng viên
    const qtkdSubjects = ['Quản trị học', 'Quản trị chiến lược', 'Marketing căn bản', 'Marketing số', 'Kinh tế vi mô', 'Kinh tế vĩ mô', 'Quản trị nhân lực', 'Hành vi tổ chức', 'Quản trị dự án', 'Khởi nghiệp', 'Quản trị vận hành', 'Quản trị chuỗi cung ứng', 'Thương mại điện tử', 'Quản trị bán hàng', 'Quản trị thương hiệu', 'Nghiên cứu thị trường', 'Quản trị chất lượng', 'Quản trị rủi ro'];
    qtkdSubjects.forEach((subject, i) => {
        teacherData.push({ subject, faculty: 'Quản trị Kinh doanh', degree: i % 4 === 0 ? 'Tiến sĩ' : 'Thạc sĩ' });
    });
    
    // Kế toán - 15 giảng viên
    const ktSubjects = ['Kế toán tài chính', 'Kế toán quản trị', 'Kế toán chi phí', 'Kiểm toán', 'Kiểm toán nội bộ', 'Thuế', 'Thuế TNDN', 'Thuế GTGT', 'Phân tích tài chính', 'Kế toán ngân hàng', 'Kế toán doanh nghiệp', 'Kế toán công', 'Chuẩn mực kế toán', 'IFRS', 'Phần mềm kế toán'];
    ktSubjects.forEach((subject, i) => {
        teacherData.push({ subject, faculty: 'Kế toán', degree: i % 3 === 0 ? 'Tiến sĩ' : 'Thạc sĩ' });
    });
    
    // Ngôn ngữ Anh - 12 giảng viên
    const nnSubjects = ['Ngữ pháp', 'Ngữ pháp nâng cao', 'Nghe hiểu', 'Đọc hiểu', 'Viết học thuật', 'Nói', 'Phát âm', 'Văn học Anh-Mỹ', 'Dịch thuật', 'Phiên dịch', 'Tiếng Anh thương mại', 'IELTS'];
    nnSubjects.forEach((subject, i) => {
        teacherData.push({ subject, faculty: 'Ngôn ngữ Anh', degree: i % 4 === 0 ? 'Tiến sĩ' : i % 2 === 0 ? 'Thạc sĩ' : 'Cử nhân' });
    });
    
    // Kỹ thuật Cơ khí - 15 giảng viên
    const ktckSubjects = ['Vẽ kỹ thuật', 'CAD/CAM', 'Cơ học kỹ thuật', 'Sức bền vật liệu', 'Nhiệt động lực học', 'Truyền nhiệt', 'Máy công cụ', 'Chế tạo máy', 'Tự động hóa', 'Robot công nghiệp', 'Công nghệ vật liệu', 'Gia công kim loại', 'Thiết kế máy', 'Bảo trì thiết bị', 'An toàn lao động'];
    ktckSubjects.forEach((subject, i) => {
        teacherData.push({ subject, faculty: 'Kỹ thuật Cơ khí', degree: i % 3 === 0 ? 'Tiến sĩ' : 'Thạc sĩ' });
    });
    
    // Y Dược - 15 giảng viên
    const ydSubjects = ['Giải phẫu', 'Sinh lý học', 'Hóa sinh', 'Vi sinh vật', 'Dược lý học', 'Dược động học', 'Hóa dược', 'Dược liệu', 'Bào chế', 'Kiểm nghiệm thuốc', 'Dược lâm sàng', 'Tư vấn thuốc', 'Y học cổ truyền', 'Dinh dưỡng', 'Sức khỏe cộng đồng'];
    ydSubjects.forEach((subject, i) => {
        teacherData.push({ subject, faculty: 'Y Dược', degree: i % 2 === 0 ? 'Tiến sĩ' : 'Thạc sĩ' });
    });
    
    // Khoa học Cơ bản - 10 giảng viên
    const khcbSubjects = ['Toán cao cấp', 'Đại số tuyến tính', 'Xác suất thống kê', 'Vật lý đại cương', 'Hóa học đại cương', 'Triết học Mác-Lênin', 'Kinh tế chính trị', 'Tư tưởng HCM', 'Giáo dục thể chất', 'Giáo dục quốc phòng'];
    khcbSubjects.forEach((subject, i) => {
        teacherData.push({ subject, faculty: 'Khoa học Cơ bản', degree: i % 3 === 0 ? 'Tiến sĩ' : 'Thạc sĩ' });
    });
    
    // Tạo danh sách giảng viên
    const firstNames = ['An', 'Bình', 'Châu', 'Dũng', 'Hà', 'Hương', 'Khoa', 'Linh', 'Minh', 'Nam', 'Phương', 'Quân', 'Thảo', 'Tú', 'Vy', 'Anh', 'Bảo', 'Cường', 'Đạt', 'Giang'];
    const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
    const middleNames = ['Văn', 'Thị', 'Minh', 'Hoàng', 'Thanh', 'Thu', 'Hữu', 'Đức', 'Quốc', 'Anh'];
    
    this.teachers = teacherData.map((t, i) => {
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const degreePrefix = t.degree === 'Tiến sĩ' ? 'TS. ' : t.degree === 'Thạc sĩ' ? 'ThS. ' : '';
        const fullName = `${degreePrefix}${lastName} ${middleName} ${firstName}`;
        
        return {
            id: `GV${String(i + 1).padStart(4, '0')}`,
            name: fullName,
            subject: t.subject,
            faculty: t.faculty,
            email: `${this.removeAccents(fullName).toLowerCase().replace(/\s/g, '').replace(/\./g, '')}${i}@teacher.edu.vn`,
            phone: `091${Math.floor(Math.random() * 10000000)}`,
            classes: this.classes.filter(c => c.faculty === t.faculty || t.faculty === 'Khoa học Cơ bản').slice(0, Math.floor(Math.random() * 3) + 2).map(c => c.name),
            experience: Math.floor(Math.random() * 20) + 5,
            degree: t.degree,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&color=fff`
        };
    });
};

// Khởi tạo thời khóa biểu
Database.initSchedules = function() {
    const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'];
    const periods = ['Tiết 1-2', 'Tiết 3-4', 'Tiết 5-6', 'Tiết 7-8', 'Tiết 9-10'];
    const timeSlots = [
        { start: '7:00', end: '8:50' },
        { start: '9:00', end: '10:50' },
        { start: '13:00', end: '14:50' },
        { start: '15:00', end: '16:50' },
        { start: '17:00', end: '18:50' }
    ];
    
    this.schedules = [];
    
    this.classes.forEach(classInfo => {
        // Lấy môn học theo khoa
        const classTeachers = this.teachers.filter(t => 
            t.faculty === classInfo.faculty || t.faculty === 'Khoa học Cơ bản'
        );
        
        days.forEach((day, dayIndex) => {
            periods.forEach((period, periodIndex) => {
                // Không phải mọi tiết đều có lớp (để trống một số tiết)
                if (Math.random() > 0.3) {
                    const teacher = classTeachers[Math.floor(Math.random() * classTeachers.length)];
                    
                    this.schedules.push({
                        id: `SCH${this.schedules.length + 1}`,
                        classId: classInfo.id,
                        className: classInfo.name,
                        faculty: classInfo.faculty,
                        day: day,
                        dayIndex: dayIndex,
                        period: period,
                        periodIndex: periodIndex,
                        subject: teacher.subject,
                        teacherId: teacher.id,
                        teacherName: teacher.name,
                        room: `${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 5) + 1}0${Math.floor(Math.random() * 9) + 1}`,
                        startTime: timeSlots[periodIndex].start,
                        endTime: timeSlots[periodIndex].end
                    });
                }
            });
        });
    });
};

// Khởi tạo tài chính
Database.initFinances = function() {
    this.finances = [];
    const currentYear = 2024;
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    
    months.forEach(month => {
        const tuitionIncome = this.students.length * 1500000; // 1.5tr/sinh viên
        const otherIncome = Math.floor(Math.random() * 50000000) + 20000000;
        const totalIncome = tuitionIncome + otherIncome;
        
        const salaryExpense = this.teachers.length * 8000000; // 8tr/giáo viên
        const facilityExpense = Math.floor(Math.random() * 30000000) + 10000000;
        const otherExpense = Math.floor(Math.random() * 20000000) + 5000000;
        const totalExpense = salaryExpense + facilityExpense + otherExpense;
        
        this.finances.push({
            id: `FIN${month}${currentYear}`,
            month: month,
            year: currentYear,
            date: `${currentYear}-${month}-01`,
            income: {
                tuition: tuitionIncome,
                other: otherIncome,
                total: totalIncome
            },
            expense: {
                salary: salaryExpense,
                facility: facilityExpense,
                other: otherExpense,
                total: totalExpense
            },
            profit: totalIncome - totalExpense,
            description: `Báo cáo tài chính tháng ${month}/${currentYear}`
        });
    });
};

// Khởi tạo nghiên cứu khoa học
Database.initResearch = function() {
    const topics = [
        // AI & Machine Learning
        'Ứng dụng AI trong giáo dục đại học',
        'Machine Learning cho dự đoán kết quả học tập',
        'Chatbot AI hỗ trợ sinh viên 24/7',
        'Nhận diện cảm xúc sinh viên qua camera',
        'Hệ thống gợi ý môn học thông minh',
        
        // Phương pháp giảng dạy
        'Phương pháp dạy học tích cực',
        'Lớp học đảo ngược (Flipped Classroom)',
        'Học tập dựa trên dự án (PBL)',
        'Gamification trong giáo dục đại học',
        'Microlearning - Học theo mô-đun nhỏ',
        
        // Công nghệ giáo dục
        'Thực tế ảo (VR) trong đào tạo y khoa',
        'Thực tế tăng cường (AR) cho kỹ thuật',
        'Blockchain trong quản lý bằng cấp',
        'IoT trong phòng thí nghiệm thông minh',
        'Cloud Computing cho giáo dục từ xa',
        
        // Đánh giá & Đo lường
        'Đánh giá năng lực học sinh theo chuẩn quốc tế',
        'E-Portfolio đánh giá tổng hợp',
        'Phân tích học tập (Learning Analytics)',
        'Đánh giá đồng đẳng (Peer Assessment)',
        
        // Học tập trực tuyến
        'Thiết kế khóa học MOOC hiệu quả',
        'Tương tác sinh viên trong lớp online',
        'Chống gian lận thi trực tuyến',
        'Adaptive Learning - Học tập thích ứng',
        
        // Phát triển kỹ năng
        'Phát triển tư duy phản biện',
        'Kỹ năng mềm cho sinh viên công nghệ',
        'Đào tạo kỹ năng số (Digital Literacy)',
        'Tư duy thiết kế (Design Thinking)',
        
        // Quản lý giáo dục
        'Quản lý lớp học hiệu quả',
        'Hệ thống quản lý học tập (LMS)',
        'Big Data trong quản lý đại học',
        'Tối ưu hóa thời khóa biểu bằng AI',
        
        // Nghiên cứu chuyên ngành
        'Ứng dụng Blockchain trong tài chính',
        'Deep Learning cho xử lý ảnh y tế',
        'Phân tích dữ liệu lớn trong kinh doanh',
        'Bảo mật mạng trong IoT',
        'Năng lượng tái tạo cho khuôn viên xanh',
        
        // Tâm lý & Sức khỏe
        'Sức khỏe tinh thần sinh viên',
        'Stress và cách quản lý trong học tập',
        'Động lực học tập của sinh viên',
        'Hội chứng kiệt sức học đường',
        
        // Xu hướng mới
        'Metaverse trong giáo dục',
        'NFT cho chứng chỉ số',
        'Web3 và giáo dục phi tập trung',
        'Quantum Computing trong nghiên cứu',
        'Sinh học tổng hợp và đạo đức'
    ];
    
    this.research = topics.map((topic, i) => ({
        id: `RES${String(i + 1).padStart(3, '0')}`,
        title: topic,
        author: this.teachers[Math.floor(Math.random() * this.teachers.length)].name,
        authorId: this.teachers[Math.floor(Math.random() * this.teachers.length)].id,
        status: ['Đang thực hiện', 'Hoàn thành', 'Đã xuất bản'][Math.floor(Math.random() * 3)],
        startDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-01`,
        progress: Math.floor(Math.random() * 100),
        journal: [
            'Tạp chí Giáo dục Việt Nam',
            'Tạp chí Khoa học & Công nghệ',
            'Tạp chí Đại học Quốc gia',
            'IEEE Transactions on Education',
            'Journal of Educational Technology',
            'International Journal of AI in Education',
            'Computers & Education',
            'Educational Research Review'
        ][Math.floor(Math.random() * 8)],
        abstract: `Nghiên cứu về ${topic.toLowerCase()} trong bối cảnh giáo dục hiện đại. Đề tài tập trung vào việc phân tích, đánh giá và đề xuất các giải pháp cải tiến...`,
        keywords: this.generateKeywords(topic),
        citations: Math.floor(Math.random() * 100),
        funding: Math.random() > 0.5 ? `${Math.floor(Math.random() * 500) + 100} triệu VNĐ` : 'Chưa có',
        collaborators: Math.floor(Math.random() * 5) + 1
    }));
};

Database.generateKeywords = function(topic) {
    const keywordMap = {
        'AI': ['trí tuệ nhân tạo', 'machine learning', 'deep learning'],
        'Blockchain': ['blockchain', 'phân tán', 'bảo mật'],
        'VR': ['thực tế ảo', 'immersive', '3D'],
        'AR': ['thực tế tăng cường', 'mixed reality'],
        'online': ['trực tuyến', 'e-learning', 'distance learning'],
        'đánh giá': ['assessment', 'evaluation', 'measurement'],
        'tâm lý': ['psychology', 'mental health', 'wellbeing'],
        'STEM': ['khoa học', 'công nghệ', 'kỹ thuật', 'toán học']
    };
    
    let keywords = ['giáo dục', 'đại học'];
    
    for (let [key, values] of Object.entries(keywordMap)) {
        if (topic.includes(key)) {
            keywords = keywords.concat(values.slice(0, 2));
        }
    }
    
    return keywords.slice(0, 5);
}

// Khởi tạo thông báo
Database.initNotifications = function() {
    this.notifications = [
        {
            id: 'NOT001',
            title: 'Họp phụ huynh học kỳ I',
            content: 'Thông báo tổ chức họp phụ huynh vào ngày 15/12/2024',
            type: 'event',
            priority: 'high',
            date: '2024-12-01',
            read: false,
            target: 'all'
        },
        {
            id: 'NOT002',
            title: 'Lịch thi học kỳ I',
            content: 'Lịch thi học kỳ I năm học 2024-2025 đã được công bố',
            type: 'academic',
            priority: 'high',
            date: '2024-11-20',
            read: false,
            target: 'students'
        },
        {
            id: 'NOT003',
            title: 'Cập nhật hệ thống',
            content: 'Hệ thống sẽ bảo trì vào 2h sáng ngày 10/12/2024',
            type: 'system',
            priority: 'medium',
            date: '2024-12-05',
            read: true,
            target: 'all'
        }
    ];
};

// Methods cho Teachers
Database.getAllTeachers = function() {
    return this.teachers;
};

Database.getTeacher = function(id) {
    return this.teachers.find(t => t.id === id);
};

Database.addTeacher = function(teacher) {
    const newId = `GV${String(this.teachers.length + 1).padStart(3, '0')}`;
    const newTeacher = {
        id: newId,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random&color=fff`,
        classes: [],
        experience: 0,
        degree: 'Cử nhân',
        performance: 0,
        ...teacher
    };
    this.teachers.push(newTeacher);
    this.saveToLocalStorage();
    return newTeacher;
};

Database.updateTeacher = function(id, data) {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index !== -1) {
        this.teachers[index] = { ...this.teachers[index], ...data };
        this.saveToLocalStorage();
        return this.teachers[index];
    }
    return null;
};

Database.deleteTeacher = function(id) {
    const index = this.teachers.findIndex(t => t.id === id);
    if (index !== -1) {
        this.teachers.splice(index, 1);
        this.saveToLocalStorage();
        return true;
    }
    return false;
};

// Methods cho Schedules
Database.getSchedulesByClass = function(className) {
    return this.schedules.filter(s => s.className === className);
};

Database.addSchedule = function(schedule) {
    const newSchedule = {
        id: `SCH${this.schedules.length + 1}`,
        ...schedule
    };
    this.schedules.push(newSchedule);
    this.saveToLocalStorage();
    return newSchedule;
};

Database.updateSchedule = function(id, data) {
    const index = this.schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        this.schedules[index] = { ...this.schedules[index], ...data };
        this.saveToLocalStorage();
        return this.schedules[index];
    }
    return null;
};

Database.deleteSchedule = function(id) {
    const index = this.schedules.findIndex(s => s.id === id);
    if (index !== -1) {
        this.schedules.splice(index, 1);
        this.saveToLocalStorage();
        return true;
    }
    return false;
};

// Methods cho Finances
Database.getAllFinances = function() {
    return this.finances;
};

Database.getFinancesByYear = function(year) {
    return this.finances.filter(f => f.year === year);
};

Database.addFinance = function(finance) {
    const newFinance = {
        id: `FIN${finance.month}${finance.year}`,
        ...finance
    };
    this.finances.push(newFinance);
    this.saveToLocalStorage();
    return newFinance;
};

// Methods cho Research
Database.getAllResearch = function() {
    return this.research;
};

Database.getResearch = function(id) {
    return this.research.find(r => r.id === id);
};

Database.addResearch = function(research) {
    const newId = `RES${String(this.research.length + 1).padStart(3, '0')}`;
    const newResearch = {
        id: newId,
        status: 'Đang thực hiện',
        progress: 0,
        citations: 0,
        ...research
    };
    this.research.push(newResearch);
    this.saveToLocalStorage();
    return newResearch;
};

Database.updateResearch = function(id, data) {
    const index = this.research.findIndex(r => r.id === id);
    if (index !== -1) {
        this.research[index] = { ...this.research[index], ...data };
        this.saveToLocalStorage();
        return this.research[index];
    }
    return null;
};

Database.deleteResearch = function(id) {
    const index = this.research.findIndex(r => r.id === id);
    if (index !== -1) {
        this.research.splice(index, 1);
        this.saveToLocalStorage();
        return true;
    }
    return false;
};

// Methods cho Notifications
Database.getAllNotifications = function() {
    return this.notifications;
};

Database.getUnreadNotifications = function() {
    return this.notifications.filter(n => !n.read);
};

Database.markNotificationAsRead = function(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        this.saveToLocalStorage();
        return true;
    }
    return false;
};

Database.addNotification = function(notification) {
    const newId = `NOT${String(this.notifications.length + 1).padStart(3, '0')}`;
    const newNotification = {
        id: newId,
        date: new Date().toISOString().split('T')[0],
        read: false,
        ...notification
    };
    this.notifications.push(newNotification);
    this.saveToLocalStorage();
    return newNotification;
};

// Methods cho Messages (Communication)
Database.getMessages = function(studentId) {
    // Mock messages for now - in real app, this would fetch from backend
    const student = this.getStudent(studentId);
    if (!student) return [];
    
    return [
        {
            id: 1,
            from: 'Giáo viên Toán',
            to: student.parentName || 'Phụ huynh',
            subject: 'Thông báo về kết quả học tập',
            content: `${student.name} đã có tiến bộ đáng kể trong môn Toán. Điểm kiểm tra gần nhất đạt 8.5.`,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            read: true
        },
        {
            id: 2,
            from: 'Giáo viên chủ nhiệm',
            to: student.parentName || 'Phụ huynh',
            subject: 'Lịch họp phụ huynh',
            content: 'Kính mời quý phụ huynh tham dự buổi họp vào ngày 20/12/2024 lúc 14:00 tại phòng 301.',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            read: false
        },
        {
            id: 3,
            from: 'Phòng Tài chính',
            to: student.parentName || 'Phụ huynh',
            subject: 'Thông báo học phí',
            content: 'Học phí học kỳ II đã đến hạn thanh toán. Vui lòng thanh toán trước ngày 15/12/2024.',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            read: false
        }
    ];
};

// Methods cho Goals
Database.updateGoal = function(studentId, goalId, data) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    
    const goalIndex = student.goals.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
        student.goals[goalIndex] = { ...student.goals[goalIndex], ...data };
        this.updateStudent(studentId, { goals: student.goals });
        return student.goals[goalIndex];
    }
    return null;
};

Database.addGoal = function(studentId, goal) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    
    const newId = student.goals.length > 0 ? Math.max(...student.goals.map(g => g.id)) + 1 : 1;
    const newGoal = {
        id: newId,
        status: 'in-progress',
        progress: 0,
        ...goal
    };
    
    student.goals.push(newGoal);
    this.updateStudent(studentId, { goals: student.goals });
    return newGoal;
};

Database.deleteGoal = function(studentId, goalId) {
    const student = this.getStudent(studentId);
    if (!student) return false;
    
    const goalIndex = student.goals.findIndex(g => g.id === goalId);
    if (goalIndex !== -1) {
        student.goals.splice(goalIndex, 1);
        this.updateStudent(studentId, { goals: student.goals });
        return true;
    }
    return false;
};

// Methods cho Activities
Database.updateActivity = function(studentId, activityId, data) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    
    const activityIndex = student.activities.findIndex(a => a.id === activityId);
    if (activityIndex !== -1) {
        student.activities[activityIndex] = { ...student.activities[activityIndex], ...data };
        this.updateStudent(studentId, { activities: student.activities });
        return student.activities[activityIndex];
    }
    return null;
};

Database.addActivity = function(studentId, activity) {
    const student = this.getStudent(studentId);
    if (!student) return null;
    
    const newId = student.activities.length > 0 ? Math.max(...student.activities.map(a => a.id)) + 1 : 1;
    const newActivity = {
        id: newId,
        joined: new Date().toISOString().split('T')[0],
        hours: 0,
        achievements: [],
        ...activity
    };
    
    student.activities.push(newActivity);
    this.updateStudent(studentId, { activities: student.activities });
    return newActivity;
};

Database.deleteActivity = function(studentId, activityId) {
    const student = this.getStudent(studentId);
    if (!student) return false;
    
    const activityIndex = student.activities.findIndex(a => a.id === activityId);
    if (activityIndex !== -1) {
        student.activities.splice(activityIndex, 1);
        this.updateStudent(studentId, { activities: student.activities });
        return true;
    }
    return false;
};
