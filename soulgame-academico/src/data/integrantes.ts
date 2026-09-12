import fotoVinicius from "../assets/integrantes/vinicius.jpg";
import fotoJonatan from "../assets/integrantes/jonatan.jpg";
import fotoFernando from "../assets/integrantes/fernando.jpg";
import fotoMarcelo from "../assets/integrantes/marcelo.jpg";
import fotoDavi from "../assets/integrantes/davi.jpg";

export interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  github: string;
  linkedin: string;
  foto: string;
}

export const INTEGRANTES: Integrante[] = [
  {
    nome: "Vinicius Liberato dos Anjos",
    rm: "571480",
    turma: "1TDSPY",
    github: "https://github.com/Liberato02",
    linkedin: "https://br.linkedin.com/in/vinicius-liberato-b826a4312",
    foto: fotoVinicius,
  },
  {
    nome: "Jonatan Vieira Feitosa",
    rm: "570452",
    turma: "1TDSPY",
    github: "https://github.com/Jonatanfeitosa",
    linkedin: "https://br.linkedin.com/in/jonatanvieirafeitosa",
    foto: fotoJonatan,
  },
  {
    nome: "Fernando Oliveira Francelino Sardinha",
    rm: "570196",
    turma: "1TDSPY",
    github: "https://github.com/tecnando-rpa",
    linkedin: "https://www.linkedin.com/in/fernando-oliveira-1bb875164",
    foto: fotoFernando,
  },
  {
    nome: "Marcelo Candido da Mata Junior",
    rm: "569584",
    turma: "1TDSPY",
    github: "https://github.com/mdamata",
    linkedin: "https://br.linkedin.com/in/marcelo-da-mata",
    foto: fotoMarcelo,
  },
  {
    nome: "Davi Felix Cunha",
    rm: "569393",
    turma: "1TDSPY",
    github: "https://github.com/IsDevZ",
    linkedin: "https://www.linkedin.com/in/davi-felix-99b7a63a9",
    foto: fotoDavi,
  },
];
