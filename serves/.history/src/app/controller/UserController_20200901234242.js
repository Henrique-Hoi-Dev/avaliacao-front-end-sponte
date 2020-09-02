import * as Yup from 'yup';
import File from '../models/File';
import Product from '../models/Product';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      categoria: Yup.string().required(),
      altura: Yup.number().required(),
      largura: Yup.number().required(),
      comprimento: Yup.number().required(),
      codigo_de_barra: Yup.number().required(),
      peso: Yup.number().required(),
      preço: Yup.number().required(),
      descriçao: Yup.string().required(),
      dia_da_semana: Yup.string().required(),
      horario: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const {
      id,
      name,
      categoria,
      altura,
      largura,
      comprimento,
      codigoDeBarra,
      peso,
      preço,
      descriçao,
      diaDaSemana,
      horario,
    } = await Product.create(req.body);

    return res.json({
      id,
      name,
      categoria,
      altura,
      largura,
      comprimento,
      codigoDeBarra,
      peso,
      preço,
      descriçao,
      diaDaSemana,
      horario,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(8)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}
export default new UserController();