import { performance } from 'node:perf_hooks'
import { cpus, platform, arch } from 'node:os'
import { beneficiarioJoi, beneficiarioYup, beneficiarioZod, type BeneficiarioZod } from '../src/labs/beneficiarioSchemas'

const entradas = {
  valido: {
    nome: ' Maria da Silva ',
    cpf: '123.456.789-01',
    telefone: '(11) 99999-9999',
    endereco: ' Rua das Flores, 100 ',
    situacaoVulnerabilidade: ' Insegurança alimentar ',
  },
  invalido: {
    nome: 'Maria da Silva',
    cpf: '12345678901',
    telefone: '11999999999',
    endereco: 'Rua das Flores, 100',
    situacaoVulnerabilidade: 'x'.repeat(501),
  },
} satisfies Record<string, BeneficiarioZod>

type Validator = (entrada: unknown) => boolean

const validadores: Record<string, Validator> = {
  Zod: (entrada) => beneficiarioZod.safeParse(entrada).success,
  Yup: (entrada) => {
    try {
      beneficiarioYup.validateSync(entrada, { abortEarly: false, stripUnknown: true })
      return true
    } catch {
      return false
    }
  },
  Joi: (entrada) => !beneficiarioJoi.validate(entrada, { abortEarly: false, convert: true }).error,
}

for (const [tipo, entrada] of Object.entries(entradas)) {
  const esperado = tipo === 'valido'
  for (const [nome, validar] of Object.entries(validadores)) {
    if (validar(entrada) !== esperado) {
      throw new Error(`${nome} não produziu o resultado esperado para a entrada ${tipo}.`)
    }
  }
}

const iteracoes = Number(process.env.BENCH_ITERATIONS ?? 20_000)
const aquecimento = Math.min(5_000, iteracoes)
const rodadas = 5

function medir(validar: Validator, entrada: unknown): number {
  for (let i = 0; i < aquecimento; i++) validar(entrada)
  const inicio = performance.now()
  for (let i = 0; i < iteracoes; i++) validar(entrada)
  return (performance.now() - inicio) / 1000
}

function mediana(valores: number[]): number {
  return [...valores].sort((a, b) => a - b)[Math.floor(valores.length / 2)]
}

console.log(`Node ${process.version}; ${platform()} ${arch()}; CPU ${cpus()[0]?.model ?? 'não identificada'}.`)
console.log(`${iteracoes.toLocaleString('pt-BR')} validações por rodada; aquecimento de ${aquecimento.toLocaleString('pt-BR')}; mediana de ${rodadas} rodadas.`)
console.log('Validação síncrona; entrada e regras iguais; entradas sem coerção de tipos; conversões configuradas para normalizar strings.')

for (const [tipo, entrada] of Object.entries(entradas)) {
  console.log(`\nEntrada ${tipo}:`)
  const nomes = Object.keys(validadores)
  const temposPorValidador = Object.fromEntries(nomes.map((nome) => [nome, [] as number[]]))
  for (let rodada = 0; rodada < rodadas; rodada++) {
    // Alterna quem mede primeiro para reduzir o viés de ordem entre rodadas.
    const ordem = nomes.map((_, indice) => nomes[(indice + rodada) % nomes.length])
    for (const nome of ordem) {
      const validar = validadores[nome]
      if (!validar) continue
      temposPorValidador[nome]?.push(medir(validar, entrada))
    }
  }
  for (const nome of nomes) {
    const validar = validadores[nome]
    if (!validar) continue
    const tempos = temposPorValidador[nome] ?? []
    const segundos = mediana(tempos)
    const operacoesPorSegundo = Math.round(iteracoes / segundos)
    console.log(`  ${nome}: ${operacoesPorSegundo.toLocaleString('pt-BR')} ops/s (mediana ${segundos.toFixed(3)} s)`)
  }
}
