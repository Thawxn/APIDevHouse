// Metodos: index, show, update, store, destroy
/*
index: Listagem de sessões
strore: criar uma sessão
show: quando queremos listar uma UNICA sessão
update: quando queremos listar uma unica sessão
destroy: quando queremos listr uma unica sessão
*/
import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    // Verificando se esse usuario já existe
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
