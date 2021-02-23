document.getElementById('next').addEventListener('click', function () {
    const nextPage = document.getElementById('next').value;
    document.getElementById('page').setAttribute("name", "page");
    document.getElementById('page').value = nextPage;
    document.getElementById('form').submit();
});

document.getElementById('prev').addEventListener('click', function () {
    const nextPage = document.getElementById('prev').value;
    document.getElementById('page').setAttribute("name", "page");
    document.getElementById('page').value = nextPage;
    document.getElementById('form').submit();
});