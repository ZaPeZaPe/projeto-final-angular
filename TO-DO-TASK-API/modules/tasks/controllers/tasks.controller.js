const tasksRepository = require("../repositories/tasks.repository");

class TasksController {
  async findAll(req, res) {
    // #swagger.tags = ["Tasks"]
    // #swagger.description = "Endpoint para obter a lista de tarefas."

    try {
      const { userId } = req.user;
      const tasks = await tasksRepository.findAll(userId);

      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Tasks" },
          description: "Lista de tarefas encontrada." 
      } */
      return res.status(200).json(tasks);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async findById(req, res) {
    // #swagger.tags = ["Tasks"]
    // #swagger.description = "Endpoint para obter uma tarefa."

    // #swagger.parameters['id'] = { description: "Id da tarefa" }
    const { id } = req.params;

    try {
      const { userId } = req.user;
      const task = await tasksRepository.findOne(id, userId);

      if (!task) {
        /* #swagger.responses[404] = { 
            description: "Tarefa não encontrada ou não pertence ao usuário." 
        } */
        return res.status(404).json({
          message: "Tarefa não encontrada ou não pertence ao usuário.",
        });
      }

      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Task" },
          description: "Tarefa encontrada." 
      } */
      return res.json(task);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async create(req, res) {
    // #swagger.tags = ["Tasks"]
    // #swagger.description = "Endpoint para cadastrar uma tarefa."

    /* #swagger.parameters['Task'] = { 
        in: 'body',
        description: "Adicionando uma nova tarefa.",
        schema: { $ref: "#/definitions/AddTask" }
    } */
    const task = req.body;

    try {
      const { userId } = req.user;
      const createdTask = await tasksRepository.create(task, userId);

      /* #swagger.responses[201] = { 
          description: "Tarefa cadastrada." 
      } */
      return res.status(201).json(createdTask);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    // #swagger.tags = ["Tasks"]
    // #swagger.description = "Endpoint para atualizar uma tarefa."

    // #swagger.parameters['id'] = { description: "Id da tarefa" }
    const { id } = req.params;

    /* #swagger.parameters['Task'] = { 
        in: 'body',
        description: "Adicionando uma nova tarefa.",
        schema: { $ref: "#/definitions/Task" }
    } */
    const task = req.body;

    try {
      const { userId } = req.user;
      const updatedTask = await tasksRepository.update(id, task, userId);

      if (!updatedTask) {
        /* #swagger.responses[404] = { 
            description: "Tarefa não encontrada ou não pertence ao usuário." 
        } */
        return res.status(404).json({
          message: "Tarefa não encontrada ou não pertence ao usuário.",
        });
      }

      /* #swagger.responses[200] = { 
          description: "Tarefa atualizada com sucesso." 
      } */
      return res.status(200).json(updatedTask);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async delete(req, res) {
    // #swagger.tags = ["Tasks"]
    // #swagger.description = "Endpoint para remover uma tarefa."

    // #swagger.parameters['id'] = { description: "Id da tarefa" }
    const { id } = req.params;

    try {
      const { userId } = req.user;
      tasksRepository.delete(id, userId);

      /* #swagger.responses[204] = { 
          description: "Tarefa removida com sucesso." 
      } */
      return res.status(204).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }
}

module.exports = new TasksController();
