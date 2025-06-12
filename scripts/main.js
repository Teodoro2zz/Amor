// Overlay inicial
document.getElementById('play-music-btn').addEventListener('click', function() {
    document.getElementById('overlay-botao').style.display = 'none';
    document.getElementById('overlay-suspense').style.display = 'flex';
    document.getElementById('background-music').play();
});

// Suspense
document.getElementById('confirmar-btn').addEventListener('click', function() {
    document.getElementById('overlay-suspense').style.display = 'none';
    document.getElementById('conteudo-site').style.display = 'block';
});

// Botão "Não" foge do mouse
const naoBtn = document.getElementById('nao-btn');
const botoesSuspense = document.querySelector('.botoes-suspense');
naoBtn.addEventListener('mouseenter', function() {
    const box = botoesSuspense.getBoundingClientRect();
    const btn = naoBtn.getBoundingClientRect();
    let newLeft = Math.random() * (box.width - btn.width);
    let newTop = Math.random() * 30;
    naoBtn.style.position = 'relative';
    naoBtn.style.left = newLeft + 'px';
    naoBtn.style.top = newTop + 'px';
});
botoesSuspense.addEventListener('mouseleave', function() {
    naoBtn.style.left = '0px';
    naoBtn.style.top = '0px';
});

// Contador de dias juntos (atualiza automaticamente)
function atualizarContadorDias() {
    const inicio = new Date(2024, 8, 4); // 04/09/2024 (mês começa do zero)
    const hoje = new Date();
    inicio.setHours(0,0,0,0);
    hoje.setHours(0,0,0,0);
    const diff = hoje - inicio;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('contador-dias').innerHTML =
        `<span class="dias-juntos">Estamos juntos há <strong>${dias}</strong> dias! 🥰</span>`;
}
atualizarContadorDias();
setInterval(atualizarContadorDias, 60000); // Atualiza a cada minuto

// Lightbox para galeria de fotos
document.querySelectorAll('.foto-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('img-lightbox').src = this.href;
        document.getElementById('lightbox').style.display = 'flex';
    });
});
document.getElementById('fechar-lightbox').onclick = function() {
    document.getElementById('lightbox').style.display = 'none';
};
document.getElementById('lightbox').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', function() {
    // Envelopes e botões
    const envelopes = document.querySelectorAll('.envelope-bilhete');
    const abrirBtns = document.querySelectorAll('.abrir-proximo-btn');
    const fecharBtns = document.querySelectorAll('.fechar-envelope-btn');
    const envelopeFinal = document.getElementById('envelope-final');
    const fecharFinalBtn = document.getElementById('fechar-envelope-final-btn');
    const reabrirBtn = document.getElementById('reabrir-envelopes-btn');

    // Quiz
    const quizDiv = document.getElementById('quiz-envelope');
    const enviarQuizBtn = document.getElementById('enviar-quiz-btn');
    const respostaQuiz = document.getElementById('resposta-quiz');
    const quizFeedback = document.getElementById('quiz-feedback');
    const dicaBtn = document.getElementById('dica-quiz-btn');
    const dicaTexto = document.getElementById('dica-quiz-texto');
    let dicaInterval;

    // BLOQUEIA LETRAS E ADICIONA / AUTOMATICAMENTE NO INPUT DO QUIZ
    if (respostaQuiz) {
        respostaQuiz.addEventListener('input', function(e) {
            let valor = this.value.replace(/\D/g, ''); // só números
            if (valor.length > 2 && valor.length <= 4) {
                valor = valor.slice(0,2) + '/' + valor.slice(2);
            } else if (valor.length > 4) {
                valor = valor.slice(0,2) + '/' + valor.slice(2,4) + '/' + valor.slice(4,8);
            }
            this.value = valor;
        });
    }

    // Controle dos envelopes
    abrirBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            envelopes[idx].style.display = 'none';
            if (envelopes[idx + 1]) {
                envelopes[idx + 1].style.display = 'flex';
            } else {
                // Mostra o quiz
                quizDiv.style.display = 'flex';
                // Configura botão de dica bloqueado com timer
                dicaBtn.disabled = true;
                dicaBtn.textContent = "Quero uma dica! (60s)";
                dicaBtn.style.opacity = "0.7";
                dicaBtn.style.cursor = "not-allowed";
                dicaBtn.style.display = 'inline-block';
                dicaTexto.style.display = 'none';
                let segundos = 60;
                if (dicaInterval) clearInterval(dicaInterval);
                dicaInterval = setInterval(() => {
                    segundos--;
                    dicaBtn.textContent = `Quero uma dica! (${segundos}s)`;
                    if (segundos <= 0) {
                        clearInterval(dicaInterval);
                        dicaBtn.disabled = false;
                        dicaBtn.textContent = "Quero uma dica! 💡";
                        dicaBtn.style.opacity = "1";
                        dicaBtn.style.cursor = "pointer";
                    }
                }, 1000);
            }
        });
    });

    fecharBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            envelopes[idx].style.display = 'none';
            reabrirBtn.style.display = 'block';

            // Só mostra a mensagem se for o último envelope antes do quiz
            if (idx === envelopes.length - 1) {
                let msg = document.createElement('div');
                msg.textContent = "Eu te amo minha garota💗";
                msg.style.position = 'fixed';
                msg.style.top = '80px';
                msg.style.left = '50%';
                msg.style.transform = 'translateX(-50%)';
                msg.style.background = '#fff';
                msg.style.color = '#e60073';
                msg.style.padding = '24px 32px';
                msg.style.fontSize = '2.5rem';
                msg.style.fontWeight = 'bold';
                msg.style.borderRadius = '24px';
                msg.style.boxShadow = '0 8px 32px #e6007340';
                msg.style.zIndex = '9999';
                msg.style.fontFamily = "'Pacifico', cursive, Arial, sans-serif";
                msg.style.textAlign = 'center';
                msg.style.letterSpacing = '1px';
                msg.style.border = '3px solid #e60073';
                document.body.appendChild(msg);
                setTimeout(() => {
                    msg.remove();
                }, 2500);
            }
        });
    });

    if (fecharFinalBtn) {
    fecharFinalBtn.addEventListener('click', () => {
        envelopeFinal.style.display = 'none';
        reabrirBtn.style.display = 'block';

        // Mostra overlay de amor
        const overlay = document.getElementById('amor-overlay');
        const coracoes = document.getElementById('amor-coracoes');
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // trava scroll

        // Remove corações antigos
        coracoes.innerHTML = '';

        // Função para soltar corações animados
        function soltarCoracoesAnimados(qtd = 32) {
            const emojis = ['💗','💖','💘','💝','💞','❤️','💕'];
            for (let i = 0; i < qtd; i++) {
                const coracao = document.createElement('span');
                coracao.className = 'amor-coracao';
                coracao.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                coracao.style.left = Math.random() * 96 + 'vw';
                coracao.style.bottom = '-40px';
                coracao.style.fontSize = (2 + Math.random() * 2.5) + 'rem';
                coracao.style.animationDelay = (Math.random() * 1.2) + 's';
                coracoes.appendChild(coracao);
                setTimeout(() => coracao.remove(), 2200);
            }
        }
        soltarCoracoesAnimados(32);

        // Remove overlay e destrava tela após 2.5s
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 2500);
    });
}

    if (reabrirBtn) {
        reabrirBtn.addEventListener('click', () => {
            envelopeFinal.style.display = 'none';
            quizDiv.style.display = 'none';
            envelopes.forEach((env, i) => {
                env.style.display = i === 0 ? 'flex' : 'none';
            });
            reabrirBtn.style.display = 'none';
        });
    }

    // Botão de dica
    if (dicaBtn) {
        dicaBtn.onclick = function() {
            if (dicaBtn.disabled) return;
            dicaTexto.textContent = "Dica: O mês é janeiro e o dia é 24 😉";
            dicaTexto.style.display = 'block';
            dicaBtn.style.display = 'none';
        };
    }

    // Lógica do quiz
    if (enviarQuizBtn) {
        enviarQuizBtn.onclick = function(event) {
            if (event) event.preventDefault();

            const resposta = respostaQuiz.value.trim();

            // 1. Impede envio se estiver vazio
            if (!resposta) {
                quizFeedback.style.color = "#e60073";
                quizFeedback.textContent = "Digite uma resposta!";
                return;
            }

            // 2. Só aceita números e /
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!regex.test(resposta)) {
                quizFeedback.style.color = "#e60073";
                quizFeedback.textContent = "Formato inválido! Use dd/mm/aaaa.";
                return;
            }

            const respostaCerta = "24/01/2024";
            if (resposta === respostaCerta) {
                quizFeedback.style.color = "#28a745";
                quizFeedback.textContent = "Acertou! 💖";
                setTimeout(() => {
                    quizDiv.style.display = 'none';
                    envelopeFinal.style.display = 'flex';
                    soltarCoracoesConfete();
                    respostaQuiz.value = '';
                    quizFeedback.textContent = '';
                }, 800);
            } else {
                quizFeedback.style.color = "#e60073";
                quizFeedback.textContent = "Errou! 😱 Tente de novo!";
                respostaQuiz.value = ''; // Limpa o campo ao errar
                setTimeout(() => { quizFeedback.textContent = ''; }, 5000); // Some a mensagem após 5s
            }
        };
    }

    // Função corações confete
    function soltarCoracoesConfete(qtd = 24) {
        const container = document.getElementById('coracoes-confete');
        if (!container) return;
        container.innerHTML = '';
        const emojis = ['💗','💖','💘','💝','💞','❤️','💕'];
        for (let i = 0; i < qtd; i++) {
            const coracao = document.createElement('span');
            coracao.className = 'coracao-confete';
            coracao.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            coracao.style.left = Math.random() * 96 + 'vw';
            coracao.style.fontSize = (1.6 + Math.random() * 1.8) + 'rem';
            coracao.style.animationDelay = (Math.random() * 0.8) + 's';
            container.appendChild(coracao);
            setTimeout(() => coracao.remove(), 3200);
        }
    }
});