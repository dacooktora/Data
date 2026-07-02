/* =======================================
   DATA ANALYST ACADEMY
   MAIN APPLICATION FILE
======================================= */


/* =======================================
   GLOBAL CONFIG
======================================= */

const TOTAL_DAYS = 180;
const TOTAL_XP_TO_GRADUATE = 10000;


/* =======================================
   USER STATE
======================================= */

let userData = {

    currentDay: 1,

    totalXP: 0,

    streak: 0,

    completedLessons: [],

    completedProjects: [],

    completedQuizzes: [],

    completedTasks: [],

    unlockedModules: [
        "fundamental"
    ],

    softwareProgress: {

        excel:0,
        sql:0,
        statistics:0,
        powerbi:0,
        python:0,
        business:0

    },

    portfolioProgress:0,

    finalProjectProgress:0,

    level:1,

    title:"Beginner"

};



/* =======================================
   LEVEL SYSTEM
======================================= */

const LEVELS = [

    {
        level:1,
        title:"Beginner",
        xp:0
    },

    {
        level:2,
        title:"Data Explorer",
        xp:500
    },

    {
        level:3,
        title:"Spreadsheet Warrior",
        xp:1500
    },

    {
        level:4,
        title:"SQL Hunter",
        xp:3000
    },

    {
        level:5,
        title:"Dashboard Builder",
        xp:5000
    },

    {
        level:6,
        title:"Python Analyst",
        xp:7000
    },

    {
        level:7,
        title:"Business Thinker",
        xp:8500
    },

    {
        level:8,
        title:"Junior Data Analyst",
        xp:10000
    }

];


/* =======================================
   ACHIEVEMENTS
======================================= */

const achievements = [

    {
        id:1,
        name:"First Lesson",
        xp:50,
        unlocked:false
    },

    {
        id:2,
        name:"10 Lessons Completed",
        xp:100,
        unlocked:false
    },

    {
        id:3,
        name:"First Quiz",
        xp:50,
        unlocked:false
    },

    {
        id:4,
        name:"First Project",
        xp:300,
        unlocked:false
    },

    {
        id:5,
        name:"30 Days Streak",
        xp:500,
        unlocked:false
    },

    {
        id:6,
        name:"Graduate",
        xp:1000,
        unlocked:false
    }

];



/* =======================================
   DAILY TASKS
======================================= */

const dailyTasks = {

    1:[
        "Apa itu Data",
        "Jenis Data",
        "Apa itu CSV",
        "Apa itu Database",
        "Apa itu Data Analyst",
        "Quiz Fundamental"
    ],

    2:[
        "Spreadsheet Basics",
        "Rows dan Columns",
        "Cell Reference",
        "Excel Navigation",
        "Mini Quiz"
    ],

    3:[
        "SUM",
        "AVERAGE",
        "COUNT",
        "MIN",
        "MAX"
    ]

};



/* =======================================
   LOAD USER DATA
======================================= */

function loadUserData(){

    const savedData =
        localStorage.getItem(
            "daAcademyUserData"
        );

    if(savedData){

        userData =
            JSON.parse(savedData);

    }

}



/* =======================================
   SAVE USER DATA
======================================= */

function saveUserData(){

    localStorage.setItem(

        "daAcademyUserData",

        JSON.stringify(userData)

    );

}



/* =======================================
   CALCULATE LEVEL
======================================= */

function calculateLevel(){

    let currentLevel =
        LEVELS[0];

    LEVELS.forEach(level=>{

        if(
            userData.totalXP >= level.xp
        ){

            currentLevel = level;

        }

    });

    userData.level =
        currentLevel.level;

    userData.title =
        currentLevel.title;

}



/* =======================================
   ADD XP
======================================= */

function addXP(amount){

    userData.totalXP += amount;

    calculateLevel();

    saveUserData();

    updateDashboard();

}



/* =======================================
   COMPLETE LESSON
======================================= */

function completeLesson(
    lessonName
){

    if(
        userData.completedLessons
        .includes(lessonName)
    ){
        return;
    }

    userData.completedLessons
        .push(lessonName);

    addXP(20);

    saveUserData();

}



/* =======================================
   COMPLETE QUIZ
======================================= */

function completeQuiz(
    quizName
){

    if(
        userData.completedQuizzes
        .includes(quizName)
    ){
        return;
    }

    userData.completedQuizzes
        .push(quizName);

    addXP(50);

}



/* =======================================
   COMPLETE PROJECT
======================================= */

function completeProject(
    projectName
){

    if(
        userData.completedProjects
        .includes(projectName)
    ){
        return;
    }

    userData.completedProjects
        .push(projectName);

    addXP(300);

}



/* =======================================
   NEXT DAY
======================================= */

function nextDay(){

    if(
        userData.currentDay
        < TOTAL_DAYS
    ){

        userData.currentDay++;

        userData.streak++;

    }

    saveUserData();

    updateDashboard();

}



/* =======================================
   CALCULATE PROGRESS
======================================= */

function calculateProgress(){

    return Math.floor(

        (
            userData.currentDay
            / TOTAL_DAYS
        ) * 100

    );

}



/* =======================================
   UPDATE DASHBOARD
======================================= */

function updateDashboard(){

    const dayElement =
        document.getElementById(
            "currentDay"
        );

    if(dayElement){

        dayElement.innerText =
            userData.currentDay;

    }

    const progressElement =
        document.getElementById(
            "progressPercent"
        );

    if(progressElement){

        progressElement.innerText =
            calculateProgress() + "%";

    }

    const streakElement =
        document.getElementById(
            "streak"
        );

    if(streakElement){

        streakElement.innerText =
            userData.streak + " Hari";

    }

    const levelElement =
        document.getElementById(
            "level"
        );

    if(levelElement){

        levelElement.innerText =
            userData.title;

    }

    const xpElement =
        document.getElementById(
            "xp"
        );

    if(xpElement){

        xpElement.innerText =
            userData.totalXP +
            " XP";

    }

}



/* =======================================
   UPDATE PROGRESS BAR
======================================= */

function updateProgressBar(){

    const progressBar =
        document.getElementById(
            "mainProgress"
        );

    if(progressBar){

        progressBar.value =
            userData.currentDay;

    }

}



/* =======================================
   LOAD DAILY TASKS
======================================= */

function loadDailyTasks(){

    const taskContainer =
        document.querySelector(
            ".today-task ul"
        );

    if(!taskContainer)
        return;

    taskContainer.innerHTML = "";

    const tasks =
        dailyTasks[
            userData.currentDay
        ] || [];

    tasks.forEach(task=>{

        const li =
            document.createElement(
                "li"
            );

        li.innerText = task;

        taskContainer
            .appendChild(li);

    });

}



/* =======================================
   SOFTWARE PROGRESS
======================================= */

function updateSoftwareProgress(
    software,
    amount
){

    if(
        userData.softwareProgress[
            software
        ] === undefined
    ){
        return;
    }

    userData.softwareProgress[
        software
    ] += amount;

    if(
        userData.softwareProgress[
            software
        ] > 100
    ){

        userData.softwareProgress[
            software
        ] = 100;

    }

    saveUserData();

}



/* =======================================
   RESET ALL DATA
======================================= */

function resetProgress(){

    localStorage.removeItem(
        "daAcademyUserData"
    );

    location.reload();

}



/* =======================================
   GRADUATION CHECK
======================================= */

function checkGraduation(){

    if(

        userData.totalXP
        >= TOTAL_XP_TO_GRADUATE

    ){

        alert(
            "Selamat! Kamu siap melamar sebagai Junior Data Analyst."
        );

    }

}



/* =======================================
   AUTO SAVE
======================================= */

setInterval(()=>{

    saveUserData();

},5000);



/* =======================================
   INITIALIZE APP
======================================= */

function initializeApp(){

    loadUserData();

    calculateLevel();

    updateDashboard();

    updateProgressBar();

    loadDailyTasks();

    checkGraduation();

}



/* =======================================
   START APPLICATION
======================================= */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        initializeApp();

    }

);
