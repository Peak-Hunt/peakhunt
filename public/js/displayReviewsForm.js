document.getElementById('showForm').onclick = function() {
    document.getElementById('reviewForm').style.display = 'block';
    document.getElementById('showForm').style.visibility = 'hidden';
};

document.getElementById('close').onclick = function() {
    document.getElementById('reviewForm').style.display = 'none';
    document.getElementById('showForm').style.visibility = 'visible';
};