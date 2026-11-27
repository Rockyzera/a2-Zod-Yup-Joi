# Declaração de Uso de IA — Avaliação A2

> **Rascunho para revisão do estudante.** Complete os campos marcados antes da entrega. Marque domínio apenas se conseguir explicar o código e os resultados com suas próprias palavras.

## Ferramenta utilizada

- [x] OpenAI Codex (assistente de IA)
- [ ] ChatGPT / GPT-4
- [ ] Claude (Anthropic)
- [ ] GitHub Copilot
- [ ] Codeium
- [ ] Gemini
- [ ] Nenhuma ferramenta de IA foi utilizada

## Como utilizei

Usei o OpenAI Codex como apoio para estudar a comparação entre Zod, Yup e Joi e preparar o mini-laboratório do schema de beneficiário. Sob minha orientação, a ferramenta ajudou a implementar e comparar as regras nos três validadores, integrar os exemplos com React Hook Form, ajustar as mensagens para português e explicar diferenças de API, tipagem e experiência de desenvolvimento.

Também usei o Codex para estruturar e executar um benchmark local. O script verifica os resultados esperados, aquece cada validador, mede entradas válidas e inválidas em cinco rodadas e apresenta a mediana. Revisei a explicação dos números para deixar claro que eles medem validações do schema por segundo nesta máquina, não a velocidade percebida do formulário ou da API.

## Validação realizada  

- A tela do laboratório `/laboratorio-validacao` foi aberta no navegador; o estudante confirmou que os formulários estavam funcionando.
- O comando `npm run lab:schemas` foi executado com sucesso.
- O benchmark usou 20.000 validações por rodada, aquecimento de 5.000 e mediana de cinco rodadas, em Node 24.14.0, Zod 4.6.7, Yup 1.7.1 e Joi 18.3.2, no Windows x64 com Intel Core i5-12450H.
- Os resultados completos e as limitações estão em [docs/estudos/validacao-schemas.md](docs/estudos/validacao-schemas.md).
- **Não registrei uma execução de build ou de testes automatizados nesta etapa.**

O laboratório verifica a quantidade de dígitos do CPF/CNPJ, mas não valida os dígitos verificadores. O benchmark é específico deste computador, destas versões e deste schema; não é um ranking universal nem mede React, bundle do navegador ou latência da API.

## Prompts utilizados  

Os itens abaixo são resumos dos pedidos feitos durante o trabalho, não transcrições literais de todo o histórico:

1. “Explique Zod vs Yup vs Joi considerando API, performance, tipagem, integração com React Hook Form e casos de uso; use o contexto da SocialConnect.”
2. “Implemente os três formulários com as mesmas regras de beneficiário para uma demonstração prática e compare as mensagens.”
3. “Execute o plano do benchmark com os mesmos cenários, registre o método e explique os resultados de forma clara para a apresentação.”

## O que entendo e consigo explicar 

**Estudante: confirme e marque somente os itens que consegue explicar com suas próprias palavras.**

- [x] O que é um schema e como os três validadores aplicam as regras do beneficiário.
- [x] Como o React Hook Form usa `zodResolver`, `yupResolver` e `joiResolver`.
- [x] O que significa “validações por segundo” e quais são os limites deste benchmark.
- [x] Por que o Zod se encaixa no front-end TypeScript atual da SocialConnect e por que a API Java continua validando os dados.

## O que precisei estudar mais 
- Diferenças de inferência de tipos entre Zod, Yup e Joi.
- Como erros e normalização de valores influenciam o benchmark.
- A diferença entre contar dígitos de CPF/CNPJ e validar seus dígitos verificadores.
- Como a validação do navegador complementa, mas não substitui, a validação da API.

## Declaração de autenticidade 

Antes de entregar, confirme pessoalmente:

- [x] Revisei o código incluído na entrega e consigo explicar as partes que usei.
- [x] Conferi se as informações deste arquivo correspondem ao trabalho que realizei.
- [x] O uso de IA foi complementar ao meu aprendizado; revisei as respostas e não apresentei números de benchmark sem executar o teste.
