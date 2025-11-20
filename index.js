const temas = {
  limao: {
    '--cor-click': '#38184C',
    '--cor-sombra': '#9b0a59',
    '--cor-text': '#000000',
    '--cor-back1': '#CEF09D',
    '--cor-back2': '#4f6a93',
    '--md-sys-color-primary': '#38184C'
  },
  inatel: {
    '--cor-click': '#126ae2',
    '--cor-sombra': '#0a599b',
    '--cor-text': '#000000',
    '--cor-back1': '#edf2f4',
    '--cor-back2': '#6a937a',
    '--md-sys-color-primary': '#126ae2'
  },
  dark: {
    '--cor-click': '#CEF09D',
    '--cor-sombra': '#9b0a59',
    '--cor-text': '#ffffff',
    '--cor-back1': '#38184C',
    '--cor-back2': '#4f6a93',
    '--md-sys-color-primary': '#CEF09D'
  }
};

function aplicarTema(tema) {
  const config = temas[tema];
  if (!config) return;

  Object.entries(config).forEach(([variavel, valor]) => {
    document.documentElement.style.setProperty(variavel, valor);
  });
}

function openMenu() {
  const menu = document.getElementById('menu_aba');
  if (menu) {
    menu.classList.add('active');
  }
}

function closeMenu() {
  const menu = document.getElementById('menu_aba');
  if (menu) {
    menu.classList.remove('active');
  }
}

const eventos = [
  {
    id: 1,
    title: 'Semana do Software 2025',
    date: '12/05',
    time: '10:00',
    location: 'Salao de Eventos',
    type: 'tech',
    description: 'Uma semana inteira dedicada a tecnologia e inovacao, com palestras, workshops e hackathons.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 2,
    title: 'Workshop de IoT',
    date: '12/01',
    time: '08:00',
    location: 'Laboratorio CS&I',
    type: 'tech',
    description: 'Workshop pratico sobre Internet das Coisas e suas aplicacoes na industria 4.0.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 3,
    title: 'Festa dos Alunos 2025',
    date: '18/05',
    time: '19:00',
    location: 'Area Esportiva',
    type: 'cultural',
    description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 4,
    title: 'Feira de Oportunidades',
    date: '04/05',
    time: '10:00',
    location: 'Salao de Eventos',
    type: 'academic',
    description: 'Venha conhecer empresas e projetos com destaque na area da engenharia.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
  }
];

let carousel;
let carouselIndex = 0;
let carouselInterval;
let startX = 0;

function createCards(container) {
  container.innerHTML = '';
  eventos.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="info">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <p><span class="material-symbols-outlined icon">event</span> ${event.date} as ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function updateCarousel() {
  if (carousel) {
    carousel.style.transform = `translateX(-${carouselIndex * 100}%)`;
  }
}

function nextCard() {
  carouselIndex = (carouselIndex + 1) % eventos.length;
  updateCarousel();
}

function prevCard() {
  carouselIndex = (carouselIndex - 1 + eventos.length) % eventos.length;
  updateCarousel();
}

function startAutoCarousel() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(nextCard, 5000);
}

class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.aulas = [
      {
        id: 1,
        disciplina: 'S05 - Interface Homem-Maquina',
        data: 'ter',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: false,
        prova: '12/05',
        frequencia: '10/25',
        nota: 10
      },
      {
        id: 2,
        disciplina: 'E01 - Circuitos Eletricos em Corrente Continua',
        data: 'ter',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: true,
        prova: '12/05',
        frequencia: '10/25',
        nota: 5
      },
      {
        id: 3,
        disciplina: 'M02 - Algebra e Geometria Analitica',
        data: 'ter',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: true,
        prova: '12/05',
        frequencia: '10/25',
        nota: 7
      }
    ];
    this.hoje = 'ter';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje);
    this.shadowRoot.innerHTML = `
      <style>
      .comp-aula {
        position: relative;
        background-color: white;
        top: 0;
        left: 0;
        right: 0;
        padding: 15px;
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      }

      .titulo_aula {
        font-family: "Arimo", sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 15px;
        color: var(--cor-text);
        padding-left: 5px;
        padding-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .p {
        font-family: "Arimo", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 11px;
        color: var(--cor-text);
        line-height: 1.5;
        padding-left: 5px;
        padding-right: 5px;
      }

      .lables {
        display: flex;
      }

      .lable-prova {
        background-color: var(--prova);
        padding: 7px 15px;
        margin-bottom: 10px;
        border-radius: 500px;
        text-align: center;
      }

      .lable-frequencia {
        background-color: var(--frequencia);
        padding: 7px 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .lable-nota {
        background-color: var(--prova);
        padding: 7px 15px;
        margin-right: 10px;
        border-radius: 500px;
      }
      
      .lable-nota-vermelho {
        background-color: red;
        padding: 7px 15px;
        margin-right: 10px;
        border-radius: 500px;
      }
      
      .lable-nota-laranja {
        background-color: orange;
        padding: 7px 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .lable-nota-verde {
        background-color: green;
        padding: 7px 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .p_lable {
        font-family: "Arimo", sans-serif;
        font-weight: 600;
        font-style: normal;
        font-size: 11px;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      </style>
      <div>
        ${aulasDia.map(a => {
          const mostrarProva = a.prova_alert ? '' : 'display: none;';
          let lableNota;
          const notaValor = Number(a.nota);
          
          if (notaValor <= 5){
            lableNota = 'lable-nota-vermelho';
          } else if (notaValor >= 7 && notaValor < 9){
            lableNota = 'lable-nota-laranja';
          } else if (notaValor >= 9 && notaValor <= 10){
            lableNota = 'lable-nota-verde';
          } else {
            lableNota = 'lable-nota';
          }
          
          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${mostrarProva}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e horario: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="${lableNota} p_lable">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}

customElements.define('aulas-component', AulasComponent);

const usuario = { nome: 'Raphael', matricula: '123456', pendencia: false, acessibilidade: true };

const armarios = [
  { id: 1, formato: 'padrao', status: true, acessivel: false },
  { id: 2, formato: 'padrao', status: true, acessivel: false },
  { id: 3, formato: 'padrao', status: true, acessivel: false },
  { id: 4, formato: 'padrao', status: false, acessivel: true },
  { id: 5, formato: 'padrao', status: false, acessivel: true },
  { id: 6, formato: 'duplo', status: true, acessivel: true },
  { id: 7, formato: 'duplo', status: false, acessivel: true },
  { id: 8, formato: 'duplo', status: false, acessivel: true }
];

let tipoSelecionado = null;

function reservarArmario() {
  const resultado = document.getElementById('resultado');
  const armarioNumero = document.getElementById('armarioNumero');

  if (!resultado || !armarioNumero) return;

  if (!tipoSelecionado) {
    resultado.innerText = 'Por favor, selecione um tipo de armario antes de reservar.';
    armarioNumero.style.display = 'none';
    return;
  }

  const armariosDisponiveis = armarios.filter(a => 
    a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel
  );

  if (armariosDisponiveis.length === 0) {
    resultado.innerText = `Ola, ${usuario.nome}! Nenhum armario disponivel para o tipo selecionado.`;
    armarioNumero.style.display = 'none';
    return;
  }

  const armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  const armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;

  const dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva.toLocaleString('pt-BR');

  const dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega.toLocaleString('pt-BR');

  usuario.pendencia = true;

  armarioNumero.innerText = `Armario #${armarioEmprestado.id}`;
  armarioNumero.style.display = 'block';

  resultado.innerText =
    `Data da reserva: ${armarioEmprestado.dataReserva}\n` +
    `Data de entrega: ${armarioEmprestado.dataEntrega}`;
}

function configurarReservaArmario() {
  const tipos = document.querySelectorAll('.tipo');
  tipos.forEach(div => {
    div.addEventListener('click', () => {
      tipos.forEach(d => d.classList.remove('selected'));
      div.classList.add('selected');
      tipoSelecionado = div.dataset.value;
    });
  });

  const botaoReservar = document.getElementById('reservarArmarioBtn');
  if (botaoReservar) {
    botaoReservar.addEventListener('click', reservarArmario);
  }
}

// Alertas de vagas
const estadoAlertas = {
  filtros: false,
  alertas: false,
  canais: {
    email: true,
    push: false
  }
};

const storageKeyAlertas = 'alertasVagasPrefs';

function atualizarStatus(id, texto, classe = 'muted') {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = texto;
  el.classList.remove('muted', 'ok', 'warn');
  el.classList.add(classe);
}

function atualizarProgresso() {
  const steps = [estadoAlertas.filtros, estadoAlertas.alertas];
  const concluido = steps.filter(Boolean).length;
  const percent = Math.round((concluido / steps.length) * 100);
  const fill = document.getElementById('alertProgressFill');
  const texto = document.getElementById('alertProgressText');
  if (fill) fill.style.width = `${percent}%`;
  if (texto) texto.textContent = `${percent}% completo`;
}

function salvarPreferenciasLocal(data) {
  try {
    localStorage.setItem(storageKeyAlertas, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

function carregarPreferenciasLocal() {
  try {
    const raw = localStorage.getItem(storageKeyAlertas);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

const vagasRecomendadas = [
  { titulo: 'Estagio em Automacao Industrial', curso: 'engenharia', tipo: 'estagio', local: 'Hibrido - SP', prazo: 'Inscricoes ate 12/12' },
  { titulo: 'Estagio em Desenvolvimento Embedded', curso: 'engenharia', tipo: 'estagio', local: 'Remoto', prazo: 'Inscricoes ate 05/12' },
  { titulo: 'Programa Trainee Tech', curso: 'computacao', tipo: 'trainee', local: 'Hibrido - RJ', prazo: 'Inscricoes ate 20/12' },
  { titulo: 'Estagio em Projetos Eletricos', curso: 'eletrica', tipo: 'estagio', local: 'Presencial - MG', prazo: 'Inscricoes ate 15/12' }
];

function renderizarRecomendacoes(filtroCurso, filtroTipo) {
  const lista = document.getElementById('recomendacoesLista');
  if (!lista) return;
  const filtradas = vagasRecomendadas.filter(v => {
    return (!filtroCurso || v.curso === filtroCurso) && (!filtroTipo || v.tipo === filtroTipo);
  });
  if (filtradas.length === 0) {
    lista.innerHTML = '<div class="recomendacao-card"><div class="meta">Sem recomendacoes para este filtro.</div></div>';
    return;
  }
  lista.innerHTML = filtradas.map(v => `
    <div class="recomendacao-card">
      <div class="titulo">${v.titulo}</div>
      <div class="meta">Curso: ${v.curso} - Tipo: ${v.tipo} - ${v.local}</div>
      <div class="meta">${v.prazo}</div>
    </div>
  `).join('');
}

function configurarAlertasVagas() {
  const cursoSelect = document.getElementById('cursoSelect');
  const tipoSelect = document.getElementById('tipoSelect');
  const toggleAlertas = document.getElementById('toggleAlertas');
  const btnSalvar = document.getElementById('salvarAlertasBtn');
  const mensagemAlertas = document.getElementById('mensagemAlertas');
  const btnSimular = document.getElementById('simularAlertaBtn');
  const canalEmail = document.getElementById('canalEmail');
  const canalPush = document.getElementById('canalPush');
  const chips = document.querySelectorAll('.chip');
  const modal = document.getElementById('alertModal');
  const modalMsg = document.getElementById('alertModalMsg');
  const fecharModalBtn = document.getElementById('fecharModalBtn');

  const prefs = carregarPreferenciasLocal();
  if (prefs) {
    if (cursoSelect && prefs.curso) cursoSelect.value = prefs.curso;
    if (tipoSelect && prefs.tipo) tipoSelect.value = prefs.tipo;
    if (toggleAlertas) {
      toggleAlertas.checked = Boolean(prefs.alertasAtivos);
      estadoAlertas.alertas = toggleAlertas.checked;
      const texto = toggleAlertas.checked ? 'Notificacoes ativadas.' : 'Aguardando...';
      atualizarStatus('statusAlertas', texto, toggleAlertas.checked ? 'ok' : 'muted');
    }
    if (canalEmail) canalEmail.checked = prefs.canais?.email ?? true;
    if (canalPush) canalPush.checked = prefs.canais?.push ?? false;
    estadoAlertas.filtros = Boolean(prefs.filtros);
    estadoAlertas.canais.email = canalEmail ? canalEmail.checked : true;
    estadoAlertas.canais.push = canalPush ? canalPush.checked : false;
  }

  function validarFiltros() {
    if (cursoSelect && tipoSelect && cursoSelect.value && tipoSelect.value) {
      estadoAlertas.filtros = true;
      atualizarStatus('statusFiltros', `Curso: ${cursoSelect.value} | Tipo: ${tipoSelect.value}`, 'ok');
      atualizarProgresso();
    }
  }

  if (cursoSelect) cursoSelect.addEventListener('change', validarFiltros);
  if (tipoSelect) tipoSelect.addEventListener('change', validarFiltros);
  validarFiltros();

  if (toggleAlertas) {
    toggleAlertas.addEventListener('change', () => {
      estadoAlertas.alertas = toggleAlertas.checked;
      const texto = toggleAlertas.checked ? 'Notificacoes ativadas.' : 'Notificacoes desativadas.';
      const classe = toggleAlertas.checked ? 'ok' : 'warn';
      atualizarStatus('statusAlertas', texto, classe);
      atualizarProgresso();
    });
  }

  if (canalEmail) {
    canalEmail.addEventListener('change', () => {
      estadoAlertas.canais.email = canalEmail.checked;
    });
  }

  if (canalPush) {
    canalPush.addEventListener('change', () => {
      estadoAlertas.canais.push = canalPush.checked;
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const curso = chip.dataset.curso;
      const tipo = chip.dataset.tipo;
      if (cursoSelect) cursoSelect.value = curso;
      if (tipoSelect) tipoSelect.value = tipo;
      validarFiltros();
    });
  });

  if (btnSalvar) {
    btnSalvar.addEventListener('click', () => {
      if (!estadoAlertas.filtros) {
        atualizarStatus('statusFiltros', 'Defina curso e tipo de vaga.', 'warn');
        return;
      }
      if (!estadoAlertas.alertas) {
        atualizarStatus('statusAlertas', 'Ative a chave de notificacoes.', 'warn');
        return;
      }
      if (mensagemAlertas) {
        mensagemAlertas.style.display = 'block';
        mensagemAlertas.textContent = 'Preferencias salvas! Vamos avisar sobre vagas de estagio alinhadas ao seu curso.';
      }

      const data = {
        filtros: estadoAlertas.filtros,
        alertasAtivos: estadoAlertas.alertas,
        curso: cursoSelect ? cursoSelect.value : null,
        tipo: tipoSelect ? tipoSelect.value : null,
        canais: { ...estadoAlertas.canais }
      };
      salvarPreferenciasLocal(data);
      renderizarRecomendacoes(data.curso, data.tipo);
    });
  }

  if (btnSimular && mensagemAlertas) {
    btnSimular.addEventListener('click', () => {
      const texto = 'Novo alerta: Estagio em Engenharia de Sistemas - prazo 10/12. Enviado para seus canais ativos.';
      mensagemAlertas.style.display = 'block';
      mensagemAlertas.textContent = texto;
      if (modal && modalMsg) {
        modalMsg.textContent = texto;
        modal.classList.add('show');
      } else {
        alert(texto);
      }
    });
  }

  if (fecharModalBtn && modal) {
    fecharModalBtn.addEventListener('click', () => modal.classList.remove('show'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });
  }

  renderizarRecomendacoes(cursoSelect ? cursoSelect.value : null, tipoSelect ? tipoSelect.value : null);
  atualizarProgresso();
}

function configurarMenu() {
  const menuButton = document.getElementById('menu');
  const menuAba = document.getElementById('menu_aba');
  if (menuButton) {
    menuButton.addEventListener('click', openMenu);
  }

  document.querySelectorAll('.menu_bot').forEach(botao => {
    botao.addEventListener('click', () => {
      aplicarTema(botao.dataset.theme);
      closeMenu();
    });
  });

  if (menuAba) {
    menuAba.addEventListener('click', event => {
      if (event.target === menuAba) {
        closeMenu();
      }
    });
  }
}

function configurarCarousel() {
  carousel = document.querySelector('.carousel');
  if (!carousel) return;

  createCards(carousel);
  updateCarousel();

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextCard();
      startAutoCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevCard();
      startAutoCarousel();
    });
  }

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
  });

  startAutoCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
  aplicarTema('inatel');
  configurarMenu();
  configurarCarousel();
  configurarReservaArmario();
  configurarAlertasVagas();
});