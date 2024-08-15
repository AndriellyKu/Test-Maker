document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('pencil_icon').addEventListener('click', function() {
        document.getElementById('Container_drop').innerHTML = `
            <div class="container_textarea">
                <textarea id="text-input" placeholder="Escreva aqui o conteúdo que deseja gerar o teste"></textarea>
            </div>
        `;
    });

    document.getElementById('paperclip_icon').addEventListener('click', function() {
        document.getElementById('Container_drop').innerHTML = `
            <div class="container_drop_img">
                <img src="imagens/drop_down_file_icon.png" alt="selecione e coloque aqui o arquivo">
            </div>
            <div class="drop_down_inst_container">
                <h3>ARRASTE OS ARQUIVOS AQUI</h3>
                <p>Podem ser colocados aqui arquivos .PDF .PPTX</p>
            </div>
        `;
    });

    document.getElementById('generate').addEventListener('click', async function(event) {
        event.preventDefault();
        const text = document.getElementById('text-input').value;
    
        console.log('Enviando para /ia:', { text });
    
        try {
            const response = await fetch('http://localhost:8080/ia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
    
            const result = await response.json();
            console.log('Resultado:', result);
        } catch (error) {
            console.error('Erro:', error.message);
        }
    });

    // Lógica para incremento/decremento do número de questões
    const maisButton = document.getElementById('mais');
    const menosButton = document.getElementById('menos');
    const contagemElement = document.getElementById('contagem');

    let count = parseInt(contagemElement.textContent.trim(), 10);
    if (isNaN(count)) {
        count = 0;
    }
    
    maisButton.addEventListener('click', () => {
        count++;
        contagemElement.textContent = count;
        updateButtons();
    });

    menosButton.addEventListener('click', () => {
        if (count > 0) {
            count--;
            contagemElement.textContent = count;
        }
        updateButtons();
    });

    function updateButtons() {
        menosButton.disabled = count === 0;
    }

    updateButtons();
});
