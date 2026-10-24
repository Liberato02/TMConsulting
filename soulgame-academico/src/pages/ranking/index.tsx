import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { listarRanking } from "../../data/usuariosStorage";
import { buscarDefinicaoTipoConta } from "../../data/tiposConta";
import type { Usuario } from "../../types";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

const LIMITE_RANKING = 20;

type ItemRanking = Pick<Usuario, "id" | "nome" | "pontos" | "nivel" | "tipo">;
