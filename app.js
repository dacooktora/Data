// ============================================================
// APP.JS - Personal Learning Tracker
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. HAMBURGER MENU
    // ============================================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // ============================================================
    // 2. PROGRESS TRACKING (Local Storage)
    // ============================================================
    const STORAGE_KEY = 'myDataJourney_progress';

    // Default progress
    const defaultProgress = {
        completedModules: [],
        completedLessons: [],
        completedQuizzes: [],
        completedProjects: [],
        currentMonth: 1,
        startDate: new Date().toISOString().split('T')[0],
        totalStudyMinutes: 0
    };

    // Load or initialize
    let progress = loadProgress();

    function loadProgress() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.warn('Gagal load progress, pakai default');
        }
        // Save default jika belum ada
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProgress));
        return { ...defaultProgress };
    }

    function saveProgress() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        updateUI();
    }

    // ============================================================
    // 3. UPDATE UI dengan data progress
    // ============================================================
    function updateUI() {
        // Total modules = 8
        const totalModules = 8;
        const completedCount = progress.completedModules.length;
        const percent = Math.round((completedCount / totalModules) * 100);

        // Update progress circle
        const circle = document.getElementById('progressCircle');
        const percentText = document.getElementById('progressPercent');
        if (circle && percentText) {
            const circumference = 2 * Math.PI * 40; // r=40
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            percentText.textContent = percent + '%';
        }

        // Update month progress
        const monthFill = document.getElementById('monthProgress');
        const monthText = document.getElementById('monthText');
        if (monthFill && monthText) {
            // Asumsi progress per bulan = jumlah module yg selesai di bulan itu
            // Sederhana: % dari 6 bulan
            const monthPercent = Math.min((progress.currentMonth / 6) * 100, 100);
            monthFill.style.width = monthPercent + '%';
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
            const currentMonthIndex = Math.min(progress.currentMonth - 1, 5);
            monthText.textContent = `Bulan ${progress.currentMonth} - ${monthNames[currentMonthIndex] || 'Selesai'}`;
        }

        // Update weekly targets (hardcoded untuk contoh)
        const weeklyList = document.getElementById('weeklyTargets');
        if (weeklyList) {
            const targets = [
                '🔲 Selesaikan modul 1',
                '🔲 Latihan SQL 5 query',
                '🔲 Review spreadsheet'
            ];
            // Tandai yang sudah selesai
            const done = progress.completedLessons.length;
            weeklyList.innerHTML = targets.map((t, i) => {
                const isDone = i < done ? '✅' : '🔲';
                return `<li>${isDone} ${t.replace('🔲', '').trim()}</li>`;
            }).join('');
        }

        // Update final project status
        const projectStatus = document.getElementById('finalProjectStatus');
        if (projectStatus) {
            if (progress.completedProjects.length >= 6) {
                projectStatus.textContent = '✅ Selesai!';
                projectStatus.style.color = '#34d399';
            } else if (progress.completedProjects.length > 0) {
                projectStatus.textContent = `🔄 ${progress.completedProjects.length}/6 project selesai`;
            } else {
                projectStatus.textContent = '⏳ Belum dimulai';
            }
        }
    }

    // ============================================================
    // 4. FUNGSI UTAMA (bisa dipanggil dari halaman lain)
    // ============================================================
    window.markModuleComplete = function(moduleId) {
        if (!progress.completedModules.includes(moduleId)) {
            progress.completedModules.push(moduleId);
            saveProgress();
        }
    };

    window.markLessonComplete = function(lessonId) {
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            saveProgress();
        }
    };

    window.markQuizComplete = function(quizId) {
        if (!progress.completedQuizzes.includes(quizId)) {
            progress.completedQuizzes.push(quizId);
            saveProgress();
        }
    };

    window.markProjectComplete = function(projectId) {
        if (!progress.completedProjects.includes(projectId)) {
            progress.completedProjects.push(projectId);
            saveProgress();
        }
    };

    window.advanceMonth = function() {
        if (progress.currentMonth < 6) {
            progress.currentMonth++;
            saveProgress();
        }
    };

    window.getProgress = function() {
        return { ...progress };
    };

    window.resetProgress = function() {
        if (confirm('Reset semua progress?')) {
            localStorage.removeItem(STORAGE_KEY);
            progress = { ...defaultProgress };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
            updateUI();
            location.reload();
        }
    };

    // ============================================================
    // 5. UPDATE UI AWAL
    // ============================================================
    updateUI();

    // ============================================================
    // 6. LOG (buat cek di console)
    // ============================================================
    console.log('🔥 My Data Journey - Personal Tracker');
    console.log('📊 Progress:', progress);
    console.log('📌 Fungsi tersedia:');
    console.log('  - markModuleComplete(id)');
    console.log('  - markLessonComplete(id)');
    console.log('  - markQuizComplete(id)');
    console.log('  - markProjectComplete(id)');
    console.log('  - advanceMonth()');
    console.log('  - getProgress()');
    console.log('  - resetProgress()');

    console.log('💡 Tips: Buka Console (F12) untuk debug');

});
