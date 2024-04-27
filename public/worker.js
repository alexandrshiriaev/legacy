document.addEventListener('DOMContentLoaded', function() {
    const addWorkerButton = document.getElementById('add-worker');
    const cancelButton = document.getElementById("modal-close")
    addWorkerButton.addEventListener('click', function() {
        document.getElementById('modal').style.display = 'flex';
    });
    cancelButton.addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    })
});