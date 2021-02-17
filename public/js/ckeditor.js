let editor; 

BalloonEditor
    .create(document.querySelector('#editor'), {
        toolbar: [
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'undo',
            'redo'
        ]
    })
    .then(newEditor => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

document.querySelector('#submit').addEventListener('click', () => {
    const editorData = editor.getData();
    document.getElementById('description').value = editorData;
});

window.onload = function() {
    const description = document.getElementById('description').value;
    editor.setData(description);
  };