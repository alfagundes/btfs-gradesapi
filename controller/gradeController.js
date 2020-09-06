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
};

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
};

const findOne = async (req, res) => {

  const id = req.params.id;
  logger.info(`GET /grade - ${id}`);

  try {

    const data = await Grade.findById({ _id: id });
    const { _id, name, subject, type, value } = data;
    res.send({
      _id: id,
      name,
      subject,
      type,
      value,
    });

    if (!data) {
      return res.send({ message: "Nenhum Id encontrado." });
    }
    return res.send(data);

  } catch (error) {

    res
      .status(500)
      .send({ message: error.message || "Erro na busca do documentos id:" + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);

  }
};

const update = async (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Dados vazio.",
    });
  }

  const id = req.params.id;

  try {

    const data = await Grade.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      res.status(400).send("Estudante não emcontrado.");
    }
    res.send(data);
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {

    res
      .status(500)
      .send({ message: error.message || "Erro ao atualizar o id:" + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);

  }
};

const removeAll = async (req, res) => {

  logger.info(`DELETE /grade`);

  try {

    return res.send({ message: "Dados da grade excluída." })

  } catch (error) {

    res
      .status(500)
      .send({ message: error.message || "Erro ao excluir toda a grade." });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);

  }
};

const remove = async (req, res) => {

  const id = req.params.id;

  try {

    Grade.findByIdAndRemove({ _id: id }, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send({ message: `Grade de id ${id} deletada.` });
    });
    logger.info(`DELETE /grade - ${id}`);

  } catch (error) {

    res
      .status(500)
      .send({ message: error.message || "Erro ao remover o id:" + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);

  }
};

export default { create, findAll, findOne, update, removeAll, remove };