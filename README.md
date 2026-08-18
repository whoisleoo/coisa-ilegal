# Base TypeScript -> .exe

Estrutura minima para compilar um app TypeScript (CLI) em um unico `.exe`
para Windows, com icone e metadados (nome, empresa, versao) proprios,
sem instalador.

## Como usar

1. Instale as dependencias:
   ```
   npm install
   ```
2. Edite `src/index.ts` com a logica do seu app.
3. Coloque um icone real em `assets/icon.ico` (veja `assets/LEIA-ME.txt`).
4. Ajuste o nome do app, empresa, descricao e versao em `package.json`,
   dentro do bloco `"config"`.
5. Gere o `.exe`:
   ```
   npm run dist
   ```
6. O executavel final fica em `dist/<appName>.exe` (nome definido em
   `package.json` -> `config.appName`), pronto para distribuir sozinho,
   sem instalador.

## O que cada script faz

- `npm run build` - compila o TypeScript (`src/`) para JavaScript (`dist/`).
- `npm run prepare-base` - copia o binario-base do Node (baixado
  automaticamente pelo `pkg`) para `.cache/node-base.exe` e usa o
  `rcedit` pra gravar icone, nome do produto, descricao, empresa e
  versao nessa copia.
- `npm run package` - usa o `@yao-pkg/pkg` para empacotar esse
  binario-base (ja com icone/metadados) + o JS compilado num unico
  `.exe`.
- `npm run dist` - roda os tres passos acima em sequencia. O `.exe`
  final fica em `dist/`.

### Por que gravar o icone antes de empacotar?

O `pkg` gera o `.exe` anexando o codigo da sua aplicacao ao final de um
binario-base do Node.js. Se voce tentar usar o `rcedit` **depois** que
o `pkg` ja gerou o `.exe`, ele reescreve o arquivo sem saber desses
dados anexados e corrompe o pacote (erro "Pkg: Error reading from
file."). Por isso o icone/metadados sao gravados no binario-base
*antes*, guardado em `.cache/node-base.exe` (fora do cache normal do
`pkg`, que fica intocado) e passado ao `pkg` via variavel de ambiente
`PKG_NODE_PATH` (mecanismo oficial do `pkg` para usar um binario-base
customizado).

## Observacoes

- O target de build (`node18-win-x64`, usado tanto em
  `scripts/pkg-base.js` quanto no script `package`) pode ser trocado
  para outras versoes/arquiteturas do Node suportadas pelo `pkg` (ex:
  `node20-win-x64`) - troque nos dois lugares.
- Se `assets/icon.ico` nao existir, `npm run prepare-base` avisa e
  segue sem icone customizado (o `.exe` usa o icone padrao do Node).
- A pasta `.cache/` e local (nao versionada) e recriada a cada build;
  pode ser apagada a qualquer momento.
- Nao ha instalador: o resultado e um unico arquivo `.exe` autocontido.
