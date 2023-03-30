class Controller {
    constructor() {
        this.jogo = document.querySelector(".jogo");
        this.resultado = document.querySelector(".resultado");
        this.pontuacao = document.querySelector(".score");
        this.opcoes = new Array(
            new Opcao('pedra', 'images/icon-rock.svg', ['papel', 'spock']),
            new Opcao('papel', 'images/icon-paper.svg', ['tesoura', 'lagarto']),
            new Opcao('tesoura', 'images/icon-scissors.svg', ['pedra', 'spock']),
            new Opcao('lagarto', 'images/icon-lizard.svg', ['pedra', 'tesoura']),
            new Opcao('spock', 'images/icon-spock.svg', ['lagarto', 'papel']),
        ),
        this.contador = 0;
        this.init();
    }

    init() {
        this.opcoes.forEach((opcao) => this.jogo.innerHTML += new ViewJogo(opcao).template());
        this.pontuacao.innerHTML = new ViewPontuacao(this.contador).template();
        this.jogar();
    }
    jogar() {
        document.querySelectorAll(".opcao").forEach((botao) => {
            botao.addEventListener("click", () => {
                let random = Math.floor(Math.random() * this.opcoes.length);
                let escolha = this.opcoes.findIndex(i => i.nome === botao.getAttribute("id"));
                let resultado = "";

                if (this.opcoes[escolha].fraqueza[0] == this.opcoes[random].nome || this.opcoes[escolha].fraqueza[1] == this.opcoes[random].nome) {
                    resultado = "you lose";
                }
                else if (this.opcoes[escolha].nome == this.opcoes[random].fraqueza[0] || this.opcoes[escolha].nome == this.opcoes[random].fraqueza[1]) {
                    resultado = "you win";
                    this.contador++;
                    this.pontuacao.innerHTML = new ViewPontuacao(this.contador).template();
                } else {
                    resultado = "draw";
                }
                this.resultado.innerHTML = new ViewResultado(escolha, random, resultado).template();
                this.jogo.style.display = "none";
                this.resultado.style.display = "flex";

                this.jogarNovamente();
            })
        })
    }
    jogarNovamente() {
        document.querySelector(".novo-jogo").addEventListener("click", () => {
            this.init();
            this.resultado.style.display = "none";
            this.jogo.style.display = "block";
        })
    }
}