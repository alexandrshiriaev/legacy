const addTripButton = document.getElementById('add-trip');
const cancelButton = document.getElementById("modal-close")
addTripButton.addEventListener('click', function () {
    document.getElementById('modal').style.display = 'flex';
});
cancelButton.addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
})
