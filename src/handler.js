const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  // mengambil data request
  const { title, tags, body } = request.payload;

  // unique id
  const id = nanoid(16);

  // timestamp
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // menggabungkan objek data dalam 1 variable
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  // memasukkan data ke dalam array notes
  notes.push(newNote);

  // check data yang baru di masukkan
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // res
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  // get id data
  const { id } = request.params;

  // get data if id same
  const note = notes.filter((n) => n.id === id)[0];

  console.log(note);
  // if data ready
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  // if data not found
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);

  // result response
  return response;
};

const editNoteByIdHandler = (request, h) => {
  // get id data
  const { id } = request.params;

  // get request
  const { title, tags, body } = request.payload;

  // update timestamp date
  const updatedAt = new Date().toISOString();

  // get data by id
  const index = notes.findIndex((value) => value.id === id); //  0 = true, -1 = false

  // console.log(notes[index]);
  // return true;
  // if data ready
  if (index !== -1) {
    // semua properti dan nilai catatan lama dipanggil terlebih dahulu
    // baru diperbarui dengan properti dan nilai baru
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    // response success
    const response = h.response({
      status: 'success',
      message: notes[index],
    });
    response.code(200);
    return response;
  }

  // response error
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);

  // result response
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  // get id by param
  const { id } = request.params;

  // get data by id
  const index = notes.findIndex((note) => note.id === id);

  // mengahapus data
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // jika data not found
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
