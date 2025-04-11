import { Request, Response } from "express";
import prisma from "../client";

// Creating an object
export async function createObjeto(req: Request, res: Response) {
  try {
    const objeto = await prisma.objeto.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: "Objeto creado con éxito",
      data: objeto,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'server error'
    });
  }
}

// Get all objects
export async function getObjetos(req: Request, res: Response) {
  const objetos = await prisma.objeto.findMany();
  
  res.json({
    status: true,
    message: "Objetos obtenidos con éxito",
    data: objetos,
  });
}

// Get a single object
export async function getObjeto(req: Request, res: Response) {
  const { objId } = req.params;
  const objeto = await prisma.objeto.findFirst({
    where: {
      id: objId,
    },
  });

  res.json({
    status: true,
    message: "Objeto obtenido con éxito",
    data: objeto,
  });
}

// deleting an object
export async function deleteObjeto(req: Request, res: Response) {
  const { objId } = req.params;

  try {
    const objeto = await prisma.objeto.findFirst({
      where: {
        id: objId,
      },
    });

    if (!objeto) {
      return res.status(401).json({
        status: false,
        message: 'Objeto no encontrado',
      });
    }
    await prisma.objeto.delete({
      where: {
        id: objId,
      },
    }),
      res.json({
        status: true,
        message: 'Objeto borrado con éxito',
      });
  } catch {
    res.status(501).json({
      status: false,
      message: 'server error',
    });
  }
}

// updating a single object
export async function updateObjeto(req: Request, res: Response) {
  try {
    const { objId } = req.params;

    const objeto = await prisma.objeto.findFirst({
      where: {
        id: objId,
      },
    });

    if (!objeto) {
      return res.status(401).json({
        status: false,
        message: 'Objeto no encontrado',
      });
    }

    const updatedObject = await prisma.objeto.update({
      where: {
        id: objId,
      },
      data: req.body,
    });

    res.json({
      status: true,
      message: 'Objeto actualizado con éxito',
      data: updatedObject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: 'server error',
    });
  }
}