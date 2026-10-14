# Fazenda da Coletoria — itens a validar antes de publicar

## Bloqueadores (o site não funciona plenamente sem isso)
1. **Canal de contato.** Em `js/main.js`, preencher `CONTACT = { email: '', whatsapp: '' }`.
   Enquanto estiver vazio, o formulário valida os campos mas **não envia nada** e avisa o visitante.
   Também faltam telefone, e-mail e responsável visíveis na seção Contato (comentário `VALIDAR` no HTML).
2. **Domínio.** Trocar `https://www.fazendadacoletoria.com.br` (exemplo, não confirmado) em `index.html`
   (canonical e og:image), `robots.txt` e `sitemap.xml`.
3. **Finalidade.** O PDF não diz se a propriedade está à venda, para arrendamento ou parceria.
   Os textos falam em "oportunidades" e "avaliar", sem afirmar venda.

## Imagens
- **Só 1 foto tem resolução alta** (cachoeira, 1448 px), usada na abertura. As demais têm 236 a 552 px e
  aparecem em tamanho reduzido. Para uma abertura em tela cheia com a vista aérea, enviar os originais
  (principalmente drone e mirante).
- **Usadas (do acervo da fazenda, a confirmar):** cachoeira, vistas aéreas da sede, campos do mirante,
  gruta (4), lagoas (2), taipas (2).
- **Não usadas (aparentam banco de imagens):** gaúchos a cavalo, bovino, ovelhas, uvas, maçãs, apicultor,
  favos, queijos, cavalo na neve, quadriciclo, trilha, famílias, piquenique, arvorismo, churrasco, chalé em A
  (renderização 3D), araucária ao pôr do sol e pinhões.
- **Fauna** (graxaim, gralha-azul, quero-quero, tatu): não usada por incerteza de origem. Confirmar se são da fazenda.
- **Logo:** o PDF só trouxe a versão raster (328×130 px). Enviar em SVG.

## Conteúdo
- **Terceiros omitidos:** Quinta da Neve, Vinícola Suzin e Grupo Fischer aparecem no PDF, mas **não** no site,
  até haver autorização. Os textos foram reescritos de forma genérica.
- **Estrada × frente asfaltada:** o PDF diz que a SJM-270 está "em pavimentação" e também que há ~2 km de
  frente asfaltada. Confirmar em qual via fica a frente.
- **Gruta de São João Maria:** confirmar se o proprietário aceita divulgação e visitação, e o texto da
  data estadual de 3 de maio (mantido como no PDF).
- **Turismo:** tudo está como "potencial a avaliar". Nada é apresentado como oferta existente.
- **Correções feitas ao PDF:** numeração dos 8 eixos de turismo reordenada; "Ponte de Corda" unida a
  "pontes suspensas"; imagem quebrada da p. 18 ignorada.
- **Dados que não existem no PDF e não foram inventados:** preço, matrícula, CAR, reserva legal e APP,
  energia, internet, outorga de água, coordenadas, mapa.
- **Idioma:** somente português.
