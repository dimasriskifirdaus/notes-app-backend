const { addNoteHandler, getAllNoteHandler, getNoteByIdHandler, editNoteByHandlerId, deleteNoteByHandlerId } = require("./handler");

const routes = [
    {
        method : "POST",
        path : "/notes",
        handler : addNoteHandler,
    },
    {
        method : "GET",
        path : "/notes",
        handler : getAllNoteHandler
    },
    {
        method : "GET",
        path : "/notes/{id}",
        handler : getNoteByIdHandler
    },
    {
        method : "PUT",
        path : "/notes/{id}",
        handler : editNoteByHandlerId
    },
    {
        method : "DELETE",
        path : "/notes/{id}",
        handler : deleteNoteByHandlerId
    }
];


module.exports = routes;