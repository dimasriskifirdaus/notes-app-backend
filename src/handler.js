const { nanoid } = require("nanoid");
const notes = require('./notes')

const addNoteHandler = (request,h) =>{
    const { title,tags,body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const newNote = {title,tags,body,id,createdAt,updatedAt};

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if(isSuccess){
        const response = h.response({
            status : "success",
            message : "Catatan berhasil ditambahkan!",
            data : {
                nodeId : id,
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status : "fail",
        message : "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
};

const getAllNoteHandler = () =>({
    status : "success",
    data : {
        notes
    }
});

const getNoteByIdHandler = (request,h) => {
    const { id } = request.params;
    const note = notes.filter((n)=> n.id === id)[0];

    if(note !== undefined){
        return {
            status : "success",
            data : {
                note
            }
        }
    }
    const response = h.response({
        status : "fail",
        message : "Catatan tidak ditemukan" 
    });
    response.code(404);
    return response;
};

const editNoteByHandlerId = (request,h) => {
    const { id } = request.params;
    const {tags , body, title } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note)=> id === id);

    if(index !== -1){
        notes[index] ={
        ...notes[index],
        title,
        tags,
        body,
        updatedAt
        };

        const response = h.response({
            status : "success",
            message : "Catatan berhasil diperbaharui"
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status : "fail",
        message : "Gagal merubah catatan, id catatan tidak ditemukan"
    });
    response.code(404);
    return response;
};

const deleteNoteByHandlerId = (request,h) => {
    const { id } = request.params;
    const index = notes.findIndex((note)=> note.id === id);

    if(index !== -1){
        notes.splice(index,1);

        const response = h.response({
            status : "success",
            message : "Catatan berhasil dihapus",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status : "fail",
        message : "Gagal menghapus catatan, id tidak ditemukan"
    });
    response.code(404);
    return response;
};


module.exports = { addNoteHandler, getAllNoteHandler, getNoteByIdHandler, editNoteByHandlerId, deleteNoteByHandlerId };