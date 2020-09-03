import { db } from '../models/index.js'
import { logger } from '../config/logger.js';
import mongoose from 'mongoose';

const Grade = mongoose.model("grades", db.grade);

const create = async (req, res) => {

  const newGrade = new Grade(req.body);

  try {
    await newGrade.save(newGrade);
    res.send({ message: "Cadastro inserido com sucesso." });
    loggers.info(`POST /grade - ${JSON.stringify()}`);

  } catch (error) {

    res
      .status(500)
      .send({ message: error.message || "Ocorreu algum error ao salvar." });
    loggers.error(`POST /grade - ${JSON.stringify(Error.message)}`);

  }
}

const findAll = async (req, res) => {

  const name = req.query.name;

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {

    const grades = await Grade.find(condition);

    const gradeLista = grades.map(({ _id, name, subject, type, value }) => {
      return {
        id: _id,
        name,
        subject,
        type,
        value,
      };
    });

    res.json(gradeLista);
    console.log(gradeLista);
    logger.info(`GET /grade`);

  } catch (error) {

    res
      .status(500)
      .send({ message: error.message || "Erro ao listar os documentos." });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);

  }
}

const findOne = async (req, res) => {
  try {

  } catch (error) {

  }
}

const update = async (req, res) => {
  try {

  } catch (error) {

  }
}

const removeAll = async (req, res) => {
  try {

  } catch (error) {

  }
}

const remove = async (req, res) => {
  try {

  } catch (error) {

  }
}

export default { create, findAll, findOne, update, removeAll, remove };