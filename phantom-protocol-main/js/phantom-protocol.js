window.PhantomUtils = {
    playSound: function(type) { console.log(`[Sound] ${type}`); },
    showToast: function(msg, level, duration) {
        alert(`${level.toUpperCase()}: ${msg}`);
    }
};

window.LearningAnalytics = {
    recordInteraction: function(type, data) {
        console.log(`[Analytics] ${type}`, data);
    }
};

window.getLearningProgress = function() {
    return { level: 1, totalPoints: 0 };
};
