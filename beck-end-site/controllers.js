const db = require('./db');



// =========================
// 👤 USUÁRIOS
// =========================

// LISTAR TODOS OS USUÁRIOS
exports.listarUsuarios = (req, res) => {

    db.query(
        'SELECT * FROM usuarios ORDER BY id_usuario',

        (erro, resultado) => {

            if (erro) {
                console.log('Erro ao listar usuários:', erro);

                return res.status(500).json({
                    erro: 'Erro ao listar usuários'
                });
            }

            res.json(resultado.rows);
        }
    );

};



// =========================
// 📝 CADASTRAR USUÁRIO
// =========================

exports.cadastrarUsuario = (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {

        return res.status(400).json({
            erro: 'Nome, email e senha são obrigatórios'
        });

    }

    const verificarEmail = `
        SELECT id_usuario
        FROM usuarios
        WHERE email = $1
    `;

    db.query(verificarEmail, [email], (erro, resultado) => {

        if (erro) {

            console.log('Erro ao verificar email:', erro);

            return res.status(500).json({
                erro: 'Erro ao verificar email'
            });

        }

        if (resultado.rows.length > 0) {

            return res.status(409).json({
                erro: 'Este email já está cadastrado'
            });

        }

        const sql = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES ($1, $2, $3)
            RETURNING id_usuario, nome, email
        `;

        db.query(
            sql,
            [nome, email, senha],

            (erro, resultado) => {

                if (erro) {

                    console.log('Erro ao cadastrar usuário:', erro);

                    return res.status(500).json({
                        erro: 'Erro ao cadastrar usuário'
                    });

                }

                res.status(201).json({

                    mensagem: 'Usuário cadastrado com sucesso',

                    usuario: resultado.rows[0]

                });

            }
        );

    });

};



// =========================
// 🔐 LOGIN
// =========================

exports.loginUsuario = (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {

        return res.status(400).json({
            erro: 'Email e senha são obrigatórios'
        });

    }

    const sql = `
        SELECT id_usuario, nome, email, senha
        FROM usuarios
        WHERE email = $1
    `;

    db.query(sql, [email], (erro, resultado) => {

        if (erro) {

            console.log('Erro ao realizar login:', erro);

            return res.status(500).json({
                erro: 'Erro ao realizar login'
            });

        }

        if (resultado.rows.length === 0) {

            return res.status(401).json({
                erro: 'E-mail ou senha incorretos.'
            });

        }

        const usuario = resultado.rows[0];

        if (usuario.senha !== senha) {

            return res.status(401).json({
                erro: 'E-mail ou senha incorretos.'
            });

        }

        res.json({

            mensagem: 'Login realizado com sucesso',

            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }

        });

    });

};



// =========================
// 🔐 RECUPERAÇÃO DE SENHA
// =========================

exports.recuperarSenha = (req, res) => {

    const { email } = req.body;

    if (!email) {

        return res.status(400).json({
            erro: 'Email é obrigatório'
        });

    }

    const sql = `
        SELECT id_usuario, nome, email
        FROM usuarios
        WHERE email = $1
    `;

    db.query(sql, [email], (erro, resultado) => {

        if (erro) {

            console.log('Erro ao buscar usuário:', erro);

            return res.status(500).json({
                erro: 'Erro ao buscar usuário'
            });

        }

        if (resultado.rows.length === 0) {

            return res.status(404).json({
                erro: 'Email não encontrado'
            });

        }

        res.json({

            mensagem: 'Email encontrado. Agora podemos criar a nova senha.',

            usuario: resultado.rows[0]

        });

    });

};



// =========================
// 🏥 CONSULTAS
// =========================

// LISTAR TODAS AS CONSULTAS

exports.listarConsultas = (req, res) => {

    db.query(
        'SELECT * FROM consultas',

        (erro, resultado) => {

            if (erro) {

                console.log('Erro ao listar consultas:', erro);

                return res.status(500).json({
                    erro: 'Erro ao listar consultas'
                });

            }

            res.json(resultado.rows);

        }
    );

};



// =========================
// 👤 LISTAR CONSULTAS POR USUÁRIO
// =========================

exports.listarConsultasPorUsuario = (req, res) => {

    const { id } = req.params;

    db.query(
        'SELECT * FROM consultas WHERE usuario_id = $1',

        [id],

        (erro, resultado) => {

            if (erro) {

                console.log(
                    'Erro ao listar consultas do usuário:',
                    erro
                );

                return res.status(500).json({
                    erro: 'Erro ao listar consultas do usuário'
                });

            }

            res.json(resultado.rows);

        }
    );

};



// =========================
// 📅 CADASTRAR CONSULTA
// =========================

exports.cadastrarConsulta = (req, res) => {

    const {
        usuario_id,
        medico,
        especialidade,
        data
    } = req.body;

    if (!usuario_id || !medico || !especialidade || !data) {

        return res.status(400).json({
            erro: 'Todos os campos da consulta são obrigatórios'
        });

    }

    const sql = `
        INSERT INTO consultas
        (usuario_id, medico, especialidade, data)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    db.query(
        sql,
        [usuario_id, medico, especialidade, data],

        (erro, resultado) => {

            if (erro) {

                console.log(
                    'Erro ao cadastrar consulta:',
                    erro
                );

                return res.status(500).json({
                    erro: 'Erro ao cadastrar consulta'
                });

            }

            res.status(201).json({

                mensagem: 'Consulta cadastrada com sucesso',

                consulta: resultado.rows[0]

            });

        }
    );

};