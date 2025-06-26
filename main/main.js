let currentState = 0; // 0 = anhni tolow, 1 = watch course, 2 = buh tab

function toggleFooterUI() {
    const tabs = document.getElementById("footerTabs");
    const watchBtn = document.getElementById("watchCourseBtn");

    if (currentState === 0) {
        // tolow 1 → tolow 2
        watchBtn.style.display = "flex";
        tabs.style.display = "none";
        currentState = 1;
    } else if (currentState === 1) {
        // tolow 2 → tolow 3
        tabs.style.display = "flex";
        currentState = 2;
    } else {
        // tolow 3 → butsaad anhnii tolowruu shiljen
        watchBtn.style.display = "none";
        tabs.style.display = "none";
        currentState = 0;
    }
}

