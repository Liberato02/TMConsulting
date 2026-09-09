import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { schemaLogin, type FormLogin } from "../../schemas/auth";

export function Login() {
    const { login } = useAuth();
    const { mostrarToast } = useToast();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormLogin>({ resolver: zodResolver(schemaLogin) });

    async function onSubmit(dados: FormLogin) {
        const resultado = await login(dados.email, dados.senha);

        if (!resultado.sucesso) {
            mostrarToast(resultado.mensagem ?? "Não foi possível entrar.", "erro");
            return;
        }

        mostrarToast("Login realizado com sucesso!", "sucesso");
        navigate("/desafios");
    }

    return (
        <main aria-label="Formulário de login" className="flex-1 flex items-center justify-center px-4 py-12 bg-blue-50">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-blue-800 mb-1">Entrar</h1>
                <p className="text-sm text-slate-500 mb-6">
                    Acesse sua conta para continuar seus desafios.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="voce@email.com"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-erro" : undefined}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p id="email-erro" role="alert" className="text-xs text-red-600 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="senha" className="block text-sm font-medium text-slate-700 mb-1">
                            Senha
                        </label>
                        <input
                            id="senha"
                            type="password"
                            {...register("senha")}
                            placeholder="••••••••"
                            aria-invalid={!!errors.senha}
                            aria-describedby={errors.senha ? "senha-erro" : undefined}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.senha && (
                            <p id="senha-erro" role="alert" className="text-xs text-red-600 mt-1">
                                {errors.senha.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                       text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
                    >
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <p className="text-sm text-slate-600 mt-6 text-center">
                    Não tem conta?{" "}
                    <Link to="/cadastro" className="text-blue-700 font-semibold hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </main>
    );
}
