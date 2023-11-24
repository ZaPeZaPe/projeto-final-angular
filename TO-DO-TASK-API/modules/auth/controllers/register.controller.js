const bcrypt = require("bcryptjs");
const registerRepository = require("../repositories/register.repository");

class RegisterController {
  async create(req, res) {
    // #swagger.tags = ["Register"]
    // #swagger.description = "Endpoint para cadastrar um usuário."

    /* #swagger.parameters['User'] = { 
        in: 'body',
        description: "Adicionando um novo usuário.",
        schema: { $ref: "#/definitions/AddUser" }
    } */
    const user = req.body;

    try {
      const encryptedPassword = await bcrypt.hash(user.password, 10);
      await registerRepository.create({
        ...user,
        password: encryptedPassword,
      });

      /* #swagger.responses[201] = { 
          description: "Usuário cadastrado." 
      } */
      return res.status(201).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json({ message: error.errors[0].message });
    }
  }
}

module.exports = new RegisterController();
