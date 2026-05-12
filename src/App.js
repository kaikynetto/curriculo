import { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { FaCode, FaBolt, FaDatabase, FaEnvelope, FaLinkedin, FaGithub, FaReact, FaNode, FaGit, FaDocker, FaTerminal, FaCloud, FaDownload } from 'react-icons/fa';
import { SiNextdotjs, SiNestjs, SiTypescript, SiJavascript, SiPython, SiClaude, SiPostgresql, SiMysql } from 'react-icons/si';
import PrintView from './PrintView';

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  @media print {
    body { background: white; }

    aside { display: none !important; }

    main {
      padding: 32px 48px !important;
      overflow: visible !important;
      height: auto !important;
      flex: unset !important;
      width: 100% !important;
    }

    section {
      break-inside: avoid;
      margin-bottom: 40px !important;
    }

    #root > div {
      height: auto !important;
      overflow: visible !important;
      display: block !important;
    }

    * {
      animation: none !important;
      transition: none !important;
    }
  }
`;

/* ── Animations ── */
const animations = `
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ── Loading ── */
const LoadingScreen = styled.div`
  ${animations}
  position: fixed; inset: 0;
  background: #1a2a4a;
  display: flex; justify-content: center; align-items: center;
  z-index: 9999;
  animation: fadeOut 0.5s ease-out 2s forwards;
  @keyframes fadeOut {
    to { opacity: 0; visibility: hidden; }
  }
`;
const LoadingName = styled.h1`
  color: white; font-size: 44px; font-weight: 800;
  letter-spacing: -1.5px; margin-bottom: 10px;
  animation: slideInUp 0.7s ease-out;
`;
const LoadingRole = styled.p`
  color: #64b5f6; font-size: 16px; font-weight: 500;
  margin-bottom: 32px; animation: fadeIn 0.7s ease-out 0.2s backwards;
`;
const ProgressBar = styled.div`
  width: 280px; height: 2px; background: rgba(100,181,246,0.2);
  border-radius: 2px; overflow: hidden;
  &::after {
    content: ''; display: block; height: 100%; width: 100%;
    background: linear-gradient(90deg, transparent, #64b5f6, transparent);
    animation: sweep 2s ease-in-out;
    @keyframes sweep {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  }
`;

/* ── Layout ── */
const Container = styled.div`
  ${animations}
  display: flex; height: 100vh; background: #f8fafc;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #1a2a4a;
    padding: 16px 20px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
`;

const MobileTitle = styled.div`
  h1 { color: white; font-size: 16px; font-weight: 700; }
  p { color: #64b5f6; font-size: 11px; }
`;

const HamburgerBtn = styled.button`
  background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; gap: 5px; padding: 4px;
  span {
    display: block; width: 22px; height: 2px;
    background: white; border-radius: 2px;
    transition: all 0.3s ease;
  }
  ${p => p.open && `
    span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  `}
`;

/* ── Sidebar ── */
const Sidebar = styled.aside`
  width: 288px; min-width: 288px;
  background: #1a2a4a;
  padding: 36px 24px;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 28px;
  position: sticky; top: 0; height: 100vh;
  animation: slideInLeft 0.6s ease-out;

  @media (max-width: 1024px) and (min-width: 769px) {
    width: 240px; min-width: 240px;
    padding: 28px 18px;
  }

  @media (max-width: 768px) {
    width: 100%; min-width: unset; height: auto;
    position: fixed; top: 53px; left: 0; right: 0;
    z-index: 99; padding: 20px;
    transform: ${p => p.open ? 'translateY(0)' : 'translateY(-110%)'};
    transition: transform 0.3s ease;
    animation: none;
  }
`;

const Avatar = styled.div`
  width: 72px; height: 72px; border-radius: 16px;
  background: #1e40af;
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; font-weight: 800; color: white;
  margin-bottom: 14px; letter-spacing: -1px;
`;

const ProfileName = styled.h1`
  color: white; font-size: 20px; font-weight: 700;
  letter-spacing: -0.5px; margin-bottom: 4px;
`;
const ProfileRole = styled.p`
  color: #64b5f6; font-size: 13px; font-weight: 500;
`;

const Divider = styled.div`
  height: 1px; background: rgba(255,255,255,0.08);
`;

const SideLabel = styled.p`
  color: #64b5f6; font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px;
`;

const SkillRow = styled.div`
  display: flex; align-items: center; gap: 10px;
  color: #cbd5e1; font-size: 13px; margin-bottom: 11px;
  svg { color: #64b5f6; flex-shrink: 0; }
  &:last-child { margin-bottom: 0; }
`;

const ContactLink = styled.a`
  display: flex; align-items: center; gap: 10px;
  color: #94a3b8; font-size: 12px; text-decoration: none;
  padding: 7px 0; transition: all 0.2s ease;
  svg { color: #64b5f6; flex-shrink: 0; }
  &:hover { color: #64b5f6; padding-left: 4px; }
`;

const NavMenu = styled.nav`
  display: flex; flex-direction: column; gap: 3px;
  margin-top: auto;
`;
const NavItem = styled.button`
  width: 100%; padding: 10px 14px; background: none; border: none;
  color: ${p => p.active ? '#fff' : '#94a3b8'};
  font-size: 14px; font-weight: ${p => p.active ? '600' : '500'};
  font-family: 'Inter', sans-serif;
  text-align: left; cursor: pointer; border-radius: 8px;
  border-left: 3px solid ${p => p.active ? '#64b5f6' : 'transparent'};
  background: ${p => p.active ? 'rgba(100,181,246,0.08)' : 'none'};
  transition: all 0.2s ease;
  &:hover { color: white; background: rgba(255,255,255,0.05); }
`;

const DownloadBtn = styled.button`
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 11px;
  background: #1e40af;
  color: white; border: none; border-radius: 10px;
  font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif;
  cursor: pointer; transition: all 0.2s ease;
  svg { font-size: 13px; }
  &:hover {
    transform: translateY(-2px);
  }
  &:active { transform: translateY(0); }
`;

/* ── Main ── */
const MainContent = styled.main`
  flex: 1; padding: 52px 64px; overflow-y: auto;
  animation: fadeIn 0.8s ease-out 0.3s backwards;

  @media (max-width: 1024px) and (min-width: 769px) {
    padding: 40px 40px;
  }

  @media (max-width: 768px) {
    padding: 28px 20px;
    overflow-y: auto;
    flex: 1;
  }
`;

const Section = styled.section`
  margin-bottom: 64px; scroll-margin-top: 52px;
`;
const SectionTitle = styled.h2`
  color: #0f172a; font-size: 28px; font-weight: 800;
  letter-spacing: -0.8px; margin-bottom: 6px;
`;
const SectionSubtitle = styled.p`
  color: #64748b; font-size: 15px; font-weight: 400; margin-bottom: 28px;
`;

/* ── About card ── */
const AboutCard = styled.div`
  background: white; padding: 28px; border-radius: 12px;
  border: 1px solid #f1f5f9;
  animation: slideInUp 0.6s ease-out 0.4s backwards;
`;
const AboutTitle = styled.h3`
  color: #0f172a; font-size: 18px; font-weight: 700; margin-bottom: 6px;
`;
const AboutRole = styled.p`
  color: #1e40af; font-size: 13px; font-weight: 600;
  margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px;
`;
const AboutText = styled.p`
  color: #475569; font-size: 15px; line-height: 1.75;
`;

/* ── Timeline ── */
const Timeline = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute; left: 16px; top: 8px;
    bottom: 8px; width: 2px;
    background: #e2e8f0;
    z-index: 0;
  }
`;
const TimelineItem = styled.div`
  display: flex; gap: 24px; margin-bottom: 28px;
  position: relative; z-index: 1;
  animation: slideInUp 0.6s ease-out backwards;
  &:nth-child(1) { animation-delay: 0.4s; }
  &:nth-child(2) { animation-delay: 0.5s; }
  &:last-child { margin-bottom: 0; }
`;
const TimelineDot = styled.div`
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  background: #1e40af;
  display: flex; align-items: center; justify-content: center;
  position: relative; z-index: 2;
  svg { color: white; font-size: 13px; }
`;
const TimelineCard = styled.div`
  flex: 1; background: white; padding: 22px 24px; border-radius: 12px;
  border: 1px solid #f1f5f9;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
const TimelineCardTitle = styled.h3`
  color: #0f172a; font-size: 16px; font-weight: 700; margin-bottom: 4px;
`;
const TimelineCompany = styled.p`
  color: #1e40af; font-size: 13px; font-weight: 600; margin-bottom: 6px;
`;
const TimelinePeriod = styled.span`
  display: inline-block;
  background: #eff6ff; color: #475569;
  font-size: 11px; font-weight: 500; padding: 3px 10px;
  border-radius: 20px; margin-bottom: 10px;
`;
const TimelineDesc = styled.p`
  color: #64748b; font-size: 14px; line-height: 1.65;
`;

/* ── Skills grid ── */
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;
const SkillCard = styled.div`
  background: white; padding: 22px; border-radius: 12px;
  border: 1px solid #f1f5f9;
  transition: transform 0.2s ease;
  animation: slideInUp 0.6s ease-out backwards;
  &:nth-child(1) { animation-delay: 0.4s; }
  &:nth-child(2) { animation-delay: 0.5s; }
  &:nth-child(3) { animation-delay: 0.6s; }
  &:nth-child(4) { animation-delay: 0.7s; }
  &:nth-child(5) { animation-delay: 0.8s; }
  &:hover {
    transform: translateY(-2px);
  }
`;
const SkillCardTitle = styled.h3`
  color: #0f172a; font-size: 14px; font-weight: 700;
  margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px;
`;
const TagsRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 7px;
`;
const Tag = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  background: #f8fafc; color: #334155;
  padding: 6px 12px; border-radius: 20px;
  font-size: 13px; font-weight: 500;
  border: 1px solid #e2e8f0; transition: all 0.2s ease;
  svg { color: #1e40af; width: 13px; height: 13px; flex-shrink: 0; }
  &:hover {
    background: #eff6ff; border-color: #3b82f6;
    color: #1e40af; transform: translateY(-1px);
  }
`;

/* ── Contact ── */
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;
const ContactCard = styled.a`
  display: flex; align-items: center; gap: 18px;
  background: white; padding: 22px; border-radius: 12px;
  border: 2px solid #f1f5f9; text-decoration: none;
  transition: all 0.25s ease;
  animation: slideInUp 0.6s ease-out backwards;
  &:nth-child(1) { animation-delay: 0.4s; }
  &:nth-child(2) { animation-delay: 0.5s; }
  &:nth-child(3) { animation-delay: 0.6s; }
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-3px);
  }
`;
const ContactIcon = styled.div`
  width: 48px; height: 48px; border-radius: 12px;
  background: #eff6ff; display: flex; align-items: center; justify-content: center;
  svg { color: #1e40af; font-size: 20px; }
  flex-shrink: 0;
`;
const ContactLabel = styled.p`
  color: #94a3b8; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px;
`;
const ContactValue = styled.p`
  color: #0f172a; font-size: 14px; font-weight: 600; word-break: break-all;
`;

/* ── Icon map ── */
const skillIcons = {
  'ReactJS': <FaReact />, 'React': <FaReact />,
  'NextJS': <SiNextdotjs />, 'Next.js': <SiNextdotjs />,
  'JavaScript': <SiJavascript />, 'TypeScript': <SiTypescript />,
  'Styled Components': <FaCode />, 'HTML5': <FaCode />, 'CSS3': <FaCode />,
  'NestJS': <SiNestjs />, 'Node.js': <FaNode />, 'Express': <FaNode />,
  'Python': <SiPython />, 'REST APIs': <FaBolt />, 'Autenticação': <FaBolt />,
  'PostgreSQL': <SiPostgresql />, 'MySQL': <SiMysql />,
  'Claude API': <SiClaude />, 'n8n': <FaBolt />, 'Make': <FaBolt />,
  'Puppeteer': <FaCode />, 'Playwright': <FaCode />, 'Webhooks': <FaBolt />,
  'HubSpot': <FaDatabase />, 'Pipedrive': <FaDatabase />,
  'Kommo': <FaDatabase />, 'Manychat': <FaBolt />,
  'AWS': <FaCloud />, 'Git': <FaGit />, 'Docker': <FaDocker />, 'Figma': <FaCode />,
  'Claude Code': <FaTerminal />, 'ChatGPT': <FaBolt />, 'GitHub Copilot': <FaGithub />,
};

/* ── Data ── */
const sections = [
  { id: 'sobre',       label: 'Sobre',       title: 'Sobre Mim',   subtitle: 'Conheça meu perfil profissional' },
  { id: 'experiencia', label: 'Experiência', title: 'Experiência', subtitle: 'Trajetória profissional' },
  { id: 'habilidades', label: 'Habilidades', title: 'Habilidades', subtitle: 'Tecnologias e ferramentas' },
  { id: 'contato',     label: 'Contato',     title: 'Contato',     subtitle: 'Vamos conversar' },
];

const experiencias = [
  {
    title: 'Desenvolvedor Full Stack',
    company: 'Flow Poker',
    period: 'Fev 2024 – Atualmente',
    description: 'Desenvolvimento de aplicações web modernas com ReactJS e NestJS. Implementação de features complexas, integração de APIs e autenticação segura.',
    icon: <FaCode />,
  },
  {
    title: 'Desenvolvedor de Automações & Analista de CRM',
    company: 'Nutrição Sem Fronteiras',
    period: 'Nov 2025 – Atualmente',
    description: 'Automações com Python e Playwright. Integração de CRM, Manychat e Kommo para o time de vendas. Campanhas de disparo e otimização de processos para SDRs e Closers.',
    icon: <FaBolt />,
  },
];

const habilidades = [
  { title: 'Frontend',                 skills: 'ReactJS, NextJS, JavaScript, TypeScript, Styled Components, HTML5, CSS3' },
  { title: 'Backend',                  skills: 'NestJS, Node.js, Express, Python, REST APIs, Autenticação, PostgreSQL, MySQL' },
  { title: 'Automações & Web Scraping', skills: 'Claude API, n8n, Make, Python, Puppeteer, Playwright, Webhooks' },
  { title: 'CRM & Ferramentas',         skills: 'HubSpot, Pipedrive, Kommo, Manychat, AWS, Git, Docker, Figma' },
  { title: 'IA & Assistentes',          skills: 'Claude Code, Claude API, ChatGPT, GitHub Copilot' },
];

/* ── Component ── */
function App() {
  const [loading, setLoading]       = useState(true);
  const [activeSection, setActive]  = useState('sobre');
  const [sidebarOpen, setSidebar]   = useState(false);
  const contentRef                  = useRef(null);
  const printRef                    = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root, threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    );
    sections.forEach(s => {
      const node = document.getElementById(s.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const node = document.getElementById(id);
    if (node) node.scrollIntoView({ behavior: 'smooth' });
    setSidebar(false);
  };

  const handleDownload = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Kaiky-D-Netto-Curriculo',
  });

  return (
    <>
      <GlobalStyle />
      {loading && (
        <LoadingScreen>
          <div style={{ textAlign: 'center' }}>
            <LoadingName>Kaiky D. Netto</LoadingName>
            <LoadingRole>Full Stack Developer</LoadingRole>
            <ProgressBar />
          </div>
        </LoadingScreen>
      )}

      <Container>
        <MobileHeader>
          <MobileTitle>
            <h1>Kaiky D. Netto</h1>
            <p>Full Stack Developer</p>
          </MobileTitle>
          <HamburgerBtn open={sidebarOpen} onClick={() => setSidebar(o => !o)}>
            <span /><span /><span />
          </HamburgerBtn>
        </MobileHeader>

        {/* ── Sidebar ── */}
        <Sidebar open={sidebarOpen}>
          <div>
            <ProfileName>Kaiky D. Netto</ProfileName>
            <ProfileRole>Full Stack Developer</ProfileRole>
          </div>

          <Divider />

          <div>
            <SideLabel>Principais Skills</SideLabel>
            <SkillRow><FaReact /><span>React, NextJS, NestJS</span></SkillRow>
            <SkillRow><FaBolt /><span>Claude API, n8n, Make</span></SkillRow>
            <SkillRow><FaDatabase /><span>HubSpot, Pipedrive, Kommo</span></SkillRow>
          </div>

          <Divider />

          <div>
            <SideLabel>Contato</SideLabel>
            <ContactLink href="mailto:kaikynetto21@gmail.com">
              <FaEnvelope /> kaikynetto21@gmail.com
            </ContactLink>
            <ContactLink href="https://www.linkedin.com/in/kaiky-n-b9b3b3364/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </ContactLink>
            <ContactLink href="https://github.com/kaikynetto" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </ContactLink>
          </div>

          <Divider />

          <NavMenu>
            {sections.map(s => (
              <NavItem key={s.id} active={activeSection === s.id} onClick={() => scrollTo(s.id)}>
                {s.label}
              </NavItem>
            ))}
          </NavMenu>

          <DownloadBtn onClick={handleDownload}>
            <FaDownload /> Baixar Currículo PDF
          </DownloadBtn>
        </Sidebar>

        {/* ── Content ── */}
        <MainContent ref={contentRef}>

          {/* Sobre */}
          <Section id="sobre">
            <SectionTitle>{sections[0].title}</SectionTitle>
            <SectionSubtitle>{sections[0].subtitle}</SectionSubtitle>
            <AboutCard>
              <AboutTitle>Full Stack Developer</AboutTitle>
              <AboutRole>Desenvolvedor Full Stack & Especialista em Automações</AboutRole>
              <AboutText>
                Full Stack Developer com visão além do código. Construo aplicações modernas com ReactJS, NextJS e NestJS, e entrego automações que eliminam trabalho manual de verdade. Tenho histórico direto com times comerciais — criando automações para SDRs e Closers, integrando CRMs como HubSpot, Pipedrive e Kommo, e estruturando campanhas de disparo via Manychat. Uso Claude API, n8n e Make para criar fluxos inteligentes, Puppeteer e Playwright para web scraping, e tenho experiência prática com Claude Code e principais ferramentas de IA do mercado. Se o desafio envolve código, automação ou vendas, provavelmente já resolvi algo parecido.
              </AboutText>
            </AboutCard>
          </Section>

          {/* Experiência */}
          <Section id="experiencia">
            <SectionTitle>{sections[1].title}</SectionTitle>
            <SectionSubtitle>{sections[1].subtitle}</SectionSubtitle>
            <Timeline>
              {experiencias.map((exp, i) => (
                <TimelineItem key={i}>
                  <TimelineDot>{exp.icon}</TimelineDot>
                  <TimelineCard>
                    <TimelineCardTitle>{exp.title}</TimelineCardTitle>
                    <TimelineCompany>{exp.company}</TimelineCompany>
                    <TimelinePeriod>{exp.period}</TimelinePeriod>
                    <TimelineDesc>{exp.description}</TimelineDesc>
                  </TimelineCard>
                </TimelineItem>
              ))}
            </Timeline>
          </Section>

          {/* Habilidades */}
          <Section id="habilidades">
            <SectionTitle>{sections[2].title}</SectionTitle>
            <SectionSubtitle>{sections[2].subtitle}</SectionSubtitle>
            <SkillsGrid>
              {habilidades.map((cat, i) => (
                <SkillCard key={i}>
                  <SkillCardTitle>{cat.title}</SkillCardTitle>
                  <TagsRow>
                    {cat.skills.split(', ').map((skill, j) => (
                      <Tag key={j}>
                        {skillIcons[skill] || <FaCode />}
                        {skill}
                      </Tag>
                    ))}
                  </TagsRow>
                </SkillCard>
              ))}
            </SkillsGrid>
          </Section>

          {/* Contato */}
          <Section id="contato">
            <SectionTitle>{sections[3].title}</SectionTitle>
            <SectionSubtitle>{sections[3].subtitle}</SectionSubtitle>
            <ContactGrid>
              <ContactCard href="mailto:kaikynetto21@gmail.com">
                <ContactIcon><FaEnvelope /></ContactIcon>
                <div>
                  <ContactLabel>Email</ContactLabel>
                  <ContactValue>kaikynetto21@gmail.com</ContactValue>
                </div>
              </ContactCard>
              <ContactCard href="https://www.linkedin.com/in/kaiky-n-b9b3b3364/" target="_blank" rel="noopener noreferrer">
                <ContactIcon><FaLinkedin /></ContactIcon>
                <div>
                  <ContactLabel>LinkedIn</ContactLabel>
                  <ContactValue>kaiky-n-b9b3b3364</ContactValue>
                </div>
              </ContactCard>
              <ContactCard href="https://github.com/kaikynetto" target="_blank" rel="noopener noreferrer">
                <ContactIcon><FaGithub /></ContactIcon>
                <div>
                  <ContactLabel>GitHub</ContactLabel>
                  <ContactValue>github.com/kaikynetto</ContactValue>
                </div>
              </ContactCard>
            </ContactGrid>
          </Section>

        </MainContent>
      </Container>

      <div style={{ display: 'none' }}>
        <PrintView ref={printRef} />
      </div>
    </>
  );
}

export default App;
