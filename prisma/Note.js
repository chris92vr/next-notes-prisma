import prisma from './prisma';
// READ
//get unique note by id
export const getNoteByID = async (id) => {
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return note;
};
// CREATE
export const createNote = async (title, body, session) => {
  const newNote = await prisma.note.create({
    data: {
      title,
      body,
      user: { connect: { email: session?.user?.email } },
    },
  });
  const note = await getNoteByID(newNote.id);
  return note;
};

// UPDATE
export const updateNote = async (id, updatedData, session) => {
  let userId = session?.user.id;
  const updatedNote = await prisma.note.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data: {
      ...updatedData,
    },
  });
  const note = await getNoteByID(updatedNote.id);
  return note;
};
