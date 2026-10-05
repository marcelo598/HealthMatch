const db = require('./db');

exports.listarPlanos = (req, res) => {
    db.query('SELECT * FROM planos', (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultado);
    });
};

exports.cadastrarPlano = (req, res) => {
    const {
        nome_plano,
        tipo_plano,
        cobertura_ambulatorial,
        cobertura_hospitalar,
        cobertura_urgencia,
        preco_mensal,
        carencia,
        abrangencia_geografica
    } = req.body;

    const sql = `
        INSERT INTO planos 
        (nome_plano, tipo_plano, cobertura_ambulatorial, cobertura_hospitalar, cobertura_urgencia, preco_mensal, carencia, abrangencia_geografica)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        nome_plano,
        tipo_plano,
        cobertura_ambulatorial,
        cobertura_hospitalar,
        cobertura_urgencia,
        preco_mensal,
        carencia,
        abrangencia_geografica
    ], (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json('Plano cadastrado com sucesso');
    });
};