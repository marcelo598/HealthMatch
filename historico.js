fetch('http://localhost:3000/consultas')
    .then(res => res.json())
    .then(dados => {
        const tabela = document.getElementById('tabelaConsultas');

        dados.forEach(c => {
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${c.usuario_id}</td>
                <td>${c.medico}</td>
                <td>${c.especialidade}</td>
                <td>${c.data}</td>
            `;

            tabela.appendChild(linha);
        });
    })
    .catch(err => console.error(err));