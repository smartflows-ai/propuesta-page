import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('in'), i * 80);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ─── HEADER ─── */}
    <header>
        <div className="header-inner">
            <div className="logos-pair">
                {/* RobotInAI logo */}
                <img src="logo.png" alt="RobotInAI Logo" style={{"height":"48px","width":"auto","display":"block"}} />
            </div>
            <nav>
                <a href="#problema">Situación</a>
                <a href="#solucion">Solución</a>
                <a href="#alcance">Alcance</a>
                <a href="#cronograma">Cronograma</a>
                <a href="#contacto">Contacto</a>
            </nav>
        </div>
    </header>

    {/* ─── HERO ─── */}
    <section className="hero">
        <div className="hero-inner">
            <div className="hero-badge">
                <span></span>
                Propuesta personalizada · Dr. César Ruiz
            </div>
            <h1>
                Transformando tu práctica<br />
                <em>en una experiencia digital</em>
            </h1>
            <p className="hero-sub">
                Un sistema diseñado para que cada paciente que te descubre en redes sociales
                encuentre respuestas, confíe en tu experiencia y tome acción — sin fricciones.
            </p>
            <div className="hero-actions">
                <a href="#solucion" className="btn btn-primary">Ver la propuesta →</a>
            </div>
        </div>
    </section>

    {/* ─── ENTENDEMOS ─── */}
    <section className="understanding reveal">
        <div className="container">
            <div className="understanding-grid">
                <div>
                    <span className="section-label">Lo que entendemos</span>
                    <h2 className="display">El consultorio ya tiene<br /><em>lo que más cuesta</em> construir</h2>
                    <p className="lead">Hay algo que los algoritmos no pueden replicar: autoridad médica ganada con años de
                        formación, casos reales y contenido educativo de calidad. Eso ya existe. Lo que sigue es ponerlo
                        a trabajar de forma más inteligente.</p>
                    <div className="assets-list">
                        <div className="asset-item">
                            <div className="asset-icon">📱</div>
                            <div className="asset-text">
                                <strong>Presencia activa en redes sociales</strong>
                                <span>Audiencia construida orgánicamente con contenido educativo sobre columna vertebral
                                    y ortopedia</span>
                            </div>
                        </div>
                        <div className="asset-item">
                            <div className="asset-icon">🎓</div>
                            <div className="asset-text">
                                <strong>Credenciales académicas de alto nivel</strong>
                                <span>Fellowship en Cirugía de Columna, publicaciones científicas, miembro de EUROSPINE
                                    y AO Spine</span>
                            </div>
                        </div>
                        <div className="asset-item">
                            <div className="asset-icon">🏥</div>
                            <div className="asset-text">
                                <strong>Práctica médica bien establecida</strong>
                                <span>Presencia en 5 hospitales de Monterrey y más de 300 procedimientos exitosos
                                    documentados</span>
                            </div>
                        </div>
                        <div className="asset-item">
                            <div className="asset-icon">🤝</div>
                            <div className="asset-text">
                                <strong>Comunidad de pacientes con intención</strong>
                                <span>Personas que llegan buscando información específica sobre su salud, con alta
                                    motivación para actuar</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="understanding-visual reveal">
                    <div className="stat-stack">
                        <div className="stat-card">
                            <h3>300+</h3>
                            <p>Procedimientos exitosos en columna vertebral, traumatología y ortopedia documentados</p>
                        </div>
                        <div className="stat-card">
                            <h3>5</h3>
                            <p>Hospitales de referencia en Monterrey donde el Dr. Ruiz ejerce actualmente</p>
                        </div>
                        <div className="stat-card dark">
                            <h3>∞</h3>
                            <p>Potencial de alcance: cada video publicado puede convertirse en un nuevo paciente</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* ─── OPORTUNIDAD ─── */}
    <section className="oportunidad reveal">
        <div className="opp-inner">
            <span className="section-label" style={{"display":"block","textAlign":"center"}}>La oportunidad</span>
            <h2 className="display" style={{"textAlign":"center"}}>El Dr. Ruiz ya tiene<br /><em>lo más difícil</em></h2>
            <p className="lead" style={{"textAlign":"center","margin":"0 auto 1rem"}}>Construir autoridad médica toma años. El
                contenido, la audiencia y la credibilidad ya existen. La pieza que falta es más concreta.</p>

            <div className="opp-points">
                <div className="opp-point">
                    <span className="opp-icon">📣</span>
                    <h4>Audiencia grande</h4>
                    <p>Pacientes potenciales que ya confían en el contenido educativo del doctor, listos para actuar</p>
                </div>
                <div className="opp-point">
                    <span className="opp-icon">🎥</span>
                    <h4>Contenido educativo</h4>
                    <p>Videos explicativos de calidad que generan confianza antes de la primera consulta</p>
                </div>
                <div className="opp-point">
                    <span className="opp-icon">🏆</span>
                    <h4>Autoridad médica</h4>
                    <p>Certificaciones, publicaciones y membresías internacionales que avalan la experiencia</p>
                </div>
            </div>

            <div className="missing-block">
                👉 Lo que falta: un sistema que convierta ese tráfico en pacientes atendidos
            </div>
        </div>
    </section>

    {/* ─── SITUACIÓN ACTUAL / PROBLEMA ─── */}
    <section className="problema reveal" id="problema">
        <div className="container">
            <span className="section-label">Situación actual</span>
            <h2 className="display">Hay demanda. Lo que falta<br />es <em>convertirla en sistema</em></h2>
            <p className="lead">El flujo de atención actual funciona, pero depende completamente de esfuerzo manual en cada
                paso. Eso limita el crecimiento y genera puntos de pérdida difíciles de ver.</p>

            <div className="flow-diagram">
                <div className="flow-step">
                    <div className="step-num">1</div>
                    <span>Paciente ve un video en Instagram o TikTok</span>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-step">
                    <div className="step-num">2</div>
                    <span>Se interesa en su problema de espalda o articulaciones</span>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-step">
                    <div className="step-num">3</div>
                    <span>Busca información adicional — va a la página web</span>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-step broken">
                    <div className="step-num">4</div>
                    <span>Encuentra respuestas incompletas, botones que no funcionan, sin info de WhatsApp clara</span>
                </div>
                <div className="flow-connector"></div>
                <div className="flow-step broken">
                    <div className="step-num">5</div>
                    <span>Abandona el sitio — paciente potencial perdido</span>
                </div>
            </div>

            <div className="losses-grid">
                <div className="loss-card">
                    <span className="loss-icon">📉</span>
                    <h4>Pérdida de conversión</h4>
                    <p>Muchos pacientes ven el contenido pero no llegan a agendar consulta porque el camino no está
                        claro</p>
                </div>
                <div className="loss-card">
                    <span className="loss-icon">⏱️</span>
                    <h4>Pérdida de tiempo</h4>
                    <p>Preguntas repetitivas por WhatsApp: precios, ubicación, especialidades — que se podrían resolver
                        automáticamente</p>
                </div>
                <div className="loss-card">
                    <span className="loss-icon">🔗</span>
                    <h4>Pérdida de seguimiento</h4>
                    <p>Después de la consulta el paciente no tiene un lugar donde consultar su diagnóstico, estudios o
                        recomendaciones</p>
                </div>
            </div>
        </div>
    </section>

    {/* ─── PROBLEMÁTICA TÉCNICA ─── */}
    <section className="issues reveal">
        <div className="container">
            <span className="section-label">Diagnóstico técnico</span>
            <h2 className="display">Fricciones concretas<br /><em>que frenan el crecimiento</em></h2>
            <p className="lead" style={{"color":"rgba(255,255,255,.7)"}}>Cada uno de estos puntos representa un paciente
                potencial que se pierde, o una oportunidad de seguimiento que no se aprovecha.</p>

            <div className="issues-grid">
                <div className="issue-card">
                    <span className="issue-category">Página web</span>
                    <h4>Sin narrativa de conversión</h4>
                    <ul>
                        <li>El sitio no cuenta una historia progresiva que lleve al paciente a actuar</li>
                        <li>Botón "Conóceme" no funciona</li>
                        <li>Videos de YouTube bloquean el video de fondo</li>
                        <li>Mezcla de testimonios y servicios sin jerarquía clara</li>
                        <li>Dos páginas activas generan confusión (saludosea.com y doctorcesaruiz.com)</li>
                    </ul>
                </div>
                <div className="issue-card">
                    <span className="issue-category">Comunicación</span>
                    <h4>WhatsApp sin automatización</h4>
                    <ul>
                        <li>Solo responde en horario de oficina, pero el sitio dice "abierto 24 horas"</li>
                        <li>No está claro si el número es para WhatsApp, llamada o ambos</li>
                        <li>No se mencionan ubicaciones en la respuesta inicial</li>
                        <li>Las personas que trabajan buscan servicios fuera de horario — oportunidad perdida</li>
                    </ul>
                </div>
                <div className="issue-card">
                    <span className="issue-category">Experiencia del paciente</span>
                    <h4>Sin continuidad post-consulta</h4>
                    <ul>
                        <li>No existe espacio digital donde el paciente pueda consultar su expediente</li>
                        <li>Recomendaciones médicas dependen de que el paciente las recuerde</li>
                        <li>No hay sistema de recordatorios ni seguimiento automatizado</li>
                        <li>Integración con Doctoralia sin optimizar para conversión</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {/* ─── SOLUCIÓN ─── */}
    <section className="solucion reveal" id="solucion">
        <div className="container">
            <span className="section-label">La solución propuesta</span>
            <h2 className="display">Una plataforma que conecta<br /><em>todo el proceso de atención</em></h2>
            <p className="lead">Desde el primer video que un paciente ve en redes sociales, hasta el seguimiento semanas
                después de la consulta — todo en un sistema cohesivo.</p>

            <div className="sol-flow">
                <div className="sol-node">📱 Redes sociales</div>
                <span className="sol-arrow">→</span>
                <div className="sol-node">🌐 Página optimizada</div>
                <span className="sol-arrow">→</span>
                <div className="sol-node">🤖 Asistente responde</div>
                <span className="sol-arrow">→</span>
                <div className="sol-node">📅 Agenda consulta</div>
                <span className="sol-arrow">→</span>
                <div className="sol-node">📋 Portal del paciente</div>
                <span className="sol-arrow">→</span>
                <div className="sol-node">🔔 Seguimiento</div>
            </div>

            <div className="components-grid">
                <div className="comp-card">
                    <div className="comp-num">1</div>
                    <h3>Página optimizada para conversión</h3>
                    <p>Una sola URL clara y bien estructurada que cuente la historia del consultorio de forma progresiva
                        — desde el problema del paciente hasta la acción de agendar. SEO, velocidad y diseño trabajando
                        juntos.</p>
                </div>
                <div className="comp-card">
                    <div className="comp-num">2</div>
                    <h3>Asistente digital 24/7 con IA</h3>
                    <p>Entrenado con la información real del consultorio: especialidades, ubicaciones, costos,
                        Doctoralia, y preguntas frecuentes. Responde en cualquier horario y guía al paciente hacia el
                        siguiente paso natural.</p>
                </div>
                <div className="comp-card">
                    <div className="comp-num">3</div>
                    <h3>Agendamiento integrado</h3>
                    <p>Conexión directa con WhatsApp Business API y Doctoralia. El paciente puede confirmar cita en 2
                        pasos desde cualquier dispositivo, con recordatorios automáticos para reducir cancelaciones.</p>
                </div>
                <div className="comp-card">
                    <div className="comp-num">4</div>
                    <h3>Portal del paciente</h3>
                    <p>Un espacio privado donde cada paciente puede consultar el resumen de su visita, estudios,
                        recomendaciones del doctor y contenido educativo relevante a su diagnóstico específico.</p>
                </div>
                <div className="comp-card">
                    <div className="comp-num">5</div>
                    <h3>Seguimiento post-consulta</h3>
                    <p>Mensajes automáticos de WhatsApp para recordar recomendaciones, solicitar actualizaciones de
                        progreso y mantener al paciente conectado con el consultorio durante su recuperación.</p>
                </div>
                <div className="comp-card">
                    <div className="comp-num">6</div>
                    <h3>Hub de educación médica</h3>
                    <p>El contenido educativo que ya produce el Dr. Ruiz, organizado y conectado al diagnóstico del
                        paciente. Información confiable disponible cuando el paciente la necesita — firmada por su
                        especialista.</p>
                </div>
            </div>
        </div>
    </section>

    {/* ─── ALCANCE ─── */}
    <section className="alcance reveal" id="alcance">
        <div className="container">
            <span className="section-label">Qué incluye</span>
            <h2 className="display">Alcance del proyecto<br /><em>sin ambigüedades</em></h2>

            <div className="alcance-grid">
                <div>
                    <div style={{"marginBottom":"1.2rem"}}>
                        <h3
                            style={{"fontFamily":"'Poppins',serif","fontSize":"1.25rem","fontWeight":"600","color":"var(--dark)","marginBottom":"1rem","paddingBottom":".7rem","borderBottom":"2px solid var(--gray-light)"}}>
                            ✅ Incluido en el proyecto</h3>
                    </div>
                    <div className="includes-list">
                        <div className="include-item"><span className="check">✔</span><span>Rediseño completo de página web —
                                una sola URL, narrativa clara</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Asistente IA entrenado con
                                información del consultorio</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Chat integrado en la página con
                                escalado a WhatsApp</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Integración con WhatsApp Business
                                API</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Integración con Doctoralia para
                                agendamiento</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Portal del paciente con acceso a
                                expediente básico</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Biblioteca de estudios y archivos
                                médicos</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Sección educativa organizada por
                                diagnóstico</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Automatización de preguntas
                                frecuentes 24/7</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Recordatorios automáticos de cita
                                (WhatsApp)</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Panel administrativo para el equipo
                                del consultorio</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Diseño responsive: celular, tablet y
                                escritorio</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Optimización SEO y velocidad de
                                carga</span></div>
                        <div className="include-item"><span className="check">✔</span><span>Sección de testimonios de
                                pacientes</span></div>
                    </div>
                </div>

                <div className="extras-col">
                    <h3>📋 Servicios adicionales<br />a considerar en etapas futuras</h3>
                    <div className="extra-item"><span className="extra-dot">○</span><span>Programas de rehabilitación
                            personalizados</span></div>
                    <div className="extra-item"><span className="extra-dot">○</span><span>Cuestionarios de autovaloración del
                            paciente</span></div>
                    <div className="extra-item"><span className="extra-dot">○</span><span>Seguimiento avanzado por tipo de
                            patología</span></div>
                    <div className="extra-item"><span className="extra-dot">○</span><span>Programa de fidelización /
                            referidos</span></div>
                    <div className="extra-item"><span className="extra-dot">○</span><span>Campaña de marketing digital
                            integrada</span></div>
                    <div className="extra-item"><span className="extra-dot">○</span><span>Contenido mensual para blog
                            médico</span></div>
                    <div className="extra-item"><span className="extra-dot">○</span><span>Gestión de redes sociales</span></div>
                    <div className="extra-item"><span className="extra-dot">○</span><span>Venta de servicios o tratamientos en
                            línea</span></div>
                </div>
            </div>

            <div className="alcance-footer">
                "El objetivo no es digitalizar por digitalizar. Es crear una herramienta que opere <strong>mientras el
                    Dr. Ruiz está en consulta</strong> — resolviendo dudas, agendando citas y acompañando pacientes de
                forma automática."
            </div>
        </div>
    </section>

    {/* ─── CRONOGRAMA ─── */}
    <section className="cronograma reveal" id="cronograma">
        <div className="container">
            <div style={{"textAlign":"center","maxWidth":"620px","margin":"0 auto 1rem"}}>
                <span className="section-label">Cronograma — Etapa 1, Fase 1</span>
                <h2 className="display">Implementación en<br /><em>6 semanas</em></h2>
                <p className="lead" style={{"margin":"0 auto"}}>Estrategia paso a paso para la <strong>Etapa 1, Fase 1</strong>,
                    asegurando que el Asistente IA esté correctamente entrenado y conectado antes de interactuar.</p>
            </div>
            <div className="timeline">
                <div className="t-item">
                    <div className="t-week"><span>Semana</span><span>1</span></div>
                    <div className="t-body">
                        <h4>🔍 Descubrimiento y Diseño Conversacional</h4>
                        <p>Análisis del flujo de atención actual, mapeo de preguntas frecuentes de pacientes, y diseño
                            de los flujos de conversación y personalidad del Chatbot IA.</p>
                    </div>
                </div>
                <div className="t-item">
                    <div className="t-week"><span>Semana</span><span>2</span></div>
                    <div className="t-body">
                        <h4>🏗️ Desarrollo de Base de Conocimiento</h4>
                        <p>Recopilación y estructuración de la información del consultorio (servicios, costos,
                            procedimientos) para crear el "cerebro" y contexto que alimentará a la IA.</p>
                    </div>
                </div>
                <div className="t-item">
                    <div className="t-week"><span>Semana</span><span>3</span></div>
                    <div className="t-body">
                        <h4>🧠 Entrenamiento del Asistente IA</h4>
                        <p>Implementación del motor de Inteligencia Artificial y entrenamiento intensivo para garantizar
                            precisión médica, limitación de alcance y un tono empático.</p>
                    </div>
                </div>
                <div className="t-item">
                    <div className="t-week"><span>Semana</span><span>4</span></div>
                    <div className="t-body">
                        <h4>⚙️ Integración con WhatsApp y Doctoralia</h4>
                        <p>Conexión del asistente con WhatsApp Business API para atención 24/7 y configuración de la
                            directriz para la canalización de la agenda hacia Doctoralia.</p>
                    </div>
                </div>
                <div className="t-item">
                    <div className="t-week"><span>Semana</span><span>5</span></div>
                    <div className="t-body">
                        <h4>🧪 Pruebas Internas y Ajustes</h4>
                        <p>Simulación de conversaciones reales (testing QA), corrección de respuestas ambiguas, ajustes
                            de seguridad y revisión completa del panel de administración.</p>
                    </div>
                </div>
                <div className="t-item">
                    <div className="t-week"><span>Semana</span><span>6</span></div>
                    <div className="t-body">
                        <h4>🚀 Lanzamiento y Monitoreo (MVP)</h4>
                        <p>Activación del Asistente IA, monitoreo de las primeras interacciones y calibraciones finales
                            de rendimiento del MVP.</p>
                    </div>
                </div>
            </div>
            <p
                style={{"textAlign":"center","fontSize":".85rem","color":"var(--dark)","fontWeight":"800","marginTop":"2rem","letterSpacing":".06em"}}>
                DURACIÓN TOTAL: <span style={{"color":"var(--green)"}}>6 SEMANAS</span> — CHATBOT IA LISTO PARA USAR</p>
        </div>
    </section>

    {/* ─── EVOLUCIÓN ─── */}
    <section className="evolucion reveal">
        <div className="container">
            <div style={{"textAlign":"center","maxWidth":"600px","margin":"0 auto"}}>
                <span className="section-label">Visión a largo plazo</span>
                <h2 className="display">La plataforma crece<br /><em>con el consultorio</em></h2>
                <p className="lead" style={{"margin":"0 auto"}}>Empezamos con las herramientas de mayor impacto inmediato y
                    construimos hacia una plataforma médica completa, paso a paso.</p>
            </div>
            <div className="evolution-steps">
                <div className="evo-step"
                    style={{"textAlign":"left","padding":"1.5rem","background":"var(--white)","borderRadius":"var(--radius-md)","boxShadow":"var(--shadow-card)","border":"1px solid var(--gray-light)"}}>
                    <div className="evo-dot" style={{"margin":"0 auto 1.2rem"}}>🌱</div>
                    <h4 style={{"textAlign":"center","fontSize":"1.05rem","marginBottom":"1rem"}}>Etapa 1</h4>
                    <div style={{"marginBottom":"1rem"}}>
                        <strong style={{"color":"var(--green)","fontSize":".85rem"}}>Fase 1:</strong>
                        <ul
                            style={{"listStyle":"none","paddingLeft":"0","marginTop":".4rem","display":"flex","flexDirection":"column","gap":".3rem"}}>
                            <li
                                style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                                <span
                                    style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Chatbot
                                asistencial IA
                            </li>
                            <li
                                style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                                <span
                                    style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Gestión
                                de citas
                            </li>
                            <li
                                style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                                <span
                                    style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Expediente
                                médico digital (resumen de visita y archivos)
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong style={{"color":"var(--green)","fontSize":".85rem"}}>Fase 2:</strong>
                        <ul
                            style={{"listStyle":"none","paddingLeft":"0","marginTop":".4rem","display":"flex","flexDirection":"column","gap":".3rem"}}>
                            <li
                                style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                                <span
                                    style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Encuestas
                                preconsulta y autovaloración
                            </li>
                            <li
                                style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                                <span
                                    style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Marketing
                                y fidelización inicial (membresía básica)
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="evo-step"
                    style={{"textAlign":"left","padding":"1.5rem","background":"var(--white)","borderRadius":"var(--radius-md)","boxShadow":"var(--shadow-card)","border":"1px solid var(--gray-light)"}}>
                    <div className="evo-dot" style={{"margin":"0 auto 1.2rem"}}>🌿</div>
                    <h4 style={{"textAlign":"center","fontSize":"1.05rem","marginBottom":"1rem"}}>Etapa 2</h4>
                    <ul
                        style={{"listStyle":"none","paddingLeft":"0","marginTop":".4rem","display":"flex","flexDirection":"column","gap":".4rem"}}>
                        <li style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                            <span
                                style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Integración
                            con Doctoralia
                        </li>
                        <li style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                            <span
                                style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Educación
                            médica básica
                        </li>
                        <li style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                            <span
                                style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Programas
                            personalizados de rehabilitación
                        </li>
                        <li style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                            <span
                                style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Ampliación
                            del expediente digital
                        </li>
                    </ul>
                </div>
                <div className="evo-step"
                    style={{"textAlign":"left","padding":"1.5rem","background":"var(--white)","borderRadius":"var(--radius-md)","boxShadow":"var(--shadow-card)","border":"1px solid var(--gray-light)"}}>
                    <div className="evo-dot" style={{"margin":"0 auto 1.2rem"}}>🌳</div>
                    <h4 style={{"textAlign":"center","fontSize":"1.05rem","marginBottom":"1rem"}}>Etapa 3</h4>
                    <ul
                        style={{"listStyle":"none","paddingLeft":"0","marginTop":".4rem","display":"flex","flexDirection":"column","gap":".4rem"}}>
                        <li style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                            <span
                                style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>CRM
                            avanzado con segmentación detallada
                        </li>
                        <li style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                            <span
                                style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Automatización
                            de marketing
                        </li>
                    </ul>
                </div>
                <div className="evo-step"
                    style={{"textAlign":"left","padding":"1.5rem","background":"var(--white)","borderRadius":"var(--radius-md)","boxShadow":"var(--shadow-card)","border":"1px solid var(--gray-light)"}}>
                    <div className="evo-dot" style={{"margin":"0 auto 1.2rem"}}>🍎</div>
                    <h4 style={{"textAlign":"center","fontSize":"1.05rem","marginBottom":"1rem"}}>Etapa 4</h4>
                    <ul
                        style={{"listStyle":"none","paddingLeft":"0","marginTop":".4rem","display":"flex","flexDirection":"column","gap":".4rem"}}>
                        <li style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                            <span
                                style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Gestión
                            de inventario y ventas
                        </li>
                        <li style={{"fontSize":".85rem","color":"var(--text-mid)","paddingLeft":"1rem","position":"relative"}}>
                            <span
                                style={{"position":"absolute","left":"0","color":"var(--green)","fontWeight":"700"}}>•</span>Membresías
                            avanzadas de fidelización
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {/* ─── INTENCIÓN ─── */}
    <section className="intention reveal">
        <div className="intention-inner">
            <h2>Nuestra intención<br />con este proyecto<em> es clara</em></h2>
            <p className="lead">No queremos simplemente construir otra página web. Queremos ser el equipo tecnológico del
                consultorio — el que hace que todo funcione de fondo para que el Dr. Ruiz se enfoque en lo que más
                importa: la salud de sus pacientes.</p>
            <ul className="intention-goals">
                <li>
                    <div className="g-check">✔</div>Reducir el tiempo en tareas repetitivas de atención
                </li>
                <li>
                    <div className="g-check">✔</div>Hacer que más pacientes concreten su primera cita
                </li>
                <li>
                    <div className="g-check">✔</div>Mejorar la experiencia del paciente antes, durante y después
                </li>
                <li>
                    <div className="g-check">✔</div>Construir una base digital sólida para el crecimiento del consultorio
                </li>
                <li>
                    <div className="g-check">✔</div>Ser un aliado a largo plazo, no solo un proveedor de desarrollo
                </li>
            </ul>
        </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="cta-section reveal" id="contacto">
        <div className="cta-inner">
            <span className="section-label" style={{"display":"block","textAlign":"center"}}>Siguiente paso</span>
            <h2>¿Listos para<br /><em>construir esto juntos?</em></h2>
            <p className="lead">Podemos comenzar con una llamada de 30 minutos para revisar la propuesta, resolver dudas y
                definir con qué etapa tiene más sentido arrancar.</p>

            <div className="contact-grid">
                <div className="contact-card">
                    <div className="c-label">Sitio web</div>
                    <div className="c-value"><a href="https://smart-flows.tech" target="_blank">smart-flows.tech</a></div>
                </div>
                <div className="contact-card">
                    <div className="c-label">Correo electrónico</div>
                    <div className="c-value"><a
                            href="mailto:athena@chat-bot.smart-flows.tech">athena@chat-bot.smart-flows.tech</a></div>
                </div>
            </div>

            <div style={{"display":"flex","gap":"1rem","justifyContent":"center","flexWrap":"wrap"}}>
                <a href="https://smart-flows.tech" className="btn btn-outline" target="_blank">Ver más proyectos</a>
            </div>
        </div>
    </section>

    {/* ─── FOOTER ─── */}
    <footer>
        <div className="footer-logos">
            <img src="logo.png" alt="RobotInAI Logo" style={{"height":"64px","width":"auto"}} />
        </div>
        <p>Propuesta de Transformación Digital · Monterrey, México · 2026</p>
        <p style={{"marginTop":".4rem"}}>smart-flows.tech · athena@chat-bot.smart-flows.tech</p>
    </footer>
    </>
  );
}

export default App;
