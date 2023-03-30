class ViewPontuacao{
    constructor(pontuacao){
        this.pontuacao = pontuacao;
    }

    template(){
        return`
            <h2>score</h2>
            <h4>${this.pontuacao}</h4>
        `
    }
}