"""
SISTEMA SOULUP - MOTOR DE REGRAS BACKEND COM AUTENTICAÇÃO POR E-MAIL
Desenvolvedor: Fernando Oliveira
"""

import random

banco_usuarios = {}
contador_id = 1

TAREFAS_DISPONIVEIS = [
    [1, "Transporte Público", 40],
    [2, "ECO Ponto", 30],
    [3, "Energia Solar", 100],
    [4, "Doação de Sangue", 1000],
    [5, "Participação em Projetos Sociais", 400]
]

torneio_atual = []
COEFICIENTE_CONVERSAO = 0.009


def mostrar_menu():
    print("\n" + "=" * 45)
    print("      SOULUP CORE ENGINE - LOGIN POR E-MAIL")
    print("=" * 45)
    print("1. Consultar Torneio Ativo\n"
          "2. Cadastrar Novo Usuário (Gerar ID)\n"
          "3. Autenticar por E-mail e Registrar Ação\n"
          "4. Módulo de Rankings e Créditos\n"
          "0. Sair")
    print("=" * 45)


def validar_algoritmo_cpf(cpf):
    if len(cpf) != 11 or not cpf.isdigit() or cpf == cpf[0] * 11:
        return False
    soma_1 = sum(int(cpf[i]) * (10 - i) for i in range(9))
    d1 = 0 if (soma_1 % 11) < 2 else 11 - (soma_1 % 11)
    soma_2 = sum(int(cpf[i]) * (11 - i) for i in range(9)) + (d1 * 2)
    d2 = 0 if (soma_2 % 11) < 2 else 11 - (soma_2 % 11)
    return d1 == int(cpf[9]) and d2 == int(cpf[10])


def cadastrar_usuario():
    global contador_id
    print("\n--- CADASTRO DA IDENTIDADE VERDE ---")
    nome = input("Primeiro nome: ").strip()
    sobrenome = input("Sobrenome: ").strip()
    email = input("E-mail corporativo: ").strip().lower() # Normaliza para minúsculo
    cpf = input("CPF (apenas numerais): ").strip().replace(".", "").replace("-", "")

    if not nome.isalpha() or not sobrenome.replace(" ", "").isalpha():
        print("[!] Erro: Nome e sobrenome inválidos.")
        return
    if "@" not in email or "." not in email:
        print("[!] Erro: Formato de e-mail inválido.")
        return
    if not validar_algoritmo_cpf(cpf):
        print("[!] Erro: Malformação matemática no CPF.")
        return

    if any(u["cpf"] == cpf or u["email"] == email for u in banco_usuarios.values()):
        print("[!] Erro: Credenciais (CPF ou E-mail) já registradas.")
        return

    id_gerado = f"SU-2026-{contador_id:03d}"
    contador_id += 1

    # Armazenamos indexando pelo ID único, mas salvando o e-mail como campo de busca
    banco_usuarios[id_gerado] = {
        "nome": f"{nome} {sobrenome}",
        "email": email,
        "cpf": cpf,
        "pontos": 0
    }
    print(f"\n[OK] Competidor Homologado! Conta criada para {banco_usuarios[id_gerado]['nome']}.")


def registrar_pontos():
    print("\n--- AUTENTICAÇÃO DO COMPETIDOR ---")
    email_busca = input("Insira seu e-mail cadastrado: ").strip().lower()

    # CORRIGIDO: Busca filtrada baseada na chave interna 'email' do dicionário sem usar breaks
    id_localizado = next((uid for uid, dados in banco_usuarios.items() if dados["email"] == email_busca), None)

    if not id_localizado:
        print("[!] Erro de Acesso: E-mail não localizado no banco Prospera.")
        return

    user = banco_usuarios[id_localizado]
    print(f"\nSessão Iniciada para: {user['nome']} | ID: {id_localizado}")
    
    print("\n--- ATIVIDADES DISPONÍVEIS ---")
    for t in TAREFAS_DISPONIVEIS:
        print(f"{t[0]} - {t[1]} ({t[2]} pts)")
        
    try:
        id_tarefa = int(input("\nID da Ação Executada: "))
        tarefa = next((t for t in TAREFAS_DISPONIVEIS if t[0] == id_tarefa), None)

        if not tarefa:
            print("[!] Erro: Ação não tabelada.")
            return

        pontos_base = tarefa[2]
        if id_tarefa in [t[0] for t in torneio_atual]:
            pontos_finais = int(pontos_base * 1.5)
            print("🎉 Bônus Sazonal Ativo! +50% de score computado automaticamente.")
        else:
            pontos_finais = pontos_base

        user["pontos"] += pontos_finais
        print(f"[SUCESSO] +{pontos_finais} pontos creditados com segurança!")

    except ValueError:
        print("[!] Erro: Digite numerais inteiros.")


def exibir_ranking_e_premios():
    if not banco_usuarios:
        print("\n[!] Sem atividades registradas.")
        return

    ranking = sorted(banco_usuarios.items(), key=lambda item: item[1]["pontos"], reverse=True)
    print("\n🏆 CLASSIFICAÇÃO GLOBAL EM LARGA ESCALA 🏆")
    for pos, (id_user, dados) in enumerate(ranking, start=1):
        recompensa = dados["pontos"] * COEFICIENTE_CONVERSAO
        print(f"{pos}º {dados['nome']} ({id_user}) | Score: {dados['pontos']} pts | Saldo: R$ {recompensa:.2f}")


# Loop de Inicialização
torneio_atual = random.sample(TAREFAS_DISPONIVEIS, 3)
rodando = True
while rodando:
    mostrar_menu()
    op = input("Comando operacional: ").strip()
    if op == "1":
        print(f"\nTorneio Ativo possui as ações de IDs: {[t[0] for t in torneio_atual]}")
    elif op == "2": cadastrar_usuario()
    elif op == "3": registrar_pontos()
    elif op == "4": exibir_ranking_e_premios()
    elif op == "0":
        print("\nSincronizando dados locais... Até mais, Fernando! 🌱")
        rodando = False