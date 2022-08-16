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
