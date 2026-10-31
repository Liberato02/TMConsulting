import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { schemaCadastro, type FormCadastro } from "../../schemas/auth";
import { TIPOS_CONTA } from "../../data/tiposConta";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

export function Cadastro() {
  useTituloDocumento("Cadastro | SoulGame");
  const { cadastrar } = useAuth();
  const { mostrarToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormCadastro>({
    resolver: zodResolver(schemaCadastro),
    defaultValues: { tipo: "soulgamer" },
  });

  const tipoSelecionado = useWatch({ control, name: "tipo" });

  async function onSubmit(dados: FormCadastro) {
    const resultado = await cadastrar(dados);

    if (!resultado.sucesso) {
      mostrarToast(resultado.mensagem ?? "Não foi possível cadastrar.", "erro");
      return;
    }

    mostrarToast(`Bem-vindo(a), ${dados.nome.split(" ")[0]}! Conta criada.`, "sucesso");
    navigate(dados.tipo === "admin" ? "/admin/cadastros" : "/desafios");
  }

  return (
    <main aria-label="Formulário de cadastro" className="flex-1 flex items-center justify-center px-4 py-12 bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">Cadastre-se</h1>
        <p className="text-sm text-slate-600 mb-6">
          Escolha o tipo de conta e comece a fazer parte do SoulUp.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          {/* Tipo de conta — 7 papéis do ecossistema + time interno */}
          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-2">
              Tipo de conta
            </legend>
            <div className="flex flex-col gap-2">
              {TIPOS_CONTA.map((def) => (
                <label
                  key={def.tipo}
                  className={`flex items-start gap-3 border-2 rounded-lg px-3 py-2 cursor-pointer transition-colors
                              has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-500 ${
                    tipoSelecionado === def.tipo
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    value={def.tipo}
                    {...register("tipo")}
                    className="sr-only"
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        tipoSelecionado === def.tipo ? "text-blue-800" : "text-slate-700"
                      }`}
                    >
                      {def.rotulo}
                      {def.multiplicador && (
                        <span className="ml-2 text-xs font-normal text-teal-700">
                          multiplicador
                        </span>
                      )}
                      {def.validador && (
                        <span className="ml-2 text-xs font-normal text-amber-700">
                          validador
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-600">{def.descricao}</p>
                  </div>
                </label>
              ))}

              <label
                className={`flex items-start gap-3 border-2 rounded-lg px-3 py-2 cursor-pointer transition-colors
                            has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-500 ${
                  tipoSelecionado === "admin"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <input type="radio" value="admin" {...register("tipo")} className="sr-only" />
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      tipoSelecionado === "admin" ? "text-blue-800" : "text-slate-700"
                    }`}
                  >
                    Time interno
                  </p>
                  <p className="text-xs text-slate-600">
                    Conta da equipe SoulUp para manter a base de dados.
                  </p>
                </div>
              </label>
            </div>
          </fieldset>

          <Campo
            id="codigoIndicacao"
            label="Código de indicação (opcional)"
            erro={errors.codigoIndicacao?.message}
          >
            <input
              id="codigoIndicacao"
              placeholder="Ex: JOAO-4F2A"
              autoComplete="off"
              {...register("codigoIndicacao")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Campo>

          <Campo id="nome" label="Nome completo" erro={errors.nome?.message}>
            <input
              id="nome"
              {...register("nome")}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "nome-erro" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Campo>

          <Campo id="email" label="E-mail" erro={errors.email?.message}>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-erro" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Campo>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Campo id="senha" label="Senha" erro={errors.senha?.message}>
              <input
                id="senha"
                type="password"
                {...register("senha")}
                aria-invalid={!!errors.senha}
                aria-describedby={errors.senha ? "senha-erro" : undefined}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Campo>
            <Campo id="confirmarSenha" label="Confirmar senha" erro={errors.confirmarSenha?.message}>
              <input
                id="confirmarSenha"
                type="password"
                {...register("confirmarSenha")}
                aria-invalid={!!errors.confirmarSenha}
                aria-describedby={errors.confirmarSenha ? "confirmarSenha-erro" : undefined}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Campo>
          </div>

          <Campo id="telefone" label="Telefone" erro={errors.telefone?.message}>
            <input
              id="telefone"
              placeholder="(11) 99999-9999"
              autoComplete="off"
              {...register("telefone")}
              aria-invalid={!!errors.telefone}
              aria-describedby={errors.telefone ? "telefone-erro" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Campo>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Campo id="dataNascimento" label="Data de nascimento (mínimo 16 anos)" erro={errors.dataNascimento?.message}>
              <input
                id="dataNascimento"
                type="date"
                {...register("dataNascimento")}
                aria-invalid={!!errors.dataNascimento}
                aria-describedby={errors.dataNascimento ? "dataNascimento-erro" : undefined}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Campo>
            <Campo id="estado" label="Estado" erro={errors.estado?.message}>
              <input
                id="estado"
                placeholder="SP"
                maxLength={2}
                autoComplete="off"
                {...register("estado")}
                aria-invalid={!!errors.estado}
                aria-describedby={errors.estado ? "estado-erro" : undefined}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                           uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Campo>
          </div>

          <Campo id="cidade" label="Cidade" erro={errors.cidade?.message}>
            <input
              id="cidade"
              {...register("cidade")}
              aria-invalid={!!errors.cidade}
              aria-describedby={errors.cidade ? "cidade-erro" : undefined}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Campo>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white
                       font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
          >
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">
          Já tem conta?{" "}
          <Link to="/login" className="text-blue-700 font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}

function Campo({
  id,
  label,
  erro,
  children,
}: {
  id: string;
  label: string;
  erro?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="text-xs text-red-600 mt-1">
          {erro}
        </p>
      )}
    </div>
  );
}
