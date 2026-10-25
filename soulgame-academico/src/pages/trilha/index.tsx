import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ATIVIDADES } from "../../data/atividades";
import { buscarEstoqueSangue, type RespostaEstoqueSangue } from "../../data/estoqueSangue";
import { TrilhaDesafios } from "../../components/TrilhaDesafios";
import { ListaRegistroAtividades } from "../../components/ListaRegistroAtividades";
import { ModalDetalheAtividade } from "../../components/ModalDetalheAtividade";
import { ModalConfirmarLembrete } from "../../components/ModalConfirmarLembrete";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

