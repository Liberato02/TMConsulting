/**
 * ECOSSISTEMA DE INTERAÇÃO, SESSÃO E VALIDAÇÃO COMPLETA - SOULUP HUB
 */

(() => {
  'use strict';

  // BANCO DE DADOS EM MEMÓRIA VOLÁTIL (Simula o dicionário do Python)
  const bancoUsuarios = [];
  let usuarioAutenticado = null;
  let contadorIds = 1;

  const COEFICIENTE_CONVERSAO = 0.009;

  // ARQUITETURA DE MAPEAMENTO DO DOM
  const DOM = {
    authPortal: document.getElementById('auth-portal'),
    dashboardPortal: document.getElementById('dashboard-portal'),
    
    formCadastro: document.getElementById('form-cadastro'),
    inputNome: document.getElementById('reg-nome'),
    inputSobrenome: document.getElementById('reg-sobrenome'),
    inputEmail: document.getElementById('reg-email'),
    inputCpf: document.getElementById('reg-cpf'),
    feedbackCadastro: document.getElementById('feedback-cadastro'),
    
    formLogin: document.getElementById('form-login'),
    inputLoginEmail: document.getElementById('login-email'),
    feedbackLogin: document.getElementById('feedback-login'),
    
    userLoggedName: document.getElementById('user-logged-name'),
    userLoggedEmail: document.getElementById('user-logged-email'),
    selectAcao: document.getElementById('app-select-acao'),
    tooltipBox: document.getElementById('tooltip-info'),
    btnPontuar: document.getElementById('btn-pontuar'),
    feedbackPontos: document.getElementById('feedback-pontos'),
    rankingList: document.getElementById('ranking-list'),
    btnLogout: document.getElementById('btn-logout'),
  };

  // UX: FORMATADOR MÁSCARA CPF
  DOM.inputCpf.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 9) val = val.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    else if (val.length > 6) val = val.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
    else if (val.length > 3) val = val.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
    e.target.value = val;
  });

  // VALIDAÇÃO ALGORÍTMICA DE CPF (IGUAL À LOGÍSTICA DO PYTHON)
  const validarCpfEstruturado = (cpf) => {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma1 = 0;
    for (let i = 0; i < 9; i += 1) soma1 += parseInt(cpf[i], 10) * (10 - i);
    const r1 = soma1 % 11;
    const d1 = r1 < 2 ? 0 : 11 - r1;

    let soma2 = 0;
    for (let i = 0; i < 9; i += 1) soma2 += parseInt(cpf[i], 10) * (11 - i);
    soma2 += d1 * 2;
    const r2 = soma2 % 11;
    const d2 = r2 < 2 ? 0 : 11 - r2;

    return d1 === parseInt(cpf[9], 10) && d2 === parseInt(cpf[10], 10);
  };

  const dispararFeedback = (alvo, msg, tipo) => {
    if (!alvo) return;
    alvo.textContent = msg;
    alvo.className = `feedback ${tipo}`;
  };

  // ATUALIZAR INTERFACE DO RANKING
  const atualizarVisualRanking = () => {
    DOM.rankingList.innerHTML = '';
    const ordenados = [...bancoUsuarios].sort((a, b) => b.pontos - a.pontos);

    if (ordenados.length === 0) {
      DOM.rankingList.innerHTML = '<li style="border:none; color:#a0a5b5; background:none; padding:0;">Nenhum usuário ativo no ranking.</li>';
      return;
    }

    ordenados.forEach((user) => {
      const recompensa = (user.pontos * COEFICIENTE_CONVERSAO).toFixed(2);
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${user.nomeCompleto} <small style="color:#6c5ce7;">(${user.id})</small></span>
        <span><strong>${user.pontos} pts</strong> / <span style="color:#00b894; font-weight:bold;">R$ ${recompensa}</span></span>
      `;
      DOM.rankingList.appendChild(li);
    });
  };

  // CONTROLAR TRANSIÇÃO DE TELAS (MUTEX DE VISIBILIDADE)
  const alternarTelasVisuais = (logado) => {
    if (logado && usuarioAutenticado) {
      DOM.authPortal.setAttribute('hidden', 'true');
      DOM.dashboardPortal.removeAttribute('hidden');
      DOM.userLoggedName.textContent = usuarioAutenticado.nomeCompleto;
      DOM.userLoggedEmail.textContent = usuarioAutenticado.email;
    } else {
      DOM.dashboardPortal.setAttribute('hidden', 'true');
      DOM.authPortal.removeAttribute('hidden');
      usuarioAutenticado = null;
      DOM.formLogin.reset();
    }
    atualizarVisualRanking();
  };

  // INTERCEPTADOR: FORMULÁRIO DE CADASTRO
  DOM.formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const nome = DOM.inputNome.value.trim();
    const sobrenome = DOM.inputSobrenome.value.trim();
    const email = DOM.inputEmail.value.trim().toLowerCase();
    const cpfLimpo = DOM.inputCpf.value.replace(/\D/g, '');

    // VALIDAÇÕES ESPECÍFICAS
    if (!nome || !/^[A-Za-zÀ-ÿ]+$/.test(nome)) {
      dispararFeedback(DOM.feedbackCadastro, 'Primeiro nome inválido (use apenas letras).', 'error');
      return;
    }
    if (!sobrenome || !/^[A-Za-zÀ-ÿ\s]+$/.test(sobrenome)) {
      dispararFeedback(DOM.feedbackCadastro, 'Sobrenome inválido (use apenas letras).', 'error');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      dispararFeedback(DOM.feedbackCadastro, 'Insira um formato de e-mail válido.', 'error');
      return;
    }
    if (!validarCpfEstruturado(cpfLimpo)) {
      dispararFeedback(DOM.feedbackCadastro, 'CPF inválido ou inconsistente.', 'error');
      return;
    }
    if (bancoUsuarios.some((u) => u.cpf === cpfLimpo || u.email === email)) {
      dispararFeedback(DOM.feedbackCadastro, 'Erro: CPF ou E-mail já cadastrado.', 'error');
      return;
    }

    // GERAR ID VERDE SEQUENCIAL (SU-2026-001)
    const suId = `SU-2026-${String(contadorIds).padStart(3, '0')}`;
    contadorIds += 1;

    const novoUsuario = {
      id: suId,
      nomeCompleto: `${nome} ${sobrenome}`,
      email,
      cpf: cpfLimpo,
      pontos: 0,
    };

    bancoUsuarios.push(novoUsuario);
    DOM.formCadastro.reset();
    
    dispararFeedback(DOM.feedbackCadastro, `Sucesso! Conta criada para ${novoUsuario.nomeCompleto}. Prossiga para o login por e-mail.`, 'success');
    atualizarVisualRanking();
  });

  // INTERCEPTADOR: FORMULÁRIO DE LOGIN POR E-MAIL
  DOM.formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const emailBusca = DOM.inputLoginEmail.value.trim().toLowerCase();

    if (!emailBusca) {
      dispararFeedback(DOM.feedbackLogin, 'Por favor, informe o e-mail.', 'error');
      return;
    }

    const userEncontrado = bancoUsuarios.find((u) => u.email === emailBusca);

    if (!userEncontrado) {
      dispararFeedback(DOM.feedbackLogin, 'E-mail não localizado no banco de competidores.', 'error');
      return;
    }

    usuarioAutenticado = userEncontrado;
    DOM.feedbackLogin.textContent = '';
    dispararFeedback(DOM.feedbackLogin, 'Acesso liberado!', 'success');
    
    // Pequeno delay para exibir o feedback de sucesso antes de virar a tela
    setTimeout(() => {
      alternarTelasVisuais(true);
    }, 400);
  });

  // COMPUTAR PONTUAÇÃO
  DOM.btnPontuar.addEventListener('click', (e) => {
    e.preventDefault();
    if (!usuarioAutenticado) return;

    const opt = DOM.selectAcao.options[DOM.selectAcao.selectedIndex];
    const pts = parseInt(opt.getAttribute('data-pontos'), 10);

    usuarioAutenticado.pontos += pts;
    dispararFeedback(DOM.feedbackPontos, `Pontos computados: +${pts} pts`, 'success');
    
    atualizarVisualRanking();
  });

  DOM.selectAcao.addEventListener('change', () => {
    const opt = DOM.selectAcao.options[DOM.selectAcao.selectedIndex];
    DOM.tooltipBox.textContent = opt.getAttribute('data-tooltip');
  });

  DOM.btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    alternarTelasVisuais(false);
  });

  // CONFIGURAÇÃO INICIAL
  DOM.selectAcao.dispatchEvent(new Event('change'));
  atualizarVisualRanking();
})();