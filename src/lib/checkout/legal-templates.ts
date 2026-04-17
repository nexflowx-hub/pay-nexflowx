// =============================================================================
// Legal Document Templates for NeXFlowX-Powered European E-Commerce Checkout
// =============================================================================

export type LegalDocType = 'terms' | 'privacy' | 'refund';

interface LegalContent {
  title: string;
  content: string;
}

// ---------------------------------------------------------------------------
// NeXFlowX Infrastructure Clause (appended to every document)
// ---------------------------------------------------------------------------

const infrastructureClause: Record<string, string> = {
  pt: '<p><em>Infraestrutura segura e processamento de pagamentos garantidos por NeXFlowX. {store_name} atua como comerciante independente.</em></p>',
  en: '<p><em>Secure Infrastructure and Payment Processing powered by NeXFlowX. {store_name} acts as an independent merchant.</em></p>',
  es: '<p><em>Infraestructura segura y procesamiento de pagamentos garantizados por NeXFlowX. {store_name} actúa como comerciante independiente.</em></p>',
  fr: '<p><em>Infrastructure sécurisée et traitement des paiements garanti par NeXFlowX. {store_name} agit en tant que commerçant indépendant.</em></p>',
};

// ---------------------------------------------------------------------------
// TEMPLATES — Portuguese (pt)
// ---------------------------------------------------------------------------

const pt: Record<LegalDocType, { title: string; content: string }> = {
  // ── Terms & Conditions (PT) ────────────────────────────────────────────
  terms: {
    title: 'Termos e Condições Gerais',
    content: `
<h2>1. Âmbito e Disposições Gerais</h2>
<p>Os presentes Termos e Condições Gerais ("TCG") regulam a utilização da loja online de <strong>{store_name}</strong>, acessível através do respetivo website e plataforma de vendas. Ao realizar qualquer compra na nossa loja, o utilizador declara ter lido, compreendido e aceitado integralmente os presentes termos, bem como a nossa Política de Privacidade e Política de Reembolso, as quais constituem parte integrante deste contrato.</p>
<p>Estes termos aplicam-se a todos os consumidores, na aceção da Diretiva 2011/83/UE do Parlamento Europeu e do Conselho, de 25 de outubro de 2011, relativa aos direitos dos consumidores, bem como a todas as transações comerciais realizadas através da nossa plataforma.</p>
<p><strong>{store_name}</strong> reserva-se o direito de alterar os presentes termos a qualquer momento, sendo as alterações aplicáveis a partir da respetiva publicação no website. Recomendamos a consulta periódica desta página.</p>

<h2>2. Identidade do Comerciante</h2>
<p>O responsável pela loja online é <strong>{store_name}</strong>, com sede em Portugal, registado nos termos da legislação portuguesa e europeia aplicável. Para efeitos de contacto:</p>
<ul>
  <li><strong>Denominação:</strong> {store_name}</li>
  <li><strong>Email de contacto:</strong> disponível na página de contacto do website</li>
  <li><strong>Horário de atendimento:</strong> dias úteis, das 09:00 às 18:00 (hora de Lisboa)</li>
</ul>
<p>O Número de Identificação Fiscal (NIF) e demais dados de registo encontram-se disponíveis na secção "Sobre Nós" do website ou mediante solicitação.</p>

<h2>3. Descrição dos Produtos e Serviços</h2>
<p>Os produtos e serviços disponíveis na loja online são descritos com o maior rigor possível, incluindo imagens, características técnicas, dimensões, composição materiais e informações de utilização. <strong>{store_name}</strong> envida todos os esforços para garantir que as descrições, fotografias e informações apresentadas reflitam fielmente a natureza dos produtos.</p>
<p>No entanto, não poderemos garantir uma reprodução absoluta das cores, sendo estas suscetíveis de variação consoante o equipamento utilizado pelo utilizador. As eventuais discrepâncias de cor não constituem motivo de reclamação. Reservamo-nos o direito de corrigir erros, imprecisões ou omissões nas descrições dos produtos a qualquer momento, sem aviso prévio.</p>

<h2>4. Preços e Tributação</h2>
<p>Todos os preços indicados na loja online incluem IVA à taxa legal em vigor em Portugal. Para entregas dentro da União Europeia, o IVA será aplicado de acordo com as regras de localização do serviço ou bem, conforme previsto no Regime do IVA nas Operações Intracomunitárias. Para entregas fora da UE, poderão ser aplicáveis direitos aduaneiros, taxas de importação e impostos locais, cuja responsabilidade de pagamento recai integralmente sobre o comprador.</p>
<p>Os preços podem ser alterados a qualquer momento sem aviso prévio. A validade dos preços é garantida apenas no momento da confirmação do pedido. Promoções e descontos estão sujeitos a condições específicas, que serão claramente indicadas na respetiva oferta.</p>

<h2>5. Processo de Encomenda</h2>
<p>O processo de encomenda compreende as seguintes etapas: (i) seleção dos produtos pretendidos e adição ao carrinho de compras; (ii) verificação dos dados da encomenda; (iii) fornecimento dos dados de faturação e entrega; (iv) seleção do método de pagamento; (v) revisão e aceitação dos presentes TCG; e (vi) confirmação da encomenda.</p>
<p>A confirmação da encomenda por parte de <strong>{store_name}</strong> constitui aceitação da proposta de compra. Todos os pedidos estão sujeitos a disponibilidade de stock. Em caso de indisponibilidade, o cliente será informado no prazo máximo de 48 horas e oferecida uma alternativa ou o reembolso integral.</p>

<h2>6. Métodos de Pagamento</h2>
<p><strong>{store_name}</strong> aceita os seguintes métodos de pagamento, processados de forma segura através da infraestrutura NeXFlowX:</p>
<ul>
  <li><strong>Cartões de débito e crédito</strong> — Visa, Mastercard, American Express e outras redes suportadas</li>
  <li><strong>MB WAY</strong> — pagamento instantâneo através da app MB WAY, disponível para clientes de bancos portugueses</li>
  <li><strong>PIX</strong> — transferência instantânea para clientes com conta bancária brasileira</li>
  <li><strong>Transferência bancária SEPA/IBAN</strong> — transferência europeia, com prazo de processamento de 1 a 3 dias úteis</li>
</ul>
<p>O pagamento é processado no momento da confirmação da encomenda. Para pagamentos por transferência bancária, a encomenda apenas será expedida após a confirmação do recebimento do pagamento. Todas as transações financeiras são processadas com encriptação SSL/TLS de 256 bits e cumprem os requisitos do PCI DSS.</p>

<h2>7. Entrega de Produtos</h2>
<p>A entrega de produtos divide-se em duas categorias: <strong>produtos digitais</strong> e <strong>produtos físicos</strong>.</p>
<h3>7.1 Produtos Digitais</h3>
<p>Para produtos digitais (e-books, software, conteúdos descarregáveis, subscrições), a entrega é efetuada de forma imediata ou no prazo indicado na descrição do produto, através de download ou acesso online. O direito de arrependimento pode não ser aplicável conforme o disposto no artigo 16.º da Diretiva 2011/83/UE, caso o consumidor tenha dado o seu consentimento expresso e reconhecido que perde o direito de arrependimento.</p>
<h3>7.2 Produtos Físicos</h3>
<p>Para produtos físicos, os prazos de entrega indicados são estimativas e contam a partir da data de envio da encomenda. <strong>{store_name}</strong> compromete-se a enviar os produtos no prazo de 2 a 5 dias úteis após a confirmação do pagamento, salvo indicação contrária. O prazo de entrega efetivo depende do transportador e do destino. Os custos de envio são calculados com base no destino, peso e dimensões do pacote, sendo indicados antes da finalização da compra.</p>
<p>O risco de perda ou deterioração dos produtos transfere-se para o consumidor no momento da entrega física, conforme previsto no artigo 20.º da Diretiva 2011/83/UE.</p>

<h2>8. Direito de Arrependimento</h2>
<p>O consumidor dispõe de um prazo de <strong>14 dias</strong> para exercer o direito de arrependimento, sem necessidade de justificação, contado a partir da data de receção do produto ou, no caso de múltiplos produtos encomendados numa só transação, da receção do último produto.</p>
<p>Para exercer este direito, o consumidor deve notificar <strong>{store_name}</strong> através da declaração de arrependimento disponível no website ou por email, indicando claramente a sua decisão. Os produtos devem ser devolvidos no seu estado original, sem sinais de utilização, na embalagem original e com todos os acessórios, no prazo máximo de 14 dias após a notificação de arrependimento.</p>
<p>Os custos de devolução são da responsabilidade do consumidor, salvo se <strong>{store_name}</strong> tiver omitido informações sobre o direito de arrependimento ou fornecido o modelo de formulário de devolução. O reembolso será efetuado no prazo de 14 dias após a receção dos produtos devolvidos, utilizando o mesmo método de pagamento utilizado na compra.</p>

<h2>9. Limitação de Responsabilidade</h2>
<p><strong>{store_name}</strong> não se responsabiliza por danos indiretos, incidentais ou consequentes decorrentes da utilização dos produtos adquiridos, incluindo, mas não limitado a, perda de lucros, interrupção de atividade ou perda de dados. A responsabilidade total de <strong>{store_name}</strong> por qualquer reclamação não excederá o valor total pago pelo produto objeto da reclamação.</p>
<p>Não nos responsabilizamos por atrasos ou falhas na entrega causados por força maior, incluindo catástrofes naturais, pandemias, greves, decisões governamentais ou problemas logísticos dos transportadores.</p>

<h2>10. Lei Aplicável e Resolução de Litígios</h2>
<p>Os presentes termos são regidos pela lei portuguesa, sem prejuízo das disposições imperativas do direito da União Europeia aplicáveis ao consumidor. Para a resolução de litígios, o consumidor pode recorrer à Plataforma Europeia de Resolução de Litígios em Linha (ODR), disponível em <strong>https://ec.europa.eu/consumers/odr/</strong>.</p>
<p>Para questões não resolvidas pela via extrajudicial, será competente o Centro de Arbitragem de Conflitos de Consumo de Lisboa ou, em alternativa, os tribunais judiciais da comarca de Lisboa, com renúncia a qualquer outro foro que possa ser competente.</p>

<h2>11. Alterações aos Termos e Condições</h2>
<p><strong>{store_name}</strong> reserva-se o direito de modificar os presentes Termos e Condições a qualquer momento. As alterações entrarão em vigor na data da sua publicação no website. Em caso de alterações substanciais, os clientes serão notificados por email. A continuação da utilização da plataforma após a publicação das alterações implica a sua aceitação tácita.</p>

<h2>12. Disposições Finais</h2>
<p>Se qualquer disposição dos presentes TCG for considerada nula ou inexequível, as restantes disposições manter-se-ão em pleno vigor. A falha de <strong>{store_name}</strong> em exercer qualquer direito previsto nestes termos não constitui renúncia ao mesmo. Estes termos constituem o acordo integral entre o consumidor e <strong>{store_name}</strong> relativamente às compras efetuadas na loja online, substituindo quaisquer acordos anteriores.</p>
<p>Em caso de dúvidas ou questões relativas a estes Termos e Condições, contacte-nos através dos canais indicados na secção "Identidade do Comerciante".</p>
`,
  },

  // ── Privacy Policy (PT) ────────────────────────────────────────────────
  privacy: {
    title: 'Política de Privacidade e Proteção de Dados',
    content: `
<h2>1. Responsável pelo Tratamento</h2>
<p>O responsável pelo tratamento dos dados pessoais, nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD — Regulamento (UE) 2016/679) e da Lei n.º 58/2019, é <strong>{store_name}</strong>, com sede em Portugal. Para questões relacionadas com a proteção dos seus dados pessoais, pode contactar-nos através dos endereços indicados na secção de contacto do website.</p>
<p><strong>{store_name}</strong> compromete-se a tratar os seus dados pessoais com o máximo cuidado e respeito pela sua privacidade, em conformidade com a legislação aplicável em matéria de proteção de dados.</p>

<h2>2. Dados Pessoais Recolhidos</h2>
<p>Recolhemos as seguintes categorias de dados pessoais, consoante as interações do titular com os nossos serviços:</p>
<h3>2.1 Dados de Identificação e Contacto</h3>
<ul>
  <li>Nome completo e apelido</li>
  <li>Morada de faturação e entrega</li>
  <li>Código postal, cidade e país</li>
  <li>Número de telefone (incluindo número para MB WAY)</li>
  <li>Endereço de email</li>
  <li>Data de nascimento (quando aplicável, para verificação de idade)</li>
</ul>
<h3>2.2 Dados de Pagamento</h3>
<ul>
  <li>Dados de cartão de crédito/débito (processados diretamente pela NeXFlowX, sem passagem pelos nossos servidores)</li>
  <li>Número de conta bancária IBAN (para reembolsos por transferência)</li>
  <li>Informações de transação (valor, data, método de pagamento)</li>
</ul>
<h3>2.3 Dados Técnicos e de Navegação</h3>
<ul>
  <li>Endereço IP</li>
  <li>Tipo e versão do navegador</li>
  <li>Sistema operativo e dispositivo utilizado</li>
  <li>Páginas visitadas, tempo de permanência e padrões de navegação</li>
  <li>Dados de cookies e tecnologias similares (ver secção 8)</li>
  <li>Dados de localização aproximada (quando autorizado)</li>
</ul>

<h2>3. Finalidades e Base Legal do Tratamento</h2>
<p>Os seus dados pessoais são tratados para as seguintes finalidades, com base nas respetivas bases legais previstas no RGPD:</p>
<h3>3.1 Execução do Contrato</h3>
<p>Tratamento necessário para a execução do contrato de compra e venda, incluindo processamento de encomendas, gestão de pagamentos, entrega de produtos, emissão de faturas e comunicação relativa ao estado das encomendas. <strong>Base legal: Art.º 6.º, n.º 1, alínea b) do RGPD.</strong></p>
<h3>3.2 Obrigações Legais</h3>
<p>Tratamento necessário para o cumprimento de obrigações legais, incluindo requisitos fiscais, contabilísticos e de combate ao branqueamento de capitais e financiamento do terrorismo. <strong>Base legal: Art.º 6.º, n.º 1, alínea c) do RGPD.</strong></p>
<h3>3.3 Interesses Legítimos</h3>
<p>Análise estatística e melhoria dos nossos serviços, prevenção de fraudes, segurança da plataforma e gestão de reclamações. <strong>Base legal: Art.º 6.º, n.º 1, alínea f) do RGPD.</strong></p>
<h3>3.4 Consentimento</h3>
<p>Envio de comunicações de marketing, newsletters e ofertas personalizadas. O consentimento pode ser retirado a qualquer momento. <strong>Base legal: Art.º 6.º, n.º 1, alínea a) do RGPD.</strong></p>

<h2>4. Período de Conservação dos Dados</h2>
<p>Os seus dados pessoais são conservados pelo período necessário para as finalidades para as quais foram recolhidos:</p>
<ul>
  <li><strong>Dados de transação e faturação:</strong> 10 anos, conforme obrigação legal (Código Fiscal e Normas Contabilísticas)</li>
  <li><strong>Dados de conta de cliente:</strong> durante a vigência da conta e 3 anos após a última interação</li>
  <li><strong>Dados de comunicação de marketing:</strong> até à revogação do consentimento</li>
  <li><strong>Dados de navegação e cookies:</strong> 13 meses para cookies analíticos; até à revogação do consentimento para os restantes</li>
  <li><strong>Dados de processos judiciais:</strong> durante a tramitação do processo e 5 anos após o seu encerramento</li>
</ul>
<p>Findo o período de conservação aplicável, os dados serão eliminados ou anonimizados de forma segura, salvo quando a sua conservação se justifique por motivos legítimos ou exigência legal.</p>

<h2>5. Direitos dos Titulares dos Dados</h2>
<p>Nos termos do RGPD, o titular dos dados pessoais tem os seguintes direitos, que pode exercer a qualquer momento:</p>
<ul>
  <li><strong>Direito de acesso (Art.º 15.º):</strong> solicitar informações sobre o tratamento dos seus dados e obter uma cópia dos mesmos</li>
  <li><strong>Direito de retificação (Art.º 16.º):</strong> solicitar a correção de dados inexatos ou incompletos</li>
  <li><strong>Direito ao apagamento (Art.º 17.º):</strong> solicitar a eliminação dos seus dados pessoais, nas condições previstas no RGPD ("direito ao esquecimento")</li>
  <li><strong>Direito à limitação do tratamento (Art.º 18.º):</strong> solicitar a restrição do tratamento dos seus dados em determinadas circunstâncias</li>
  <li><strong>Direito à portabilidade (Art.º 20.º):</strong> receber os seus dados num formato estruturado, de uso corrente e de leitura automática, ou solicitar a sua transmissão a outro responsável</li>
  <li><strong>Direito de oposição (Art.º 21.º):</strong> opor-se ao tratamento dos seus dados por motivos relacionados com a sua situação particular, incluindo o tratamento para fins de marketing direto</li>
  <li><strong>Direito de não ser sujeito a decisões automatizadas (Art.º 22.º):</strong> não ficar sujeito a decisões baseadas unicamente no tratamento automatizado que produzam efeitos jurídicos ou o afetem de forma significativa</li>
</ul>
<p>Para exercer qualquer destes direitos, contacte-nos através do email de proteção de dados disponível no website. Responderemos ao seu pedido no prazo de 30 dias, que pode ser prorrogado em mais 60 dias em casos complexos, sendo o titular informado dessa prorrogação.</p>
<p>Caso considere que o tratamento dos seus dados viola o RGPD, tem o direito de apresentar uma reclamação junto da Comissão Nacional de Proteção de Dados (CNPD) — <strong>https://www.cnpd.pt</strong>.</p>

<h2>6. Cookies e Tecnologias Similares</h2>
<p>O website de <strong>{store_name}</strong> utiliza cookies e tecnologias similares para melhorar a experiência do utilizador, analisar o tráfego e personalizar conteúdos. Os cookies dividem-se nas seguintes categorias:</p>
<ul>
  <li><strong>Cookies essenciais:</strong> necessários ao funcionamento do website e do processo de checkout (não requerem consentimento)</li>
  <li><strong>Cookies de desempenho:</strong> recolhem informações sobre a utilização do website para fins estatísticos (requerem consentimento)</li>
  <li><strong>Cookies de funcionalidade:</strong> permitem funcionalidades avançadas como preferências de idioma e personalização (requerem consentimento)</li>
  <li><strong>Cookies de marketing:</strong> utilizados para apresentar publicidade relevante e medir a eficácia de campanhas (requerem consentimento)</li>
</ul>
<p>O consentimento para a utilização de cookies não essenciais é solicitado no momento da primeira visita ao website, através de um banner de consentimento. Pode gerir ou retirar o seu consentimento a qualquer momento nas definições do seu navegador.</p>

<h2>7. Subcontratantes de Tratamento</h2>
<p>Para o processamento dos seus dados pessoais, <strong>{store_name}</strong> recorre aos seguintes subcontratantes, que atuam sob as nossas instruções e em conformidade com contratos de tratamento de dados aprovados ao abrigo do Art.º 28.º do RGPD:</p>
<ul>
  <li><strong>NeXFlowX</strong> — Processamento de pagamentos (cartões, MB WAY, PIX, SEPA/IBAN), validação de transações e prevenção de fraudes</li>
  <li><strong>Transportadoras</strong> — Processamento de dados de entrega necessários à expedição de encomendas</li>
  <li><strong>Serviços de cloud computing</strong> — Alojamento seguro dos dados e infraestrutura tecnológica</li>
  <li><strong>Ferramentas analíticas</strong> — Análise de padrões de utilização e melhoria da experiência do utilizador</li>
</ul>

<h2>8. Transferências Internacionais de Dados</h2>
<p>Os seus dados pessoais podem ser transferidos para países fora do Espaço Económico Europeu (EEE) no âmbito do processamento de pagamentos e serviços de infraestrutura. Estas transferências são efetuadas ao abrigo de decisões de adequação da Comissão Europeia, cláusulas contratuais-tipo aprovadas pela Comissão, ou com o seu consentimento expresso.</p>
<p>Garantimos que os dados transferidos beneficiam de um nível de proteção equivalente ao assegurado pelo RGPD, através de medidas técnicas e organizativas adequadas.</p>

<h2>9. Delegado de Proteção de Dados (DPO)</h2>
<p><strong>{store_name}</strong> designou um Delegado de Proteção de Dados (DPO), que pode ser contactado através do email indicado na página de política de privacidade do website para qualquer questão relacionada com o tratamento dos seus dados pessoais.</p>

<h2>10. Medidas de Segurança</h2>
<p>Implementamos medidas técnicas e organizativas robustas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição, incluindo: encriptação SSL/TLS de 256 bits para todas as comunicações; autenticação multifator para acesso a painéis administrativos; controlos de acesso baseados em funções; monitorização contínua da infraestrutura; cópias de segurança regulares e encriptadas; auditorias de segurança periódicas.</p>
<p>Em caso de violação de dados pessoais suscetível de gerar risco para os titulares, <strong>{store_name}</strong> notificará a CNPD e os titulares afetados no prazo de 72 horas, conforme exigido pelo Art.º 33.º e 34.º do RGPD.</p>

<h2>11. Alterações à Política de Privacidade</h2>
<p>Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. As alterações significativas serão comunicadas através do website e/ou por email. A versão mais recente encontra-se sempre disponível no nosso website, com indicação da data da última atualização.</p>
`,
  },

  // ── Refund Policy (PT) ─────────────────────────────────────────────────
  refund: {
    title: 'Política de Reembolso e Devoluções',
    content: `
<h2>1. Direito de Arrependimento (14 Dias)</h2>
<p>De acordo com a Diretiva 2011/83/UE do Parlamento Europeu e do Conselho e o Decreto-Lei n.º 24/2014, transposto para a legislação portuguesa, o consumidor tem o direito de se arrepende da compra no prazo de <strong>14 dias corridos</strong> a contar da data de receção do produto ou, no caso de uma encomenda com múltiplos itens, da data de receção do último item.</p>
<p>Este direito pode ser exercido sem necessidade de apresentar qualquer justificação. O consumidor deve informar <strong>{store_name}</strong> da sua decisão de arrependimento através de uma declaração inequívoca (email, formulário de devolução disponível no website ou contacto telefónico), indicando o número da encomenda e os produtos objeto da devolução.</p>
<p>Os produtos devem ser devolvidos no seu estado original, sem sinais de utilização, danos ou alterações, na embalagem original e acompanhados de todos os acessórios, manuais e documentação. A devolução deve ser efetuada no prazo máximo de 14 dias após a comunicação do arrependimento. Os custos de envio da devolução são da responsabilidade do consumidor, salvo disposição em contrário.</p>

<h2>2. Exceções ao Direito de Arrependimento</h2>
<p>O direito de arrependimento <strong>não é aplicável</strong> nos seguintes casos, conforme previsto no artigo 16.º da Diretiva 2011/83/UE:</p>
<ul>
  <li><strong>Bens digitais</strong> — Quando o consumidor tenha dado o seu consentimento expresso para iniciar a execução do contrato e tenha reconhecido que, ao fazê-lo, perde o direito de arrependimento. Isto inclui downloads de software, e-books, músicas, vídeos, códigos de ativação e conteúdos digitais desbloqueados.</li>
  <li><strong>Bens selados por razões de proteção de saúde ou higiene</strong> — que tenham sido abertos após a entrega</li>
  <li><strong>Bens confeccionados de acordo com as especificações do consumidor</strong> — ou claramente personalizados</li>
  <li><strong>Bens que por razões óbvias não podem ser devolvidos</strong> — sujeitos a deterioração rápida ou prazo de validade</li>
  <li><strong>Bens que, após a entrega, tenham sido inseparavelmente misturados com outros itens</strong></li>
  <li><strong>Bens audiovisuais ou de software informático selados</strong> — que tenham sido abertos após a entrega</li>
  <li><strong>Jornais, periódicos ou revistas</strong> — com exceção de assinaturas</li>
</ul>

<h2>3. Processo de Reembolso</h2>
<p>O reembolso será processado no prazo de <strong>5 a 14 dias úteis</strong> após a receção e verificação do estado dos produtos devolvidos. O montante do reembolso inclui o valor pago pelo produto e os custos de envio originais (quando aplicável), deduzidos dos custos de devolução, quando estes sejam da responsabilidade do consumidor.</p>
<p>O reembolso será efetuado utilizando o <strong>mesmo método de pagamento</strong> utilizado na compra original:</p>
<ul>
  <li><strong>Cartão de crédito/débito:</strong> O reembolso será creditado na conta do cartão em 5 a 10 dias úteis, dependendo do emitente do cartão</li>
  <li><strong>MB WAY:</strong> Reembolso creditado no saldo MB WAY em 1 a 3 dias úteis</li>
  <li><strong>PIX:</strong> Reembolso transferido em 1 a 2 dias úteis</li>
  <li><strong>Transferência bancária SEPA/IBAN:</strong> Reembolso creditado em 3 a 5 dias úteis</li>
</ul>
<p>O consumidor será informado por email da receção dos produtos devolvidos, da aprovação ou recusa do reembolso, e da data em que o reembolso foi efetuado.</p>

<h2>4. Condições de Devolução</h2>
<p>Para que a devolução seja aceite, os produtos devem cumprir os seguintes requisitos:</p>
<ul>
  <li>Encontrar-se no estado original, sem sinais de utilização, lavagem, alteração ou personalização</li>
  <li>Ter todas as etiquetas e selos intactos</li>
  <li>Conservar a embalagem original em bom estado</li>
  <li>Incluir todos os acessórios, manuais, cabos e componentes fornecidos</li>
  <li>Acompanhar o comprovativo de compra (fatura ou recibo) ou o número da encomenda</li>
</ul>
<p>Reservamo-nos o direito de recusar devoluções que não cumpram estes requisitos ou de efetuar um reembolso parcial, conforme indicado na secção 6.</p>

<h2>5. Produtos Danificados ou Defeituosos</h2>
<p>Se receber um produto danificado, defeituoso ou que não corresponda à descrição, contacte <strong>{store_name}</strong> no prazo máximo de <strong>48 horas</strong> após a receção, acompanhando a sua comunicação com fotografias claras do dano ou defeito. Nestes casos:</p>
<ul>
  <li>O consumidor <strong>não</strong> suporta os custos de devolução</li>
  <li>O reembolso integral (incluindo custos de envio) será processado em 5 a 14 dias úteis</li>
  <li>Alternativamente, o consumidor pode optar pela substituição do produto ou reparação, conforme preferência</li>
</ul>
<p>Os prazos de garantia legal são os previstos na legislação portuguesa: 2 anos para bens de consumo, contados a partir da data de entrega, sem prejuízo de prazos superiores previstos em garantias comerciais.</p>

<h2>6. Reembolsos Parciais</h2>
<p><strong>{store_name}</strong> reserva-se o direito de efetuar um reembolso parcial nos seguintes casos:</p>
<ul>
  <li>Os produtos apresentam sinais evidentes de utilização que diminuam o seu valor</li>
  <li>A embalagem original foi significativamente danificada</li>
  <li>Faltam acessórios, manuais ou componentes fornecidos originalmente</li>
  <li>A devolução é parcial (apenas alguns itens de uma encomenda múltipla) e os custos de envio proporcionais são deduzidos</li>
  <li>Os itens devolvidos foram adquiridos com desconto promocional e a devolução altera as condições da promoção</li>
</ul>
<p>Nestes casos, o consumidor será informado do motivo da dedução e do valor do reembolso parcial antes de este ser processado.</p>

<h2>7. Informações de Contacto</h2>
<p>Para solicitar um reembolso, iniciar uma devolução ou apresentar uma reclamação relativa a um produto, contacte <strong>{store_name}</strong> através dos seguintes canais:</p>
<ul>
  <li><strong>Email:</strong> disponível na página de contacto do website</li>
  <li><strong>Formulário de devolução:</strong> acessível na sua conta de cliente, na secção "Minhas Encomendas"</li>
  <li><strong>Telefone:</strong> disponível na página de contacto (dias úteis, 09:00–18:00)</li>
</ul>
<p>Recomendamos a utilização do formulário de devolução online para um processamento mais rápido e eficiente. Todos os pedidos de reembolso são tratados por ordem de receção e o consumidor receberá uma confirmação no prazo de 24 horas úteis.</p>
`,
  },
};

// ---------------------------------------------------------------------------
// TEMPLATES — English (en)
// ---------------------------------------------------------------------------

const en: Record<LegalDocType, { title: string; content: string }> = {
  // ── Terms & Conditions (EN) ────────────────────────────────────────────
  terms: {
    title: 'Terms and Conditions',
    content: `
<h2>1. Scope and General Provisions</h2>
<p>These Terms and Conditions ("T&Cs") govern the use of the online store operated by <strong>{store_name}</strong>, accessible through its website and sales platform. By placing any order on our store, the user acknowledges having read, understood, and fully accepted these terms, as well as our Privacy Policy and Refund Policy, which form an integral part of this agreement.</p>
<p>These terms apply to all consumers within the meaning of Directive 2011/83/EU of the European Parliament and of the Council of 25 October 2011 on consumer rights, as well as to all commercial transactions carried out through our platform.</p>
<p><strong>{store_name}</strong> reserves the right to amend these terms at any time. Changes shall become effective upon publication on the website. We recommend that you periodically review this page to stay informed of any updates.</p>

<h2>2. Merchant Identity</h2>
<p>The operator of the online store is <strong>{store_name}</strong>, registered in Portugal in accordance with applicable Portuguese and European law. For all contact purposes:</p>
<ul>
  <li><strong>Business name:</strong> {store_name}</li>
  <li><strong>Contact email:</strong> available on the contact page of the website</li>
  <li><strong>Business hours:</strong> Monday to Friday, 09:00 to 18:00 (Lisbon time, CET/CEST)</li>
</ul>
<p>The Tax Identification Number (NIF) and other registration details are available in the "About Us" section of the website or upon request.</p>

<h2>3. Product and Service Descriptions</h2>
<p>Products and services available in the online store are described with the greatest possible accuracy, including images, technical specifications, dimensions, material composition, and usage information. <strong>{store_name}</strong> makes every effort to ensure that descriptions, photographs, and information presented accurately reflect the nature of the products.</p>
<p>However, we cannot guarantee absolute color reproduction, as colors may vary depending on the user's equipment. Any color discrepancies do not constitute grounds for a claim. We reserve the right to correct errors, inaccuracies, or omissions in product descriptions at any time without prior notice.</p>

<h2>4. Pricing and Taxation</h2>
<p>All prices displayed on the online store include VAT at the applicable legal rate in Portugal. For deliveries within the European Union, VAT shall be applied in accordance with the rules on the place of supply of goods and services, as provided under EU VAT regulations. For deliveries outside the EU, customs duties, import taxes, and local charges may apply, for which the purchaser bears full responsibility.</p>
<p>Prices may be changed at any time without prior notice. The validity of prices is guaranteed only at the time of order confirmation. Promotions and discounts are subject to specific conditions, which will be clearly indicated in the respective offer.</p>

<h2>5. Order Process</h2>
<p>The order process comprises the following steps: (i) selection of desired products and addition to the shopping cart; (ii) review of order details; (iii) entry of billing and delivery information; (iv) selection of payment method; (v) review and acceptance of these T&Cs; and (vi) order confirmation.</p>
<p>Confirmation of the order by <strong>{store_name}</strong> constitutes acceptance of the purchase proposal. All orders are subject to product availability. In the event of unavailability, the customer will be notified within 48 hours and offered an alternative or a full refund.</p>

<h2>6. Payment Methods</h2>
<p><strong>{store_name}</strong> accepts the following payment methods, processed securely through the NeXFlowX infrastructure:</p>
<ul>
  <li><strong>Debit and credit cards</strong> — Visa, Mastercard, American Express, and other supported networks</li>
  <li><strong>MB WAY</strong> — instant payment via the MB WAY app, available for customers of Portuguese banks</li>
  <li><strong>PIX</strong> — instant transfer for customers with Brazilian bank accounts</li>
  <li><strong>SEPA/IBAN bank transfer</strong> — European transfer with a processing time of 1 to 3 business days</li>
</ul>
<p>Payment is processed at the time of order confirmation. For bank transfer payments, the order will only be dispatched upon confirmation of payment receipt. All financial transactions are processed with 256-bit SSL/TLS encryption and comply with PCI DSS requirements.</p>

<h2>7. Delivery</h2>
<p>Product delivery is divided into two categories: <strong>digital products</strong> and <strong>physical products</strong>.</p>
<h3>7.1 Digital Products</h3>
<p>For digital products (e-books, software, downloadable content, subscriptions), delivery is made immediately or within the timeframe specified in the product description, via download or online access. The right of withdrawal may not apply as provided in Article 16 of Directive 2011/83/EU, where the consumer has given express consent and acknowledged that they waive the right of withdrawal upon commencement of performance.</p>
<h3>7.2 Physical Products</h3>
<p>For physical products, the delivery times indicated are estimates and commence from the date of dispatch. <strong>{store_name}</strong> undertakes to ship products within 2 to 5 business days after payment confirmation, unless otherwise stated. Actual delivery time depends on the carrier and destination. Shipping costs are calculated based on destination, weight, and package dimensions, and are displayed before purchase finalization.</p>
<p>The risk of loss or damage to the products transfers to the consumer upon physical delivery, as provided in Article 20 of Directive 2011/83/EU.</p>

<h2>8. Right of Withdrawal</h2>
<p>The consumer has a period of <strong>14 days</strong> to exercise the right of withdrawal without providing any justification, commencing from the date of receipt of the product or, in the case of multiple products ordered in a single transaction, from the receipt of the last product.</p>
<p>To exercise this right, the consumer must notify <strong>{store_name}</strong> through the withdrawal form available on the website or by email, clearly indicating their decision. Products must be returned in their original condition, without signs of use, in the original packaging and with all accessories, within a maximum of 14 days following the withdrawal notification.</p>
<p>The cost of return shipping is the responsibility of the consumer, unless <strong>{store_name}</strong> failed to provide information about the right of withdrawal. The refund will be processed within 14 days following receipt of the returned products, using the same payment method as the original purchase.</p>

<h2>9. Limitation of Liability</h2>
<p><strong>{store_name}</strong> shall not be liable for indirect, incidental, or consequential damages arising from the use of purchased products, including but not limited to loss of profits, business interruption, or loss of data. The total liability of <strong>{store_name}</strong> for any claim shall not exceed the total amount paid for the product subject to the claim.</p>
<p>We shall not be liable for delays or failures in delivery caused by force majeure, including natural disasters, pandemics, strikes, government decisions, or logistical issues with carriers.</p>

<h2>10. Governing Law and Dispute Resolution</h2>
<p>These terms are governed by Portuguese law, without prejudice to the mandatory provisions of European Union law applicable to consumers. For the resolution of disputes, consumers may use the European Online Dispute Resolution (ODR) platform, available at <strong>https://ec.europa.eu/consumers/odr/</strong>.</p>
<p>For matters not resolved through alternative dispute resolution, the Lisbon Consumer Arbitration Centre shall have jurisdiction, or alternatively, the judicial courts of the Lisbon district, with waiver of any other potentially competent forum.</p>

<h2>11. Amendments to Terms and Conditions</h2>
<p><strong>{store_name}</strong> reserves the right to modify these Terms and Conditions at any time. Amendments shall take effect on the date of their publication on the website. In the event of substantial changes, customers will be notified by email. Continued use of the platform following publication of amendments constitutes tacit acceptance thereof.</p>

<h2>12. Final Provisions</h2>
<p>If any provision of these T&Cs is deemed null or unenforceable, the remaining provisions shall remain in full force and effect. The failure of <strong>{store_name}</strong> to exercise any right under these terms does not constitute a waiver thereof. These terms constitute the entire agreement between the consumer and <strong>{store_name}</strong> regarding purchases made through the online store, superseding any prior agreements.</p>
<p>Should you have any questions or concerns regarding these Terms and Conditions, please contact us through the channels indicated in the "Merchant Identity" section.</p>
`,
  },

  // ── Privacy Policy (EN) ────────────────────────────────────────────────
  privacy: {
    title: 'Privacy Policy and Data Protection',
    content: `
<h2>1. Data Controller</h2>
<p>The data controller responsible for the processing of personal data, in accordance with the General Data Protection Regulation (GDPR — Regulation (EU) 2016/679) and applicable national law, is <strong>{store_name}</strong>, registered in Portugal. For questions concerning the protection of your personal data, please contact us through the addresses provided on the website's contact page.</p>
<p><strong>{store_name}</strong> is committed to processing your personal data with the utmost care and respect for your privacy, in compliance with applicable data protection legislation.</p>

<h2>2. Personal Data Collected</h2>
<p>We collect the following categories of personal data, depending on your interactions with our services:</p>
<h3>2.1 Identification and Contact Data</h3>
<ul>
  <li>Full name and surname</li>
  <li>Billing and delivery address</li>
  <li>Postal code, city, and country</li>
  <li>Phone number (including MB WAY number)</li>
  <li>Email address</li>
  <li>Date of birth (when applicable, for age verification)</li>
</ul>
<h3>2.2 Payment Data</h3>
<ul>
  <li>Credit/debit card details (processed directly by NeXFlowX, without passing through our servers)</li>
  <li>IBAN bank account number (for bank transfer refunds)</li>
  <li>Transaction information (amount, date, payment method)</li>
</ul>
<h3>2.3 Technical and Navigation Data</h3>
<ul>
  <li>IP address</li>
  <li>Browser type and version</li>
  <li>Operating system and device used</li>
  <li>Pages visited, time spent on pages, and browsing patterns</li>
  <li>Cookie data and similar technologies (see Section 8)</li>
  <li>Approximate location data (when authorized)</li>
</ul>

<h2>3. Purposes and Legal Basis for Processing</h2>
<p>Your personal data is processed for the following purposes, based on the respective legal grounds provided under the GDPR:</p>
<h3>3.1 Contract Performance</h3>
<p>Processing necessary for the performance of the sales contract, including order processing, payment management, product delivery, invoice issuance, and order status communications. <strong>Legal basis: Article 6(1)(b) of the GDPR.</strong></p>
<h3>3.2 Legal Obligations</h3>
<p>Processing necessary for compliance with legal obligations, including tax, accounting, anti-money laundering, and counter-terrorism financing requirements. <strong>Legal basis: Article 6(1)(c) of the GDPR.</strong></p>
<h3>3.3 Legitimate Interests</h3>
<p>Statistical analysis and service improvement, fraud prevention, platform security, and complaints management. <strong>Legal basis: Article 6(1)(f) of the GDPR.</strong></p>
<h3>3.4 Consent</h3>
<p>Sending marketing communications, newsletters, and personalized offers. Consent may be withdrawn at any time. <strong>Legal basis: Article 6(1)(a) of the GDPR.</strong></p>

<h2>4. Data Retention Period</h2>
<p>Your personal data is retained for the period necessary for the purposes for which it was collected:</p>
<ul>
  <li><strong>Transaction and billing data:</strong> 10 years, in accordance with legal obligations (Tax Code and Accounting Standards)</li>
  <li><strong>Customer account data:</strong> for the duration of the account and 3 years after the last interaction</li>
  <li><strong>Marketing communications data:</strong> until consent is withdrawn</li>
  <li><strong>Navigation data and cookies:</strong> 13 months for analytical cookies; until consent is withdrawn for others</li>
  <li><strong>Legal proceedings data:</strong> for the duration of the proceedings and 5 years after their conclusion</li>
</ul>
<p>Upon expiry of the applicable retention period, data will be securely deleted or anonymized, unless retention is justified for legitimate reasons or required by law.</p>

<h2>5. Data Subject Rights</h2>
<p>In accordance with the GDPR, the data subject has the following rights, which may be exercised at any time:</p>
<ul>
  <li><strong>Right of access (Article 15):</strong> to request information about the processing of your data and obtain a copy thereof</li>
  <li><strong>Right to rectification (Article 16):</strong> to request the correction of inaccurate or incomplete data</li>
  <li><strong>Right to erasure (Article 17):</strong> to request the deletion of your personal data, under the conditions provided in the GDPR ("right to be forgotten")</li>
  <li><strong>Right to restriction of processing (Article 18):</strong> to request the restriction of processing of your data in certain circumstances</li>
  <li><strong>Right to data portability (Article 20):</strong> to receive your data in a structured, commonly used, and machine-readable format, or to request its transfer to another controller</li>
  <li><strong>Right to object (Article 21):</strong> to object to the processing of your data for reasons related to your particular situation, including processing for direct marketing purposes</li>
  <li><strong>Right not to be subject to automated decision-making (Article 22):</strong> not to be subject to decisions based solely on automated processing that produce legal effects or similarly significantly affect you</li>
</ul>
<p>To exercise any of these rights, please contact us through the data protection email address available on the website. We will respond to your request within 30 days, which may be extended by a further 60 days in complex cases, with notification to the data subject.</p>
<p>If you believe that the processing of your data infringes the GDPR, you have the right to lodge a complaint with the Portuguese Data Protection Authority (CNPD) — <strong>https://www.cnpd.pt</strong>.</p>

<h2>6. Cookies and Similar Technologies</h2>
<p>The <strong>{store_name}</strong> website uses cookies and similar technologies to improve the user experience, analyze traffic, and personalize content. Cookies are categorized as follows:</p>
<ul>
  <li><strong>Essential cookies:</strong> necessary for the functioning of the website and the checkout process (no consent required)</li>
  <li><strong>Performance cookies:</strong> collect information about website usage for statistical purposes (consent required)</li>
  <li><strong>Functionality cookies:</strong> enable advanced features such as language preferences and personalization (consent required)</li>
  <li><strong>Marketing cookies:</strong> used to display relevant advertising and measure campaign effectiveness (consent required)</li>
</ul>
<p>Consent for the use of non-essential cookies is requested upon your first visit to the website, through a consent banner. You may manage or withdraw your consent at any time through your browser settings.</p>

<h2>7. Data Processors</h2>
<p>For the processing of your personal data, <strong>{store_name}</strong> engages the following processors, who act on our instructions and in accordance with data processing agreements approved pursuant to Article 28 of the GDPR:</p>
<ul>
  <li><strong>NeXFlowX</strong> — Payment processing (cards, MB WAY, PIX, SEPA/IBAN), transaction validation, and fraud prevention</li>
  <li><strong>Shipping carriers</strong> — Processing of delivery data necessary for order dispatch</li>
  <li><strong>Cloud computing services</strong> — Secure data hosting and technology infrastructure</li>
  <li><strong>Analytics tools</strong> — Usage pattern analysis and user experience improvement</li>
</ul>

<h2>8. International Data Transfers</h2>
<p>Your personal data may be transferred to countries outside the European Economic Area (EEA) in the context of payment processing and infrastructure services. Such transfers are carried out under adequacy decisions of the European Commission, standard contractual clauses approved by the Commission, or with your express consent.</p>
<p>We ensure that transferred data benefits from a level of protection equivalent to that guaranteed by the GDPR, through appropriate technical and organizational measures.</p>

<h2>9. Data Protection Officer (DPO)</h2>
<p><strong>{store_name}</strong> has appointed a Data Protection Officer (DPO), who can be contacted through the email address provided on the privacy policy page of the website for any questions related to the processing of your personal data.</p>

<h2>10. Security Measures</h2>
<p>We implement robust technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction, including: 256-bit SSL/TLS encryption for all communications; multi-factor authentication for administrative panel access; role-based access controls; continuous infrastructure monitoring; regular encrypted backups; and periodic security audits.</p>
<p>In the event of a personal data breach likely to result in a risk to data subjects, <strong>{store_name}</strong> will notify the supervisory authority and affected data subjects within 72 hours, as required by Articles 33 and 34 of the GDPR.</p>

<h2>11. Changes to the Privacy Policy</h2>
<p>We reserve the right to update this Privacy Policy at any time. Significant changes will be communicated through the website and/or by email. The most current version is always available on our website, with an indication of the date of the last update.</p>
`,
  },

  // ── Refund Policy (EN) ─────────────────────────────────────────────────
  refund: {
    title: 'Refund and Returns Policy',
    content: `
<h2>1. Right of Withdrawal (14 Days)</h2>
<p>In accordance with Directive 2011/83/EU of the European Parliament and of the Council, the consumer has the right to withdraw from the purchase within <strong>14 calendar days</strong> from the date of receipt of the product or, in the case of an order with multiple items, from the date of receipt of the last item.</p>
<p>This right may be exercised without the need to provide any justification. The consumer must inform <strong>{store_name}</strong> of their decision to withdraw through an unequivocal statement (email, return form available on the website, or telephone contact), indicating the order number and the products subject to the return.</p>
<p>Products must be returned in their original condition, without signs of use, damage, or alteration, in the original packaging, and accompanied by all accessories, manuals, and documentation. The return must be made within a maximum of 14 days following the withdrawal notification. Return shipping costs are the responsibility of the consumer, unless otherwise specified.</p>

<h2>2. Exceptions to the Right of Withdrawal</h2>
<p>The right of withdrawal <strong>does not apply</strong> in the following cases, as provided in Article 16 of Directive 2011/83/EU:</p>
<ul>
  <li><strong>Digital goods</strong> — Where the consumer has given express consent to begin performance of the contract and has acknowledged that, by doing so, they waive the right of withdrawal. This includes software downloads, e-books, music, videos, activation codes, and unlocked digital content.</li>
  <li><strong>Sealed goods</strong> — Sealed for health or hygiene protection reasons that have been unsealed after delivery</li>
  <li><strong>Custom-made goods</strong> — Goods made to the consumer's specifications or clearly personalized</li>
  <li><strong>Perishable goods</strong> — Goods that for obvious reasons cannot be returned, subject to rapid deterioration or expiry dates</li>
  <li><strong>Goods inseparably mixed</strong> — Goods that, after delivery, have been inseparably mixed with other items</li>
  <li><strong>Sealed audiovisual or software</strong> — Sealed audiovisual recordings or computer software that have been unsealed after delivery</li>
  <li><strong>Newspapers, periodicals, or magazines</strong> — With the exception of subscriptions</li>
</ul>

<h2>3. Refund Process</h2>
<p>The refund will be processed within <strong>5 to 14 business days</strong> following receipt and verification of the condition of the returned products. The refund amount includes the price paid for the product and the original shipping costs (where applicable), less return shipping costs where these are the consumer's responsibility.</p>
<p>The refund will be processed using the <strong>same payment method</strong> as the original purchase:</p>
<ul>
  <li><strong>Credit/debit card:</strong> Refund credited to the card account within 5 to 10 business days, depending on the card issuer</li>
  <li><strong>MB WAY:</strong> Refund credited to MB WAY balance within 1 to 3 business days</li>
  <li><strong>PIX:</strong> Refund transferred within 1 to 2 business days</li>
  <li><strong>SEPA/IBAN bank transfer:</strong> Refund credited within 3 to 5 business days</li>
</ul>
<p>The consumer will be notified by email of the receipt of returned products, the approval or rejection of the refund, and the date on which the refund was processed.</p>

<h2>4. Return Conditions</h2>
<p>For a return to be accepted, products must meet the following requirements:</p>
<ul>
  <li>Be in original condition, without signs of use, washing, alteration, or personalization</li>
  <li>Have all tags and seals intact</li>
  <li>Preserve the original packaging in good condition</li>
  <li>Include all accessories, manuals, cables, and components originally provided</li>
  <li>Be accompanied by proof of purchase (invoice or receipt) or the order number</li>
</ul>
<p>We reserve the right to refuse returns that do not meet these requirements or to issue a partial refund, as indicated in Section 6.</p>

<h2>5. Damaged or Defective Products</h2>
<p>If you receive a damaged, defective product, or one that does not match its description, please contact <strong>{store_name}</strong> within <strong>48 hours</strong> of receipt, accompanied by clear photographs of the damage or defect. In such cases:</p>
<ul>
  <li>The consumer does <strong>not</strong> bear the return shipping costs</li>
  <li>A full refund (including shipping costs) will be processed within 5 to 14 business days</li>
  <li>Alternatively, the consumer may choose product replacement or repair, according to their preference</li>
</ul>
<p>Legal warranty periods are as provided under Portuguese and EU consumer law: 2 years for consumer goods, commencing from the date of delivery, without prejudice to longer periods provided under commercial warranties.</p>

<h2>6. Partial Refunds</h2>
<p><strong>{store_name}</strong> reserves the right to issue a partial refund in the following cases:</p>
<ul>
  <li>Products show evident signs of use that diminish their value</li>
  <li>The original packaging has been significantly damaged</li>
  <li>Accessories, manuals, or originally provided components are missing</li>
  <li>The return is partial (only some items from a multiple-item order) and proportional shipping costs are deducted</li>
  <li>Returned items were purchased at a promotional discount and the return alters the conditions of the promotion</li>
</ul>
<p>In these cases, the consumer will be informed of the reason for the deduction and the partial refund amount before the refund is processed.</p>

<h2>7. Contact Information</h2>
<p>To request a refund, initiate a return, or file a complaint regarding a product, please contact <strong>{store_name}</strong> through the following channels:</p>
<ul>
  <li><strong>Email:</strong> available on the website contact page</li>
  <li><strong>Return form:</strong> accessible in your customer account, under "My Orders"</li>
  <li><strong>Telephone:</strong> available on the contact page (Monday to Friday, 09:00–18:00)</li>
</ul>
<p>We recommend using the online return form for faster and more efficient processing. All refund requests are handled in order of receipt, and the consumer will receive confirmation within 24 business hours.</p>
`,
  },
};

// ---------------------------------------------------------------------------
// TEMPLATES — Spanish (es)
// ---------------------------------------------------------------------------

const es: Record<LegalDocType, { title: string; content: string }> = {
  // ── Terms & Conditions (ES) ────────────────────────────────────────────
  terms: {
    title: 'Términos y Condiciones Generales',
    content: `
<h2>1. Ámbito y Disposiciones Generales</h2>
<p>Los presentes Términos y Condiciones Generales ("TCG") regulan la utilización de la tienda online de <strong>{store_name}</strong>, accesible a través de su sitio web y plataforma de ventas. Al realizar cualquier compra en nuestra tienda, el usuario declara haber leído, comprendido y aceptado íntegramente estos términos, así como nuestra Política de Privacidad y Política de Reembolso, que forman parte integrante de este contrato.</p>
<p>Estos términos se aplican a todos los consumidores en el sentido de la Directiva 2011/83/UE del Parlamento Europeo y del Consejo, de 25 de octubre de 2011, sobre los derechos de los consumidores, así como a todas las transacciones comerciales realizadas a través de nuestra plataforma.</p>
<p><strong>{store_name}</strong> se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos a partir de su publicación en el sitio web. Recomendamos la consulta periódica de esta página.</p>

<h2>2. Identidad del Comerciante</h2>
<p>El responsable de la tienda online es <strong>{store_name}</strong>, con domicilio en Portugal, registrado conforme a la legislación portuguesa y europea aplicable. Para fines de contacto:</p>
<ul>
  <li><strong>Denominación:</strong> {store_name}</li>
  <li><strong>Email de contacto:</strong> disponible en la página de contacto del sitio web</li>
  <li><strong>Horario de atención:</strong> lunes a viernes, de 09:00 a 18:00 (hora de Lisboa)</li>
</ul>
<p>El Número de Identificación Fiscal (NIF) y demás datos de registro se encuentran disponibles en la sección "Sobre Nosotros" del sitio web o previa solicitud.</p>

<h2>3. Descripción de Productos y Servicios</h2>
<p>Los productos y servicios disponibles en la tienda online se describen con la mayor precisión posible, incluyendo imágenes, especificaciones técnicas, dimensiones, composición de materiales e información de uso. <strong>{store_name}</strong> realiza todos los esfuerzos para garantizar que las descripciones, fotografías e información presentadas reflejen fielmente la naturaleza de los productos.</p>
<p>Sin embargo, no podemos garantizar una reproducción absoluta de los colores, ya que estos pueden variar según el equipo utilizado por el usuario. Las posibles discrepancias de color no constituyen motivo de reclamación. Nos reservamos el derecho de corregir errores, imprecisiones u omisiones en las descripciones de los productos en cualquier momento y sin previo aviso.</p>

<h2>4. Precios e Impuestos</h2>
<p>Todos los precios indicados en la tienda online incluyen el IVA al tipo legal vigente en Portugal. Para entregas dentro de la Unión Europea, el IVA se aplicará de acuerdo con las reglas de localización del servicio o bien, conforme a lo previsto en la normativa del IVA en las operaciones intracomunitarias. Para entregas fuera de la UE, podrán ser aplicables derechos aduaneros, tasas de importación e impuestos locales, cuya responsabilidad de pago recae íntegramente sobre el comprador.</p>
<p>Los precios pueden modificarse en cualquier momento sin previo aviso. La validez de los precios solo está garantizada en el momento de la confirmación del pedido. Las promociones y descuentos están sujetos a condiciones específicas, que se indicarán claramente en la oferta correspondiente.</p>

<h2>5. Proceso de Pedido</h2>
<p>El proceso de pedido comprende las siguientes etapas: (i) selección de los productos deseados y adición al carrito de compras; (ii) verificación de los datos del pedido; (iii) introducción de los datos de facturación y entrega; (iv) selección del método de pago; (v) revisión y aceptación de los presentes TCG; y (vi) confirmación del pedido.</p>
<p>La confirmación del pedido por parte de <strong>{store_name}</strong> constituye la aceptación de la propuesta de compra. Todos los pedidos están sujetos a disponibilidad de stock. En caso de indisponibilidad, el cliente será informado en el plazo máximo de 48 horas y se le ofrecerá una alternativa o el reembolso íntegro.</p>

<h2>6. Métodos de Pago</h2>
<p><strong>{store_name}</strong> acepta los siguientes métodos de pago, procesados de forma segura a través de la infraestructura NeXFlowX:</p>
<ul>
  <li><strong>Tarjetas de débito y crédito</strong> — Visa, Mastercard, American Express y otras redes admitidas</li>
  <li><strong>MB WAY</strong> — pago instantáneo a través de la aplicación MB WAY, disponible para clientes de bancos portugueses</li>
  <li><strong>PIX</strong> — transferencia instantánea para clientes con cuenta bancaria brasileña</li>
  <li><strong>Transferencia bancaria SEPA/IBAN</strong> — transferencia europea, con plazo de procesamiento de 1 a 3 días hábiles</li>
</ul>
<p>El pago se procesa en el momento de la confirmación del pedido. Para pagos por transferencia bancaria, el pedido solo será expedido tras la confirmación del recepción del pago. Todas las transacciones financieras se procesan con cifrado SSL/TLS de 256 bits y cumplen con los requisitos del PCI DSS.</p>

<h2>7. Entrega de Productos</h2>
<p>La entrega de productos se divide en dos categorías: <strong>productos digitales</strong> y <strong>productos físicos</strong>.</p>
<h3>7.1 Productos Digitales</h3>
<p>Para productos digitales (e-books, software, contenidos descargables, suscripciones), la entrega se realiza de forma inmediata o en el plazo indicado en la descripción del producto, a través de descarga o acceso en línea. El derecho de desistimiento puede no ser aplicable conforme a lo dispuesto en el artículo 16 de la Directiva 2011/83/UE, cuando el consumidor haya dado su consentimiento expreso y reconocido que pierde el derecho de desistimiento al comenzar la prestación.</p>
<h3>7.2 Productos Físicos</h3>
<p>Para productos físicos, los plazos de entrega indicados son estimaciones y se cuentan desde la fecha de envío del pedido. <strong>{store_name}</strong> se compromete a enviar los productos en el plazo de 2 a 5 días hábiles tras la confirmación del pago, salvo indicación contraria. El plazo de entrega efectivo depende del transportista y el destino. Los costes de envío se calculan en función del destino, peso y dimensiones del paquete, y se indican antes de la finalización de la compra.</p>
<p>El riesgo de pérdida o deterioro de los productos se transfiere al consumidor en el momento de la entrega física, conforme a lo previsto en el artículo 20 de la Directiva 2011/83/UE.</p>

<h2>8. Derecho de Desistimiento</h2>
<p>El consumidor dispone de un plazo de <strong>14 días</strong> para ejercer el derecho de desistimiento sin necesidad de justificación, contado a partir de la fecha de recepción del producto o, en caso de múltiples productos pedidos en una sola transacción, de la recepción del último producto.</p>
<p>Para ejercer este derecho, el consumidor debe notificar a <strong>{store_name}</strong> a través de la declaración de desistimiento disponible en el sitio web o por correo electrónico, indicando claramente su decisión. Los productos deben ser devueltos en su estado original, sin signos de uso, en el embalaje original y con todos los accesorios, en el plazo máximo de 14 días tras la notificación de desistimiento.</p>
<p>Los costes de devolución son responsabilidad del consumidor, salvo que <strong>{store_name}</strong> hubiera omitido información sobre el derecho de desistimiento. El reembolso se efectuará en el plazo de 14 días tras la recepción de los productos devueltos, utilizando el mismo método de pago utilizado en la compra.</p>

<h2>9. Limitación de Responsabilidad</h2>
<p><strong>{store_name}</strong> no se responsabiliza de los daños indirectos, incidentales o consecuentes derivados de la utilización de los productos adquiridos, incluyendo, pero no limitado a, pérdida de beneficios, interrupción de actividad o pérdida de datos. La responsabilidad total de <strong>{store_name}</strong> por cualquier reclamación no excederá el valor total pagado por el producto objeto de la reclamación.</p>
<p>No nos responsabilizamos de retrasos o fallos en la entrega causados por fuerza mayor, incluyendo desastres naturales, pandemias, huelgas, decisiones gubernamentales o problemas logísticos de los transportistas.</p>

<h2>10. Ley Aplicable y Resolución de Litigios</h2>
<p>Los presentes términos se rigen por la ley portuguesa, sin perjuicio de las disposiciones imperativas del derecho de la Unión Europea aplicables al consumidor. Para la resolución de litigios, el consumidor puede recurrir a la Plataforma Europea de Resolución de Litigios en Línea (ODR), disponible en <strong>https://ec.europa.eu/consumers/odr/</strong>.</p>
<p>Para cuestiones no resueltas por la vía extrajudicial, será competente el Centro de Arbitraje de Conflictos de Consumo de Lisboa o, alternativamente, los tribunales judiciales del distrito de Lisboa, con renuncia a cualquier otro fuero que pudiera ser competente.</p>

<h2>11. Modificaciones de los Términos y Condiciones</h2>
<p><strong>{store_name}</strong> se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor en la fecha de su publicación en el sitio web. En caso de cambios sustanciales, los clientes serán notificados por correo electrónico. La continuación de la utilización de la plataforma tras la publicación de las modificaciones implica su aceptación tácita.</p>

<h2>12. Disposiciones Finales</h2>
<p>Si alguna disposición de los presentes TCG fuera considerada nula o inaplicable, las restantes disposiciones mantendrán su pleno vigor. La falta de ejercicio por parte de <strong>{store_name}</strong> de cualquier derecho previsto en estos términos no constituye renuncia al mismo. Estos términos constituyen el acuerdo íntegro entre el consumidor y <strong>{store_name}</strong> en relación con las compras realizadas en la tienda online, sustituyendo cualquier acuerdo anterior.</p>
<p>En caso de dudas o cuestiones relativas a estos Términos y Condiciones, contáctenos a través de los canales indicados en la sección "Identidad del Comerciante".</p>
`,
  },

  // ── Privacy Policy (ES) ────────────────────────────────────────────────
  privacy: {
    title: 'Política de Privacidad y Protección de Datos',
    content: `
<h2>1. Responsable del Tratamiento</h2>
<p>El responsable del tratamiento de los datos personales, conforme al Reglamento General de Protección de Datos (RGPD — Reglamento (UE) 2016/679) y la legislación nacional aplicable, es <strong>{store_name}</strong>, con domicilio en Portugal. Para cuestiones relacionadas con la protección de sus datos personales, puede contactarnos a través de las direcciones indicadas en la página de contacto del sitio web.</p>
<p><strong>{store_name}</strong> se compromete a tratar sus datos personales con el máximo cuidado y respeto por su privacidad, en cumplimiento con la legislación aplicable en materia de protección de datos.</p>

<h2>2. Datos Personales Recopilados</h2>
<p>Recopilamos las siguientes categorías de datos personales, según las interacciones del titular con nuestros servicios:</p>
<h3>2.1 Datos de Identificación y Contacto</h3>
<ul>
  <li>Nombre completo y apellidos</li>
  <li>Dirección de facturación y entrega</li>
  <li>Código postal, ciudad y país</li>
  <li>Número de teléfono (incluyendo número para MB WAY)</li>
  <li>Dirección de correo electrónico</li>
  <li>Fecha de nacimiento (cuando sea aplicable, para verificación de edad)</li>
</ul>
<h3>2.2 Datos de Pago</h3>
<ul>
  <li>Datos de tarjetas de crédito/débito (procesados directamente por NeXFlowX, sin pasar por nuestros servidores)</li>
  <li>Número de cuenta bancaria IBAN (para reembolsos por transferencia)</li>
  <li>Información de transacción (importe, fecha, método de pago)</li>
</ul>
<h3>2.3 Datos Técnicos y de Navegación</h3>
<ul>
  <li>Dirección IP</li>
  <li>Tipo y versión del navegador</li>
  <li>Sistema operativo y dispositivo utilizado</li>
  <li>Páginas visitadas, tiempo de permanencia y patrones de navegación</li>
  <li>Datos de cookies y tecnologías similares (ver sección 8)</li>
  <li>Datos de ubicación aproximada (cuando esté autorizado)</li>
</ul>

<h2>3. Finalidades y Base Legal del Tratamiento</h2>
<p>Sus datos personales se tratan para las siguientes finalidades, con base en las respectivas bases legales previstas en el RGPD:</p>
<h3>3.1 Ejecución del Contrato</h3>
<p>Tratamiento necesario para la ejecución del contrato de compraventa, incluyendo el procesamiento de pedidos, gestión de pagos, entrega de productos, emisión de facturas y comunicación del estado de los pedidos. <strong>Base legal: Art. 6, apartado 1, letra b) del RGPD.</strong></p>
<h3>3.2 Obligaciones Legales</h3>
<p>Tratamiento necesario para el cumplimiento de obligaciones legales, incluyendo requisitos fiscales, contables y de prevención del blanqueo de capitales y financiación del terrorismo. <strong>Base legal: Art. 6, apartado 1, letra c) del RGPD.</strong></p>
<h3>3.3 Intereses Legítimos</h3>
<p>Análisis estadístico y mejora de nuestros servicios, prevención de fraudes, seguridad de la plataforma y gestión de reclamaciones. <strong>Base legal: Art. 6, apartado 1, letra f) del RGPD.</strong></p>
<h3>3.4 Consentimiento</h3>
<p>Envío de comunicaciones de marketing, newsletters y ofertas personalizadas. El consentimiento puede retirarse en cualquier momento. <strong>Base legal: Art. 6, apartado 1, letra a) del RGPD.</strong></p>

<h2>4. Período de Conservación de los Datos</h2>
<p>Sus datos personales se conservan durante el período necesario para las finalidades para las que fueron recopilados:</p>
<ul>
  <li><strong>Datos de transacción y facturación:</strong> 10 años, conforme a la obligación legal (Código Fiscal y Normas Contables)</li>
  <li><strong>Datos de cuenta de cliente:</strong> durante la vigencia de la cuenta y 3 años después de la última interacción</li>
  <li><strong>Datos de comunicaciones de marketing:</strong> hasta la revocación del consentimiento</li>
  <li><strong>Datos de navegación y cookies:</strong> 13 meses para cookies analíticas; hasta la revocación del consentimiento para las restantes</li>
  <li><strong>Datos de procesos judiciales:</strong> durante la tramitación del proceso y 5 años después de su conclusión</li>
</ul>
<p>Una vez finalizado el período de conservación aplicable, los datos serán eliminados o anonimizados de forma segura, salvo cuando su conservación esté justificada por motivos legítimos o exigencia legal.</p>

<h2>5. Derechos de los Titulares de los Datos</h2>
<p>En virtud del RGPD, el titular de los datos personales tiene los siguientes derechos, que puede ejercer en cualquier momento:</p>
<ul>
  <li><strong>Derecho de acceso (Art. 15):</strong> solicitar información sobre el tratamiento de sus datos y obtener una copia de los mismos</li>
  <li><strong>Derecho de rectificación (Art. 16):</strong> solicitar la corrección de datos inexactos o incompletos</li>
  <li><strong>Derecho de supresión (Art. 17):</strong> solicitar la eliminación de sus datos personales, en las condiciones previstas en el RGPD ("derecho al olvido")</li>
  <li><strong>Derecho a la limitación del tratamiento (Art. 18):</strong> solicitar la restricción del tratamiento de sus datos en determinadas circunstancias</li>
  <li><strong>Derecho a la portabilidad (Art. 20):</strong> recibir sus datos en un formato estructurado, de uso habitual y lectura automática, o solicitar su transmisión a otro responsable</li>
  <li><strong>Derecho de oposición (Art. 21):</strong> oponerse al tratamiento de sus datos por motivos relacionados con su situación particular, incluyendo el tratamiento con fines de marketing directo</li>
  <li><strong>Derecho a no ser objeto de decisiones automatizadas (Art. 22):</strong> no ser sometido a decisiones basadas únicamente en el tratamiento automatizado que produzcan efectos jurídicos o le afecten de manera significativa</li>
</ul>
<p>Para ejercer cualquiera de estos derechos, contáctenos a través del correo electrónico de protección de datos disponible en el sitio web. Responderemos a su solicitud en el plazo de 30 días, que puede prorrogarse en 60 días adicionales en casos complejos, informando al titular de dicha prórroga.</p>
<p>Si considera que el tratamiento de sus datos vulnera el RGPD, tiene derecho a presentar una reclamación ante la autoridad de control competente.</p>

<h2>6. Cookies y Tecnologías Similares</h2>
<p>El sitio web de <strong>{store_name}</strong> utiliza cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el tráfico y personalizar contenidos. Las cookies se dividen en las siguientes categorías:</p>
<ul>
  <li><strong>Cookies esenciales:</strong> necesarias para el funcionamiento del sitio web y del proceso de pago (no requieren consentimiento)</li>
  <li><strong>Cookies de rendimiento:</strong> recopilan información sobre la utilización del sitio web con fines estadísticos (requieren consentimiento)</li>
  <li><strong>Cookies de funcionalidad:</strong> permiten funcionalidades avanzadas como preferencias de idioma y personalización (requieren consentimiento)</li>
  <li><strong>Cookies de marketing:</strong> se utilizan para mostrar publicidad relevante y medir la eficacia de las campañas (requieren consentimiento)</li>
</ul>
<p>El consentimiento para la utilización de cookies no esenciales se solicita en el momento de la primera visita al sitio web, mediante un banner de consentimiento. Puede gestionar o retirar su consentimiento en cualquier momento a través de la configuración de su navegador.</p>

<h2>7. Encargados del Tratamiento</h2>
<p>Para el procesamiento de sus datos personales, <strong>{store_name}</strong> recurre a los siguientes encargados del tratamiento, que actúan bajo nuestras instrucciones y en conformidad con contratos de tratamiento de datos aprobados conforme al Art. 28 del RGPD:</p>
<ul>
  <li><strong>NeXFlowX</strong> — Procesamiento de pagos (tarjetas, MB WAY, PIX, SEPA/IBAN), validación de transacciones y prevención de fraudes</li>
  <li><strong>Transportistas</strong> — Procesamiento de datos de entrega necesarios para el envío de pedidos</li>
  <li><strong>Servicios de cloud computing</strong> — Alojamiento seguro de datos e infraestructura tecnológica</li>
  <li><strong>Herramientas analíticas</strong> — Análisis de patrones de uso y mejora de la experiencia del usuario</li>
</ul>

<h2>8. Transferencias Internacionales de Datos</h2>
<p>Sus datos personales pueden ser transferidos a países fuera del Espacio Económico Europeo (EEE) en el marco del procesamiento de pagos y servicios de infraestructura. Estas transferencias se realizan amparadas en decisiones de adecuación de la Comisión Europea, cláusulas contractuales tipo aprobadas por la Comisión, o con su consentimiento expreso.</p>
<p>Garantizamos que los datos transferidos se benefician de un nivel de protección equivalente al asegurado por el RGPD, a través de medidas técnicas y organizativas adecuadas.</p>

<h2>9. Delegado de Protección de Datos (DPO)</h2>
<p><strong>{store_name}</strong> ha designado un Delegado de Protección de Datos (DPO), que puede ser contactado a través del correo electrónico indicado en la página de política de privacidad del sitio web para cualquier cuestión relacionada con el tratamiento de sus datos personales.</p>

<h2>10. Medidas de Seguridad</h2>
<p>Implementamos medidas técnicas y organizativas robustas para proteger sus datos personales contra accesos no autorizados, alteraciones, divulgaciones o destrucciones, incluyendo: cifrado SSL/TLS de 256 bits para todas las comunicaciones; autenticación multifactor para el acceso a paneles administrativos; controles de acceso basados en roles; monitorización continua de la infraestructura; copias de seguridad regulares y cifradas; auditorías de seguridad periódicas.</p>
<p>En caso de violación de datos personales que pueda generar un riesgo para los titulares, <strong>{store_name}</strong> notificará a la autoridad de control y a los titulares afectados en el plazo de 72 horas, conforme a lo requerido por los Arts. 33 y 34 del RGPD.</p>

<h2>11. Modificaciones de la Política de Privacidad</h2>
<p>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios significativos se comunicarán a través del sitio web y/o por correo electrónico. La versión más reciente se encuentra siempre disponible en nuestro sitio web, con indicación de la fecha de la última actualización.</p>
`,
  },

  // ── Refund Policy (ES) ─────────────────────────────────────────────────
  refund: {
    title: 'Política de Reembolso y Devoluciones',
    content: `
<h2>1. Derecho de Desistimiento (14 Días)</h2>
<p>De conformidad con la Directiva 2011/83/UE del Parlamento Europeo y del Consejo, el consumidor tiene derecho a desistir de la compra en el plazo de <strong>14 días naturales</strong> a contar desde la fecha de recepción del producto o, en el caso de un pedido con múltiples artículos, desde la fecha de recepción del último artículo.</p>
<p>Este derecho puede ejercerse sin necesidad de presentar justificación alguna. El consumidor debe informar a <strong>{store_name}</strong> de su decisión de desistimiento mediante una declaración inequívoca (correo electrónico, formulario de devolución disponible en el sitio web o contacto telefónico), indicando el número de pedido y los productos objeto de la devolución.</p>
<p>Los productos deben ser devueltos en su estado original, sin signos de uso, daños o alteraciones, en el embalaje original y acompañados de todos los accesorios, manuales y documentación. La devolución debe realizarse en el plazo máximo de 14 días tras la comunicación del desistimiento. Los costes de envío de la devolución son responsabilidad del consumidor, salvo disposición en contrario.</p>

<h2>2. Excepciones al Derecho de Desistimiento</h2>
<p>El derecho de desistimiento <strong>no es aplicable</strong> en los siguientes casos, conforme a lo previsto en el artículo 16 de la Directiva 2011/83/UE:</p>
<ul>
  <li><strong>Bienes digitales</strong> — Cuando el consumidor haya dado su consentimiento expreso para iniciar la ejecución del contrato y haya reconocido que, al hacerlo, pierde el derecho de desistimiento. Esto incluye descargas de software, e-books, música, vídeos, códigos de activación y contenidos digitales desbloqueados.</li>
  <li><strong>Bienes sellados por razones de protección de la salud o la higiene</strong> — que hayan sido abiertos tras la entrega</li>
  <li><strong>Bienes confeccionados según las especificaciones del consumidor</strong> — o claramente personalizados</li>
  <li><strong>Bienes que, por razones obvias, no puedan ser devueltos</strong> — sujetos a deterioro rápido o fecha de caducidad</li>
  <li><strong>Bienes que, tras la entrega, hayan sido mezclados inseparablemente con otros artículos</strong></li>
  <li><strong>Bienes audiovisuales o de software informático sellados</strong> — que hayan sido abiertos tras la entrega</li>
  <li><strong>Periódicos, publicaciones periódicas o revistas</strong> — con excepción de las suscripciones</li>
</ul>

<h2>3. Proceso de Reembolso</h2>
<p>El reembolso se tramitará en el plazo de <strong>5 a 14 días hábiles</strong> tras la recepción y verificación del estado de los productos devueltos. El importe del reembolso incluye el valor abonado por el producto y los costes de envío originales (cuando sea aplicable), deducidos los costes de devolución cuando estos sean responsabilidad del consumidor.</p>
<p>El reembolso se efectuará utilizando el <strong>mismo método de pago</strong> utilizado en la compra original:</p>
<ul>
  <li><strong>Tarjeta de crédito/débito:</strong> El reembolso se acreditará en la cuenta de la tarjeta en 5 a 10 días hábiles, dependiendo del emisor de la tarjeta</li>
  <li><strong>MB WAY:</strong> Reembolso acreditado en el saldo MB WAY en 1 a 3 días hábiles</li>
  <li><strong>PIX:</strong> Reembolso transferido en 1 a 2 días hábiles</li>
  <li><strong>Transferencia bancaria SEPA/IBAN:</strong> Reembolso acreditado en 3 a 5 días hábiles</li>
</ul>
<p>El consumidor será informado por correo electrónico de la recepción de los productos devueltos, de la aprobación o denegación del reembolso, y de la fecha en que el reembolso fue tramitado.</p>

<h2>4. Condiciones de Devolución</h2>
<p>Para que la devolución sea aceptada, los productos deben cumplir los siguientes requisitos:</p>
<ul>
  <li>Encontrarse en el estado original, sin signos de uso, lavado, alteración o personalización</li>
  <li>Conservar todas las etiquetas y sellos intactos</li>
  <li>Conservar el embalaje original en buen estado</li>
  <li>Incluir todos los accesorios, manuales, cables y componentes proporcionados</li>
  <li>Acompañar el comprobante de compra (factura o recibo) o el número de pedido</li>
</ul>
<p>Nos reservamos el derecho de rechazar devoluciones que no cumplan estos requisitos o de efectuar un reembolso parcial, conforme se indica en la sección 6.</p>

<h2>5. Productos Dañados o Defectuosos</h2>
<p>Si recibe un producto dañado, defectuoso o que no corresponda a la descripción, contacte con <strong>{store_name}</strong> en el plazo máximo de <strong>48 horas</strong> tras la recepción, acompañando su comunicación con fotografías claras del daño o defecto. En estos casos:</p>
<ul>
  <li>El consumidor <strong>no</strong> asume los costes de devolución</li>
  <li>El reembolso íntegro (incluyendo costes de envío) se tramitará en 5 a 14 días hábiles</li>
  <li>Alternativamente, el consumidor puede optar por la sustitución del producto o la reparación, según su preferencia</li>
</ul>
<p>Los plazos de garantía legal son los previstos en la legislación aplicable: 2 años para bienes de consumo, contados a partir de la fecha de entrega, sin perjuicio de plazos superiores previstos en garantías comerciales.</p>

<h2>6. Reembolsos Parciales</h2>
<p><strong>{store_name}</strong> se reserva el derecho de efectuar un reembolso parcial en los siguientes casos:</p>
<ul>
  <li>Los productos presentan signos evidentes de uso que disminuyan su valor</li>
  <li>El embalaje original ha sido significativamente dañado</li>
  <li>Faltan accesorios, manuales o componentes proporcionados originalmente</li>
  <li>La devolución es parcial (solo algunos artículos de un pedido múltiple) y se deducen los costes de envío proporcionales</li>
  <li>Los artículos devueltos fueron adquiridos con descuento promocional y la devolución altera las condiciones de la promoción</li>
</ul>
<p>En estos casos, el consumidor será informado del motivo de la deducción y del importe del reembolso parcial antes de que este sea tramitado.</p>

<h2>7. Informaciones de Contacto</h2>
<p>Para solicitar un reembolso, iniciar una devolución o presentar una reclamación relativa a un producto, contacte con <strong>{store_name}</strong> a través de los siguientes canales:</p>
<ul>
  <li><strong>Correo electrónico:</strong> disponible en la página de contacto del sitio web</li>
  <li><strong>Formulario de devolución:</strong> accesible en su cuenta de cliente, en la sección "Mis Pedidos"</li>
  <li><strong>Teléfono:</strong> disponible en la página de contacto (lunes a viernes, 09:00–18:00)</li>
</ul>
<p>Recomendamos la utilización del formulario de devolución en línea para un procesamiento más rápido y eficiente. Todas las solicitudes de reembolso se tramitan por orden de recepción y el consumidor recibirá confirmación en el plazo de 24 horas hábiles.</p>
`,
  },
};

// ---------------------------------------------------------------------------
// TEMPLATES — French (fr)
// ---------------------------------------------------------------------------

const fr: Record<LegalDocType, { title: string; content: string }> = {
  // ── Terms & Conditions (FR) ────────────────────────────────────────────
  terms: {
    title: 'Conditions Générales de Vente et d\'Utilisation',
    content: `
<h2>1. Objet et Dispositions Générales</h2>
<p>Les présentes Conditions Générales de Vente et d'Utilisation ("CGV") régissent l'utilisation de la boutique en ligne exploitée par <strong>{store_name}</strong>, accessible via son site web et sa plateforme de vente. En passant commande sur notre boutique, l'utilisateur déclare avoir lu, compris et accepté intégralement les présentes conditions, ainsi que notre Politique de Confidentialité et notre Politique de Remboursement, qui font partie intégrante du présent contrat.</p>
<p>Ces conditions s'appliquent à tous les consommateurs au sens de la Directive 2011/83/UE du Parlement européen et du Conseil du 25 octobre 2011 relative aux droits des consommateurs, ainsi qu'à toutes les transactions commerciales réalisées via notre plateforme.</p>
<p><strong>{store_name}</strong> se réserve le droit de modifier ces conditions à tout moment. Les modifications prennent effet dès leur publication sur le site web. Nous vous recommandons de consulter régulièrement cette page.</p>

<h2>2. Identité du Commerçant</h2>
<p>L'exploitant de la boutique en ligne est <strong>{store_name}</strong>, établi au Portugal, immatriculé conformément à la législation portugaise et européenne applicable. Pour tout contact :</p>
<ul>
  <li><strong>Dénomination :</strong> {store_name}</li>
  <li><strong>Email de contact :</strong> disponible sur la page de contact du site web</li>
  <li><strong>Horaires :</strong> du lundi au vendredi, de 09h00 à 18h00 (heure de Lisbonne)</li>
</ul>
<p>Le Numéro d'Identification Fiscal (NIF) et les autres données d'immatriculation sont disponibles dans la section « À propos » du site web ou sur demande.</p>

<h2>3. Description des Produits et Services</h2>
<p>Les produits et services disponibles sur la boutique en ligne sont décrits avec la plus grande précision possible, incluant des images, des spécifications techniques, des dimensions, la composition des matériaux et des informations d'utilisation. <strong>{store_name}</strong> s'efforce de garantir que les descriptions, photographies et informations présentées reflètent fidèlement la nature des produits.</p>
<p>Cependant, nous ne pouvons garantir une reproduction absolue des couleurs, celles-ci pouvant varier selon l'équipement utilisé par l'utilisateur. Les éventuelles différences de couleur ne constituent pas un motif de réclamation. Nous nous réservons le droit de corriger les erreurs, inexactitudes ou omissions dans les descriptions des produits à tout moment et sans préavis.</p>

<h2>4. Prix et Fiscalité</h2>
<p>Tous les prix affichés sur la boutique en ligne incluent la TVA au taux légal en vigueur au Portugal. Pour les livraisons au sein de l'Union européenne, la TVA sera appliquée conformément aux règles de localisation du service ou du bien, conformément à la réglementation européenne en matière de TVA. Pour les livraisons en dehors de l'UE, des droits de douane, taxes d'importation et impôts locaux pourront être appliqués, dont la charge incombe intégralement à l'acheteur.</p>
<p>Les prix peuvent être modifiés à tout moment sans préavis. La validité des prix n'est garantie qu'au moment de la confirmation de commande. Les promotions et réductions sont soumises à des conditions spécifiques, clairement indiquées dans l'offre correspondante.</p>

<h2>5. Processus de Commande</h2>
<p>Le processus de commande comprend les étapes suivantes : (i) sélection des produits souhaités et ajout au panier ; (ii) vérification des détails de la commande ; (iii) saisie des données de facturation et de livraison ; (iv) sélection du mode de paiement ; (v) révision et acceptation des présentes CGV ; et (vi) confirmation de la commande.</p>
<p>La confirmation de la commande par <strong>{store_name}</strong> constitue l'acceptation de l'offre d'achat. Toutes les commandes sont soumises à la disponibilité des stocks. En cas d'indisponibilité, le client sera informé dans un délai maximum de 48 heures et se verra proposer une alternative ou un remboursement intégral.</p>

<h2>6. Moyens de Paiement</h2>
<p><strong>{store_name}</strong> accepte les moyens de paiement suivants, traités de manière sécurisée via l'infrastructure NeXFlowX :</p>
<ul>
  <li><strong>Cartes de débit et de crédit</strong> — Visa, Mastercard, American Express et autres réseaux acceptés</li>
  <li><strong>MB WAY</strong> — paiement instantané via l'application MB WAY, disponible pour les clients de banques portugaises</li>
  <li><strong>PIX</strong> — virement instantané pour les clients disposant d'un compte bancaire brésilien</li>
  <li><strong>Virement bancaire SEPA/IBAN</strong> — virement européen, avec un délai de traitement de 1 à 3 jours ouvrés</li>
</ul>
<p>Le paiement est traité au moment de la confirmation de la commande. Pour les paiements par virement bancaire, la commande ne sera expédiée qu'après confirmation de la réception du paiement. Toutes les transactions financières sont traitées avec un chiffrement SSL/TLS de 256 bits et conformes aux exigences PCI DSS.</p>

<h2>7. Livraison des Produits</h2>
<p>La livraison des produits se divise en deux catégories : <strong>produits numériques</strong> et <strong>produits physiques</strong>.</p>
<h3>7.1 Produits Numériques</h3>
<p>Pour les produits numériques (e-books, logiciels, contenus téléchargeables, abonnements), la livraison est effectuée immédiatement ou dans le délai indiqué dans la description du produit, par téléchargement ou accès en ligne. Le droit de rétractation peut ne pas être applicable conformément à l'article 16 de la Directive 2011/83/UE, lorsque le consommateur a donné son consentement exprès et reconnu qu'il perd le droit de rétractation en acceptant l'exécution immédiate.</p>
<h3>7.2 Produits Physiques</h3>
<p>Pour les produits physiques, les délais de livraison indiqués sont des estimations et commencent à courir de la date d'expédition de la commande. <strong>{store_name}</strong> s'engage à expédier les produits dans un délai de 2 à 5 jours ouvrés après confirmation du paiement, sauf indication contraire. Le délai de livraison effectif dépend du transporteur et de la destination. Les frais de livraison sont calculés en fonction de la destination, du poids et des dimensions du colis, et sont indiqués avant la finalisation de l'achat.</p>
<p>Le risque de perte ou de détérioration des produits est transféré au consommateur au moment de la livraison physique, conformément à l'article 20 de la Directive 2011/83/UE.</p>

<h2>8. Droit de Rétractation</h2>
<p>Le consommateur dispose d'un délai de <strong>14 jours</strong> pour exercer son droit de rétractation sans justification, à compter de la date de réception du produit ou, en cas de commande comprenant plusieurs produits, de la date de réception du dernier produit.</p>
<p>Pour exercer ce droit, le consommateur doit notifier <strong>{store_name}</strong> via le formulaire de rétractation disponible sur le site web ou par email, en indiquant clairement sa décision. Les produits doivent être retournés dans leur état d'origine, sans signe d'utilisation, dans l'emballage d'origine et avec tous les accessoires, dans un délai maximum de 14 jours suivant la notification de rétractation.</p>
<p>Les frais de retour sont à la charge du consommateur, sauf si <strong>{store_name}</strong> a omis de l'informer de son droit de rétractation. Le remboursement sera effectué dans un délai de 14 jours après la réception des produits retournés, en utilisant le même moyen de paiement que celui utilisé lors de l'achat.</p>

<h2>9. Limitation de Responsabilité</h2>
<p><strong>{store_name}</strong> ne saurait être tenu responsable des dommages indirects, accessoires ou consécutifs résultant de l'utilisation des produits achetés, y compris, sans s'y limiter, la perte de profits, l'interruption d'activité ou la perte de données. La responsabilité totale de <strong>{store_name}</strong> pour toute réclamation ne saurait excéder le montant total payé pour le produit concerné.</p>
<p>Nous ne sommes pas responsables des retards ou défaillances de livraison causés par un cas de force majeure, notamment les catastrophes naturelles, pandémies, grèves, décisions gouvernementales ou problèmes logistiques des transporteurs.</p>

<h2>10. Droit Applicable et Résolution des Litiges</h2>
<p>Les présentes conditions sont régies par le droit portugais, sans préjudice des dispositions impératives du droit de l'Union européenne applicables aux consommateurs. Pour la résolution des litiges, le consommateur peut recourir à la Plateforme européenne de règlement en ligne des litiges (RLL), disponible à l'adresse <strong>https://ec.europa.eu/consumers/odr/</strong>.</p>
<p>Pour les questions non résolues par voie extrajudiciaire, le Centre d'Arbitrage de Conflits de Consommation de Lisbonne sera compétent, ou à défaut, les tribunaux judiciaires du district de Lisbonne, avec renonciation à tout autre for qui pourrait être compétent.</p>

<h2>11. Modifications des Conditions Générales</h2>
<p><strong>{store_name}</strong> se réserve le droit de modifier les présentes Conditions Générales à tout moment. Les modifications entreront en vigueur à la date de leur publication sur le site web. En cas de modifications substantielles, les clients seront informés par email. La poursuite de l'utilisation de la plateforme après la publication des modifications implique leur acceptation tacite.</p>

<h2>12. Dispositions Finales</h2>
<p>Si l'une des dispositions des présentes CGV était considérée comme nulle ou inapplicable, les autres dispositions conserveront leur pleine vigueur. Le fait pour <strong>{store_name}</strong> de ne pas exercer un droit prévu aux présentes ne constitue pas une renonciation à ce droit. Les présentes conditions constituent l'accord intégral entre le consommateur et <strong>{store_name}</strong> concernant les achats effectués sur la boutique en ligne, remplaçant tout accord antérieur.</p>
<p>En cas de doute ou de question concernant les présentes Conditions Générales, veuillez nous contacter via les canaux indiqués à la section « Identité du Commerçant ».</p>
`,
  },

  // ── Privacy Policy (FR) ────────────────────────────────────────────────
  privacy: {
    title: 'Politique de Confidentialité et Protection des Données',
    content: `
<h2>1. Responsable du Traitement</h2>
<p>Le responsable du traitement des données personnelles, au sens du Règlement Général sur la Protection des Données (RGPD — Règlement (UE) 2016/679) et de la législation nationale applicable, est <strong>{store_name}</strong>, établi au Portugal. Pour toute question relative à la protection de vos données personnelles, vous pouvez nous contacter via les coordonnées indiquées sur la page de contact du site web.</p>
<p><strong>{store_name}</strong> s'engage à traiter vos données personnelles avec le plus grand soin et dans le respect de votre vie privée, en conformité avec la législation applicable en matière de protection des données.</p>

<h2>2. Données Personnelles Collectées</h2>
<p>Nous collectons les catégories de données personnelles suivantes, selon vos interactions avec nos services :</p>
<h3>2.1 Données d'Identification et de Contact</h3>
<ul>
  <li>Nom complet et prénom</li>
  <li>Adresse de facturation et de livraison</li>
  <li>Code postal, ville et pays</li>
  <li>Numéro de téléphone (y compris le numéro MB WAY)</li>
  <li>Adresse email</li>
  <li>Date de naissance (le cas échéant, pour vérification de l'âge)</li>
</ul>
<h3>2.2 Données de Paiement</h3>
<ul>
  <li>Données de cartes de crédit/débit (traitées directement par NeXFlowX, sans transiter par nos serveurs)</li>
  <li>Numéro de compte bancaire IBAN (pour les remboursements par virement)</li>
  <li>Informations de transaction (montant, date, mode de paiement)</li>
</ul>
<h3>2.3 Données Techniques et de Navigation</h3>
<ul>
  <li>Adresse IP</li>
  <li>Type et version du navigateur</li>
  <li>Système d'exploitation et appareil utilisé</li>
  <li>Pages visitées, temps de visite et habitudes de navigation</li>
  <li>Données de cookies et technologies similaires (voir section 8)</li>
  <li>Données de localisation approximative (lorsque autorisé)</li>
</ul>

<h2>3. Finalités et Base Juridique du Traitement</h2>
<p>Vos données personnelles sont traitées pour les finalités suivantes, sur la base des fondements juridiques prévus par le RGPD :</p>
<h3>3.1 Exécution du Contrat</h3>
<p>Traitement nécessaire à l'exécution du contrat de vente, y compris le traitement des commandes, la gestion des paiements, la livraison des produits, l'émission des factures et les communications relatives au suivi des commandes. <strong>Base juridique : Article 6, paragraphe 1, point b) du RGPD.</strong></p>
<h3>3.2 Obligations Légales</h3>
<p>Traitement nécessaire au respect des obligations légales, y compris les exigences fiscales, comptables et de lutte contre le blanchiment d'argent et le financement du terrorisme. <strong>Base juridique : Article 6, paragraphe 1, point c) du RGPD.</strong></p>
<h3>3.3 Intérêts Légitimes</h3>
<p>Analyses statistiques et amélioration de nos services, prévention des fraudes, sécurité de la plateforme et gestion des réclamations. <strong>Base juridique : Article 6, paragraphe 1, point f) du RGPD.</strong></p>
<h3>3.4 Consentement</h3>
<p>Envoi de communications marketing, newsletters et offres personnalisées. Le consentement peut être retiré à tout moment. <strong>Base juridique : Article 6, paragraphe 1, point a) du RGPD.</strong></p>

<h2>4. Durée de Conservation des Données</h2>
<p>Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :</p>
<ul>
  <li><strong>Données de transaction et de facturation :</strong> 10 ans, conformément à l'obligation légale (Code fiscal et Normes comptables)</li>
  <li><strong>Données de compte client :</strong> pendant la durée du compte et 3 ans après la dernière interaction</li>
  <li><strong>Données de communications marketing :</strong> jusqu'au retrait du consentement</li>
  <li><strong>Données de navigation et cookies :</strong> 13 mois pour les cookies analytiques ; jusqu'au retrait du consentement pour les autres</li>
  <li><strong>Données de procédures judiciaires :</strong> pendant la durée de la procédure et 5 ans après sa conclusion</li>
</ul>
<p>À l'expiration de la durée de conservation applicable, les données seront supprimées ou anonymisées de manière sécurisée, sauf si leur conservation est justifiée par des motifs légitimes ou une exigence légale.</p>

<h2>5. Droits des Personnes Concernées</h2>
<p>Conformément au RGPD, la personne concernée dispose des droits suivants, qu'elle peut exercer à tout moment :</p>
<ul>
  <li><strong>Droit d'accès (Article 15) :</strong> demander des informations sur le traitement de ses données et obtenir une copie de celles-ci</li>
  <li><strong>Droit de rectification (Article 16) :</strong> demander la correction de données inexactes ou incomplètes</li>
  <li><strong>Droit à l'effacement (Article 17) :</strong> demander la suppression de ses données personnelles, dans les conditions prévues par le RGPD (« droit à l'oubli »)</li>
  <li><strong>Droit à la limitation du traitement (Article 18) :</strong> demander la restriction du traitement de ses données dans certaines circonstances</li>
  <li><strong>Droit à la portabilité (Article 20) :</strong> recevoir ses données dans un format structuré, couramment utilisé et lisible par machine, ou demander leur transfert vers un autre responsable de traitement</li>
  <li><strong>Droit d'opposition (Article 21) :</strong> s'opposer au traitement de ses données pour des raisons tenant à sa situation particulière, y compris le traitement à des fins de marketing direct</li>
  <li><strong>Droit de ne pas faire l'objet de décisions automatisées (Article 22) :</strong> ne pas être soumis à des décisions fondées exclusivement sur un traitement automatisé produisant des effets juridiques ou l'affectant de manière significative</li>
</ul>
<p>Pour exercer l'un de ces droits, veuillez nous contacter via l'adresse email de protection des données disponible sur le site web. Nous répondrons à votre demande dans un délai de 30 jours, pouvant être prolongé de 60 jours supplémentaires dans les cas complexes, avec notification à la personne concernée.</p>
<p>Si vous estimez que le traitement de vos données porte atteinte au RGPD, vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente, notamment la Commission Nationale de Protection des Données (CNPD) — <strong>https://www.cnpd.pt</strong>.</p>

<h2>6. Cookies et Technologies Similaires</h2>
<p>Le site web de <strong>{store_name}</strong> utilise des cookies et technologies similaires pour améliorer l'expérience utilisateur, analyser le trafic et personnaliser les contenus. Les cookies sont classés dans les catégories suivantes :</p>
<ul>
  <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site web et au processus de paiement (aucun consentement requis)</li>
  <li><strong>Cookies de performance :</strong> collectent des informations sur l'utilisation du site web à des fins statistiques (consentement requis)</li>
  <li><strong>Cookies de fonctionnalité :</strong> permettent des fonctionnalités avancées telles que les préférences de langue et la personnalisation (consentement requis)</li>
  <li><strong>Cookies marketing :</strong> utilisés pour afficher des publicités pertinentes et mesurer l'efficacité des campagnes (consentement requis)</li>
</ul>
<p>Le consentement pour l'utilisation des cookies non essentiels est sollicité lors de la première visite sur le site web, via une bannière de consentement. Vous pouvez gérer ou retirer votre consentement à tout moment via les paramètres de votre navigateur.</p>

<h2>7. Sous-traitants du Traitement</h2>
<p>Pour le traitement de vos données personnelles, <strong>{store_name}</strong> fait appel aux sous-traitants suivants, qui agissent selon nos instructions et en conformité avec des contrats de traitement de données approuvés conformément à l'Article 28 du RGPD :</p>
<ul>
  <li><strong>NeXFlowX</strong> — Traitement des paiements (cartes, MB WAY, PIX, SEPA/IBAN), validation des transactions et prévention des fraudes</li>
  <li><strong>Transporteurs</strong> — Traitement des données de livraison nécessaires à l'expédition des commandes</li>
  <li><strong>Services d'infrastructure cloud</strong> — Hébergement sécurisé des données et infrastructure technologique</li>
  <li><strong>Outils d'analyse</strong> — Analyse des habitudes d'utilisation et amélioration de l'expérience utilisateur</li>
</ul>

<h2>8. Transferts Internationaux de Données</h2>
<p>Vos données personnelles peuvent être transférées vers des pays en dehors de l'Espace Économique Européen (EEE) dans le cadre du traitement des paiements et des services d'infrastructure. Ces transferts sont effectués sur la base de décisions d'adéquation de la Commission européenne, de clauses contractuelles types approuvées par la Commission, ou avec votre consentement exprès.</p>
<p>Nous garantissons que les données transférées bénéficient d'un niveau de protection équivalent à celui garanti par le RGPD, grâce à des mesures techniques et organisationnelles appropriées.</p>

<h2>9. Délégué à la Protection des Données (DPO)</h2>
<p><strong>{store_name}</strong> a désigné un Délégué à la Protection des Données (DPO), qui peut être contacté via l'adresse email indiquée sur la page de politique de confidentialité du site web pour toute question relative au traitement de vos données personnelles.</p>

<h2>10. Mesures de Sécurité</h2>
<p>Nous mettons en œuvre des mesures techniques et organisationnelles robustes pour protéger vos données personnelles contre tout accès non autorisé, altération, divulgation ou destruction, incluant : chiffrement SSL/TLS de 256 bits pour toutes les communications ; authentification multifactorielle pour l'accès aux panneaux d'administration ; contrôles d'accès basés sur les rôles ; surveillance continue de l'infrastructure ; sauvegardes régulières et chiffrées ; audits de sécurité périodiques.</p>
<p>En cas de violation de données personnelles susceptible de présenter un risque pour les personnes concernées, <strong>{store_name}</strong> notifiera l'autorité de contrôle et les personnes concernées dans un délai de 72 heures, conformément aux Articles 33 et 34 du RGPD.</p>

<h2>11. Modifications de la Politique de Confidentialité</h2>
<p>Nous nous réservons le droit de mettre à jour cette Politique de Confidentialité à tout moment. Les modifications significatives seront communiquées via le site web et/ou par email. La version la plus récente est toujours disponible sur notre site web, avec indication de la date de la dernière mise à jour.</p>
`,
  },

  // ── Refund Policy (FR) ─────────────────────────────────────────────────
  refund: {
    title: 'Politique de Remboursement et de Retour',
    content: `
<h2>1. Droit de Rétractation (14 Jours)</h2>
<p>Conformément à la Directive 2011/83/UE du Parlement européen et du Conseil, le consommateur dispose d'un délai de <strong>14 jours calendaires</strong> pour se rétracter de son achat, à compter de la date de réception du produit ou, en cas de commande comprenant plusieurs articles, de la date de réception du dernier article.</p>
<p>Ce droit peut être exercé sans qu'il soit nécessaire de fournir quelque justification que ce soit. Le consommateur doit informer <strong>{store_name}</strong> de sa décision de rétractation par une déclaration sans équivoque (email, formulaire de retour disponible sur le site web ou contact téléphonique), en indiquant le numéro de commande et les produits concernés par le retour.</p>
<p>Les produits doivent être retournés dans leur état d'origine, sans signe d'utilisation, de dommage ou d'altération, dans l'emballage d'origine et accompagnés de tous les accessoires, manuels et documentations. Le retour doit être effectué dans un délai maximum de 14 jours suivant la notification de rétractation. Les frais d'envoi du retour sont à la charge du consommateur, sauf disposition contraire.</p>

<h2>2. Exceptions au Droit de Rétractation</h2>
<p>Le droit de rétractation <strong>n'est pas applicable</strong> dans les cas suivants, conformément à l'article 16 de la Directive 2011/83/UE :</p>
<ul>
  <li><strong>Biens numériques</strong> — Lorsque le consommateur a donné son consentement exprès pour le début de l'exécution du contrat et a reconnu qu'il perd son droit de rétractation en acceptant l'exécution immédiate. Cela inclut les téléchargements de logiciels, e-books, musique, vidéos, codes d'activation et contenus numériques débloqués.</li>
  <li><strong>Biens scellés pour des raisons de protection de la santé ou de l'hygiène</strong> — qui ont été ouverts après la livraison</li>
  <li><strong>Biens confectionnés selon les spécifications du consommateur</strong> — ou clairement personnalisés</li>
  <li><strong>Biens qui, pour des raisons évidentes, ne peuvent être retournés</strong> — soumis à une détérioration rapide ou à une date de péremption</li>
  <li><strong>Biens qui, après la livraison, ont été mélangés de façon inséparable avec d'autres articles</strong></li>
  <li><strong>Enregistrements audiovisuels ou logiciels informatiques scellés</strong> — qui ont été ouverts après la livraison</li>
  <li><strong>Journaux, publications périodiques ou magazines</strong> — à l'exception des abonnements</li>
</ul>

<h2>3. Processus de Remboursement</h2>
<p>Le remboursement sera traité dans un délai de <strong>5 à 14 jours ouvrés</strong> après la réception et la vérification de l'état des produits retournés. Le montant du remboursement inclut le prix payé pour le produit et les frais d'envio originaux (le cas échéant), déduction faite des frais de retour lorsque ceux-ci sont à la charge du consommateur.</p>
<p>Le remboursement sera effectué en utilisant le <strong>même moyen de paiement</strong> que celui utilisé pour l'achat initial :</p>
<ul>
  <li><strong>Carte de crédit/débit :</strong> Le remboursement sera crédité sur le compte de la carte dans un délai de 5 à 10 jours ouvrés, selon l'émetteur de la carte</li>
  <li><strong>MB WAY :</strong> Remboursement crédité sur le solde MB WAY dans un délai de 1 à 3 jours ouvrés</li>
  <li><strong>PIX :</strong> Remboursement transféré dans un délai de 1 à 2 jours ouvrés</li>
  <li><strong>Virement bancaire SEPA/IBAN :</strong> Remboursement crédité dans un délai de 3 à 5 jours ouvrés</li>
</ul>
<p>Le consommateur sera informé par email de la réception des produits retournés, de l'approbation ou du refus du remboursement, et de la date à laquelle le remboursement a été effectué.</p>

<h2>4. Conditions de Retour</h2>
<p>Pour qu'un retour soit accepté, les produits doivent remplir les conditions suivantes :</p>
<ul>
  <li>Être dans leur état d'origine, sans signe d'utilisation, de lavage, d'altération ou de personnalisation</li>
  <li>Conserver toutes les étiquettes et scellés intacts</li>
  <li>Conserver l'emballage d'origine en bon état</li>
  <li>Inclure tous les accessoires, manuels, câbles et composants fournis initialement</li>
  <li>Être accompagné de la preuve d'achat (facture ou reçu) ou du numéro de commande</li>
</ul>
<p>Nous nous réservons le droit de refuser les retours qui ne respectent pas ces conditions ou d'effectuer un remboursement partiel, comme indiqué à la section 6.</p>

<h2>5. Produits Endommagés ou Défectueux</h2>
<p>Si vous recevez un produit endommagé, défectueux ou ne correspondant pas à sa description, veuillez contacter <strong>{store_name}</strong> dans un délai maximum de <strong>48 heures</strong> après la réception, en joignant des photographies claires du dommage ou du défaut. Dans ces cas :</p>
<ul>
  <li>Le consommateur <strong>ne</strong> supporte <strong>pas</strong> les frais de retour</li>
  <li>Un remboursement intégral (y compris les frais d'envoi) sera traité dans un délai de 5 à 14 jours ouvrés</li>
  <li>Alternativement, le consommateur peut choisir le remplacement du produit ou la réparation, selon sa préférence</li>
</ul>
<p>Les délais de garantie légale sont ceux prévus par la législation applicable : 2 ans pour les biens de consommation, à compter de la date de livraison, sans préjudice de délais plus longs prévus par les garanties commerciales.</p>

<h2>6. Remboursements Partiels</h2>
<p><strong>{store_name}</strong> se réserve le droit d'effectuer un remboursement partiel dans les cas suivants :</p>
<ul>
  <li>Les produits présentent des signes évidents d'utilisation diminuant leur valeur</li>
  <li>L'emballage d'origine a été significativement endommagé</li>
  <li>Des accessoires, manuels ou composants fournis initialement manquent</li>
  <li>Le retour est partiel (seuls certains articles d'une commande multiple) et les frais d'envoi proportionnels sont déduits</li>
  <li>Les articles retournés ont été achetés avec une réduction promotionnelle et le retour modifie les conditions de la promotion</li>
</ul>
<p>Dans ces cas, le consommateur sera informé du motif de la déduction et du montant du remboursement partiel avant que celui-ci ne soit traité.</p>

<h2>7. Informations de Contact</h2>
<p>Pour demander un remboursement, initier un retour ou déposer une réclamation relative à un produit, veuillez contacter <strong>{store_name}</strong> via les canaux suivants :</p>
<ul>
  <li><strong>Email :</strong> disponible sur la page de contact du site web</li>
  <li><strong>Formulaire de retour :</strong> accessible dans votre espace client, section « Mes Commandes »</li>
  <li><strong>Téléphone :</strong> disponible sur la page de contact (du lundi au vendredi, 09h00–18h00)</li>
</ul>
<p>Nous recommandons l'utilisation du formulaire de retour en ligne pour un traitement plus rapide et efficace. Toutes les demandes de remboursement sont traitées par ordre de réception et le consommateur recevra une confirmation dans un délai de 24 heures ouvrées.</p>
`,
  },
};

// ---------------------------------------------------------------------------
// Template Registry
// ---------------------------------------------------------------------------

const templates: Record<string, Record<LegalDocType, { title: string; content: string }>> = {
  pt,
  en,
  es,
  fr,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns the legal document title and HTML content for a given document type,
 * locale, and store name.
 *
 * Supported locales: "pt", "en", "es", "fr"
 * If an unsupported locale is provided, English ("en") is used as fallback.
 *
 * @param docType  - One of "terms", "privacy", or "refund"
 * @param locale   - ISO language code (pt, en, es, fr)
 * @param storeName - The merchant's store name (replaces {store_name} in templates)
 */
export function getLegalContent(
  docType: LegalDocType,
  locale: string,
  storeName: string,
): LegalContent {
  const lang = templates[locale] ?? templates.en;
  const template = lang[docType];

  return {
    title: template.title.replace(/\{store_name\}/g, storeName),
    content: template.content.replace(/\{store_name\}/g, storeName) + (infrastructureClause[locale] ?? infrastructureClause.en),
  };
}
