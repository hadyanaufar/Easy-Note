module.exports = (app) => {
    const notes = require('../controllers/note.controller');

    //Membuat Note baru
    app.post('/notes', notes.create);

    //Menerima semua Note
    app.get('/notes', notes.findAll);

    //Menerima satu Note dengan NodeId
    app.get('/notes/:noteId', notes.findOne);

    //Memperbarui sebuah Note dengan NoteId
    app.put('/notes/:noteId', notes.update);

    //Menghapus sebuah Note dengan NoteId
    app.delete('/notes/:noteId', notes.delete);
}