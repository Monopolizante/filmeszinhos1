// Rename the variable to avoid conflict with function name
textoFilmeSorteado = document.getElementById("filme-sorteado");
removerAoSortear = false;  // Renamed from removerFilme
mostrado = false;

function adicionarFilme() {
    inputFilme = document.querySelector("#input-filme").value;
    filmes.push(inputFilme);
    // Salva o array atualizado no localStorage
    localStorage.setItem('filmes', JSON.stringify(filmes));
    alert("Filme adicionado com sucesso!");
    atualizarListaFilmes(); // Atualiza a lista
}

function removerFilme() {
    filmes.pop();
    // Salva o array atualizado no localStorage
    localStorage.setItem('filmes', JSON.stringify(filmes));
    alert("Filme removido com sucesso!");
    atualizarListaFilmes(); // Atualiza a lista
}

function sortearFilme() {
    const animationDuration = 2000; // 2 seconds
    const intervalTime = 100; // Time between each shuffle
    let startTime = Date.now();
    
    // Disable the button during animation
    const botaoSortear = document.querySelector("button:nth-of-type(2)");
    botaoSortear.disabled = true;
    
    // Start the shuffle animation
    const shuffleInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        
        // Random temporary selection
        const tempIndex = Math.floor(Math.random() * filmes.length);
        textoFilmeSorteado.innerHTML = "Filme sorteado: " + filmes[tempIndex];
        
        // Check if animation should end
        if (elapsedTime >= animationDuration) {
            clearInterval(shuffleInterval);
            
            // Select the final film
            index = Math.floor(Math.random() * filmes.length);
            filmeSorteado = filmes[index];
            textoFilmeSorteado.innerHTML = "Filme sorteado: " + filmeSorteado;
            
            // Re-enable the button
            botaoSortear.disabled = false;
            
            // Remove film if option is enabled
            if (removerAoSortear) {
                filmes.splice(index, 1);
                localStorage.setItem('filmes', JSON.stringify(filmes));
                atualizarListaFilmes();
            }
        }
    }, intervalTime);
}

function removerFilmeSorteado() {
    removerAoSortear = !removerAoSortear;  // Toggle the state
    const botao = document.querySelector("button:nth-of-type(4)");  // Get the remove sorteado button
    
    if (removerAoSortear) {
        botao.textContent = "Manter filme sorteado";
    } else {
        botao.textContent = "Remover filme já sorteado";
    }
}

function atualizarListaFilmes() {
    const listaHTML = document.getElementById("lista-filmes");
    listaHTML.innerHTML = ""; // Limpa a lista atual
    
    filmes.forEach(filme => {
        const li = document.createElement("li");
        li.textContent = filme;
        listaHTML.appendChild(li);
    });
}

function resetarLista() {
    localStorage.removeItem('filmes');
    window.location.reload();
}
function mostrarLista() {
    const listaFilmes = document.getElementById("lista-filmes");
    const botao = document.querySelector("button:last-of-type"); // Get the last button (Show List)
    
    if (mostrado) {
        listaFilmes.style.opacity = "0";
        botao.textContent = "Mostrar lista de filmes";
    } else {
        listaFilmes.style.opacity = "1";
        botao.textContent = "Esconder lista de filmes";
    }
    mostrado = !mostrado; // Toggle the state
}

// Inicialização do array filmes
let filmes = JSON.parse(localStorage.getItem('filmes')) || [
    "1922",
    "Gerald's Game",
    "Influência",
    "The Blair Witch Project",
    "A classic horror story",
    "A mãe que balança o berço",
    "Cisne Negro",
    "This house has people in it",
    "Abraço de mãe",
    "Doce vingança",
    "Doce vingança 3",
    "Pânico na escola",
    "Mama Agnes",
    "Bad boy, Oliver",
    "The man with no mouth",
    "Teletubies - Anticonstanza",
    "O Animal Cordial",
    "Good boy",
    "Skinamarink",
    "A Serbian Film",
    "Centopéria Humana 2",
    "Pisque duas vezes",
    "August Underground",
    "Bunny Game",
    "Não fale o mal (Dinamarquês)",
    "Megan is missing",
    "O Lobo atrás da porta",
    "Menendez",
    "Gein",
    "Fale comigo",
    "Premonição 6",
    "Miss Violence",
    "O Iluminado",
    "Guerra Mundial Z",
    "Rua do medo 1978",
    "The Silence of the Lambs",
    "Until Dawns",
    "Boa noite, mamãe!",
    "Um Lugar Silencioso Dia 1",
    "Não! Não olhe!",
    "A Visita",
    "A Casa de cera"
];

atualizarListaFilmes(); // Atualiza a lista quando a página carrega