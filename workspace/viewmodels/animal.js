


//Viewmodel réteg
var statusTexts = {
    'new': 'Újonnan érkezett',
    'sick': 'Kezelésre szorul',
    'adoptable': 'Gazdira vár',
    'adopted': 'Gazdis'
};
var statusClasses = {
    'new': 'default',
    'sick': 'danger',
    'adopted': 'success',
    'adoptable': 'info'
};

function decorateErrors(errorContainer) {
    return errorContainer.map(function (e) {
        e.statusText = statusTexts[e.status];
        e.statusClass = statusClasses[e.status];
        return e;
    });
}

module.exports = decorateErrors;