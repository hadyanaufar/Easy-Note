const Note = require('../models/note.models');

//Membuat dan menyimpan sebuah Note baru
exports.create = (req, res) => {
    //Memvalidasi Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Isi dari Note tidak boleh kosong"
        });
    }

    //Membuat sebuah Note
    const note = new Note({
        title: req.body.title || "Belum ada judul.",
        content: req.body.content
    });

    //Menyimpan Note di Database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Kesalahan terjadi saat membuat Note baru."
        });
    });
};

//Menerima dan mengembalikan semua Notes ke Database
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Kesalahan terjadi saat menerima Note."
        });
    });
};

//Menemukan sebuah Note dengan NoteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tidak bisa menemukan Note dengan id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Kesalahan saat menerima Note dengan id " + req.params.noteId
        });
    });
};

//Membarui sebuah Note yang diidentifikasi dari NoteId pada Request
exports.update = (req, res) => {
    //Memvalidasi Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Isi Note tidak boleh kosong"
        });
    }

    //Mencari dan membarui Note dengan Request Body
    Note.findByIdandUpdate(req.params.noteId, {
        title: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Tidak dapat menemukan Note dengan id "+ req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error update note with id " + req.params.noteId
        });
    });
};

//Menghapus sebuah Note dengan NoteId secara spesifik dalam Request
exports.delete = (req, res) => {
    note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Tidak dapat menemukan Note dengan Id " + req.params.noteId
            });
        }
        res.send({message: "Berhasil menghapus Note."});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tidak dapat menemukan Note dengan Id " + req.params.noteId
            });
        }

        return res.status(500).send({
            message: "Tidak dapat menghapus Note dengan Id " + req.params.noteId
        });
    });
};