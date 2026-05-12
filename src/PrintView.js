import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  font-family: 'Inter', sans-serif;
  display: flex;
  width: 210mm;
  min-height: 297mm;
  background: white;
  color: #0f172a;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
`;

const Sidebar = styled.div`
  width: 68mm;
  min-width: 68mm;
  background: #1a2a4a;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #1e40af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin-bottom: 10px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
`;

const SideName = styled.h1`
  color: white;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
`;

const SideRole = styled.p`
  color: #64b5f6;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
`;

const SideDivider = styled.div`
  height: 1px;
  background: rgba(255,255,255,0.1);
`;

const SideLabel = styled.p`
  color: #64b5f6;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const SideContactItem = styled.div`
  color: white;
  font-size: 10px;
  margin-bottom: 7px;
  line-height: 1.4;
  word-break: break-all;
`;

const SideSkillItem = styled.div`
  color: white;
  font-size: 10px;
  margin-bottom: 7px;
  line-height: 1.4;
`;

const SideCategoryLabel = styled.span`
  color: #94a3b8;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  display: block;
  margin-bottom: 2px;
`;

const Main = styled.div`
  flex: 1;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #1e40af;
  margin-bottom: 10px;
  padding-bottom: 4px;
  border-bottom: 1.5px solid #e2e8f0;
`;

const AboutText = styled.p`
  font-size: 12px;
  color: #475569;
  line-height: 1.7;
`;

const ExpItem = styled.div`
  margin-bottom: 14px;
  &:last-child { margin-bottom: 0; }
`;

const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 3px;
  gap: 8px;
`;

const ExpTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
  flex: 1;
`;

const ExpCompany = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 4px;
`;

const ExpPeriod = styled.span`
  font-size: 10px;
  color: #64748b;
  white-space: nowrap;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 10px;
`;

const ExpDesc = styled.p`
  font-size: 11px;
  color: #475569;
  line-height: 1.6;
`;

const PrintView = React.forwardRef((_, ref) => (
  <Page ref={ref}>
    <Sidebar>
      <div>
        <SideName>Kaiky D. Netto</SideName>
        <SideRole>Full Stack Developer & Especialista em Automações</SideRole>
      </div>

      <SideDivider />

      <div>
        <SideLabel>Contato</SideLabel>
        <SideContactItem>kaikynetto21@gmail.com</SideContactItem>
        <SideContactItem>github.com/kaikynetto</SideContactItem>
      </div>

      <SideDivider />

      <div>
        <SideLabel>Principais Skills</SideLabel>
        <SideContactItem>ReactJS, NextJS, NestJS</SideContactItem>
        <SideContactItem>Claude API, n8n, Make</SideContactItem>
        <SideContactItem>HubSpot, Pipedrive, Kommo</SideContactItem>
        <SideContactItem>Python, Puppeteer, Playwright</SideContactItem>
        <SideContactItem>PostgreSQL, MySQL, AWS</SideContactItem>
      </div>

      <SideDivider />

      <div>
        <SideLabel>IA & Assistentes</SideLabel>
        <SideContactItem>Claude Code, Claude API</SideContactItem>
        <SideContactItem>ChatGPT, GitHub Copilot</SideContactItem>
      </div>
    </Sidebar>

    <Main>
      <div>
        <SectionTitle>Sobre</SectionTitle>
        <AboutText>
          Full Stack Developer com visão além do código. Construo aplicações modernas com ReactJS, NextJS e NestJS, e entrego automações que eliminam trabalho manual de verdade. Tenho histórico direto com times comerciais — criando automações para SDRs e Closers, integrando CRMs como HubSpot, Pipedrive e Kommo, e estruturando campanhas de disparo via Manychat. Uso Claude API, n8n e Make para criar fluxos inteligentes e Puppeteer e Playwright para web scraping.
        </AboutText>
      </div>

      <div>
        <SectionTitle>Experiência</SectionTitle>
        <ExpItem>
          <ExpHeader>
            <ExpTitle>Desenvolvedor Full Stack</ExpTitle>
            <ExpPeriod>Fev 2024 – Atualmente</ExpPeriod>
          </ExpHeader>
          <ExpCompany>Flow Poker</ExpCompany>
          <ExpDesc>
            Desenvolvimento de aplicações web modernas com ReactJS e NestJS. Implementação de features complexas, integração de APIs e autenticação segura.
          </ExpDesc>
        </ExpItem>
        <ExpItem>
          <ExpHeader>
            <ExpTitle>Desenvolvedor de Automações & Analista de CRM</ExpTitle>
            <ExpPeriod>Nov 2025 – Atualmente</ExpPeriod>
          </ExpHeader>
          <ExpCompany>Nutrição Sem Fronteiras</ExpCompany>
          <ExpDesc>
            Automações com Python e Playwright. Integração de CRM, Manychat e Kommo para o time de vendas. Campanhas de disparo e otimização de processos para SDRs e Closers.
          </ExpDesc>
        </ExpItem>
      </div>

      <div>
        <SectionTitle>Habilidades</SectionTitle>
        <ExpItem>
          <SideCategoryLabel>Frontend</SideCategoryLabel>
          <ExpDesc>ReactJS, NextJS, JavaScript, TypeScript, Styled Components, HTML5, CSS3</ExpDesc>
        </ExpItem>
        <ExpItem>
          <SideCategoryLabel>Backend</SideCategoryLabel>
          <ExpDesc>NestJS, Node.js, Express, Python, REST APIs, PostgreSQL, MySQL</ExpDesc>
        </ExpItem>
        <ExpItem>
          <SideCategoryLabel>Automações & Web Scraping</SideCategoryLabel>
          <ExpDesc>Claude API, n8n, Make, Puppeteer, Playwright, Webhooks</ExpDesc>
        </ExpItem>
        <ExpItem>
          <SideCategoryLabel>CRM & Ferramentas</SideCategoryLabel>
          <ExpDesc>HubSpot, Pipedrive, Kommo, Manychat, AWS, Git, Docker, Figma</ExpDesc>
        </ExpItem>
      </div>
    </Main>
  </Page>
));

export default PrintView;
