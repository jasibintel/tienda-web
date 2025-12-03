// Script para importar libros a Firestore
const { db, admin } = require('./admin');

// Categorías disponibles
const categories = [
    'devocionales',
    'maestros',
    'familias',
    'jóvenes',
    'predicaciones',
    'niños',
    'teología básica',
    'fundamentos de la fe',
    'vida cristiana'
];

// Audiencias disponibles
const audiences = ['adultos', 'jóvenes', 'niños', 'familias', 'todos'];

// Generar precio aleatorio entre min y max
function randomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Libros a importar
const books = [
    {
        title: 'El Poder de la Oración Matutina',
        subtitle: 'Transforma tu día comenzando con Dios',
        author: 'Dr. Carlos Mendez',
        description: `La oración matutina es una de las disciplinas espirituales más poderosas que un creyente puede desarrollar. Este libro te guiará paso a paso para establecer una rutina de comunión con Dios que transformará completamente tu perspectiva diaria.

A través de páginas llenas de sabiduría bíblica y experiencias prácticas, descubrirás cómo la oración temprano en la mañana puede cambiar el curso de tu día. No se trata simplemente de una rutina religiosa, sino de una conexión genuina con el Creador que renueva tu mente y fortalece tu espíritu.

Cada capítulo incluye guías prácticas, versículos bíblicos relevantes y testimonios de personas que han experimentado el poder transformador de comenzar el día en la presencia de Dios. Aprenderás técnicas específicas para superar las distracciones y mantener tu enfoque en lo que realmente importa.

Este recurso es ideal tanto para quienes están comenzando su caminar con Cristo como para aquellos que desean profundizar en su vida de oración. Las enseñanzas son aplicables a cualquier etapa de la vida y se adaptan a diferentes horarios y circunstancias personales.`,
        category: 'devocionales',
        audience: 'adultos',
        isFree: true,
        featured: true,
        price: 0
    },
    {
        title: 'Fundamentos de la Fe Cristiana',
        subtitle: 'Una guía completa para nuevos creyentes',
        author: 'Pastor Juan Rodriguez',
        description: `Este libro es una introducción completa y accesible a los fundamentos de la fe cristiana. Diseñado especialmente para nuevos creyentes, pero también valioso para quienes desean refrescar sus conocimientos básicos, cubre los temas esenciales que todo cristiano debe conocer.

Desde la naturaleza de Dios hasta la importancia de la iglesia local, cada tema es explicado de manera clara y bíblica. El autor utiliza un lenguaje sencillo sin sacrificar la profundidad teológica, haciendo que conceptos complejos sean comprensibles para todos.

Los capítulos están organizados de manera progresiva, construyendo sobre conocimientos previos y creando una base sólida para el crecimiento espiritual. Incluye preguntas de reflexión al final de cada sección para ayudar a los lectores a aplicar lo aprendido.

Este recurso ha sido utilizado en numerosas iglesias como material de discipulado y ha ayudado a cientos de creyentes a establecer una base firme en su fe. Es un libro de referencia que los lectores volverán a consultar una y otra vez.`,
        category: 'fundamentos de la fe',
        audience: 'todos',
        isFree: false,
        featured: true,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Liderazgo Espiritual en el Hogar',
        subtitle: 'Cómo guiar a tu familia hacia Dios',
        author: 'Lic. María González',
        description: `El liderazgo espiritual en el hogar es una responsabilidad sagrada que Dios ha encomendado a los padres. Este libro proporciona herramientas prácticas y principios bíblicos para ayudar a las familias a crecer juntas en la fe.

A través de historias reales y ejemplos prácticos, descubrirás cómo crear un ambiente espiritual saludable en tu hogar. Aprenderás a establecer tiempos de adoración familiar, cómo enseñar la Palabra de Dios a tus hijos de manera apropiada para su edad, y cómo manejar los desafíos comunes que enfrentan las familias cristianas.

El autor aborda temas como la comunicación efectiva, la resolución de conflictos desde una perspectiva bíblica, y cómo modelar una vida de fe auténtica. Cada capítulo incluye actividades prácticas que puedes implementar inmediatamente con tu familia.

Este recurso es especialmente valioso para padres que desean dejar un legado espiritual duradero. Las enseñanzas son aplicables a familias de todos los tamaños y en diferentes etapas de la vida, desde familias jóvenes hasta abuelos que desean influir en sus nietos.`,
        category: 'familias',
        audience: 'familias',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Jóvenes con Propósito',
        subtitle: 'Viviendo para Cristo en una generación desafiante',
        author: 'Pastor David Martínez',
        description: `Ser joven cristiano en el mundo actual presenta desafíos únicos. Este libro está diseñado específicamente para ayudar a los jóvenes a navegar su fe en medio de las presiones sociales, las redes sociales, y las expectativas del mundo.

El autor, quien ha trabajado con jóvenes por más de dos décadas, comparte principios bíblicos atemporales aplicados al contexto moderno. Aborda temas como la identidad en Cristo, la pureza sexual, las relaciones saludables, y cómo tomar decisiones sabias que honren a Dios.

Cada capítulo está escrito en un lenguaje relevante y accesible, con ejemplos de la vida real que los jóvenes pueden relacionar. Incluye secciones de reflexión personal y preguntas para discusión en grupos pequeños.

Este libro ha sido un recurso transformador para muchos jóvenes que buscan vivir su fe de manera auténtica. Es ideal para estudios bíblicos juveniles, grupos de jóvenes, y lectura personal.`,
        category: 'jóvenes',
        audience: 'jóvenes',
        isFree: true,
        featured: false,
        price: 0
    },
    {
        title: 'Enseñando con Excelencia',
        subtitle: 'Principios bíblicos para maestros de escuela dominical',
        author: 'Prof. Ana López',
        description: `La enseñanza es un don espiritual que requiere preparación, pasión y sabiduría. Este libro está diseñado para equipar a maestros de escuela dominical y líderes educativos con herramientas prácticas y principios bíblicos para enseñar con excelencia.

Aprenderás metodologías de enseñanza efectivas, cómo preparar lecciones que conecten con diferentes estilos de aprendizaje, y técnicas para mantener la atención y el interés de tus estudiantes. El libro cubre desde la preparación de la lección hasta la evaluación del aprendizaje.

El autor comparte años de experiencia en el aula, incluyendo ejemplos de lecciones exitosas y estrategias para manejar situaciones desafiantes. También aborda la importancia de la oración en la enseñanza y cómo depender del Espíritu Santo para guiar tus clases.

Este recurso es esencial para cualquier persona involucrada en la educación cristiana, ya sea enseñando a niños, jóvenes o adultos. Incluye recursos descargables y plantillas que puedes usar en tu ministerio.`,
        category: 'maestros',
        audience: 'adultos',
        isFree: false,
        featured: true,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Historias Bíblicas para Niños',
        subtitle: 'Aventuras de fe para los más pequeños',
        author: 'Sra. Carmen Ruiz',
        description: `Este hermoso libro presenta las historias más importantes de la Biblia de una manera que los niños pueden entender y disfrutar. Cada historia está escrita con lenguaje simple, ilustraciones descriptivas y lecciones prácticas que los niños pueden aplicar.

Desde la creación del mundo hasta las aventuras de los apóstoles, este libro recorre los eventos más significativos de la Biblia de manera cronológica y accesible. Cada historia incluye preguntas de reflexión apropiadas para la edad y actividades que ayudan a los niños a recordar lo aprendido.

El diseño del libro es atractivo y colorido, manteniendo la atención de los niños mientras aprenden verdades eternas. Las historias están adaptadas para ser leídas en voz alta por padres o maestros, o para que los niños mayores las lean por sí mismos.

Este recurso es perfecto para la hora de cuentos antes de dormir, clases de escuela dominical, o lectura familiar. Ha sido diseñado para crear momentos memorables de aprendizaje espiritual que los niños recordarán por años.`,
        category: 'niños',
        audience: 'niños',
        isFree: true,
        featured: false,
        price: 0
    },
    {
        title: 'Predicando con Poder',
        subtitle: 'Cómo comunicar el mensaje de Dios efectivamente',
        author: 'Dr. Roberto Silva',
        description: `La predicación es un arte y una ciencia que requiere tanto preparación espiritual como técnica. Este libro guía a pastores y predicadores a través del proceso completo de preparar y entregar mensajes que transformen vidas.

Aprenderás cómo estudiar la Biblia de manera efectiva, cómo estructurar un sermón que sea claro y memorable, y técnicas de comunicación que conecten con diferentes audiencias. El autor comparte principios probados a lo largo de décadas de ministerio.

El libro incluye ejemplos de sermones completos, análisis de diferentes estilos de predicación, y consejos prácticos sobre cómo usar ilustraciones, historias y aplicaciones prácticas. También aborda temas como el manejo de los nervios y cómo depender del Espíritu Santo en el púlpito.

Este recurso es valioso tanto para predicadores experimentados que desean refrescar sus habilidades como para aquellos que están comenzando en el ministerio. Incluye ejercicios prácticos y oportunidades de auto-evaluación.`,
        category: 'predicaciones',
        audience: 'adultos',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Teología Básica para Todos',
        subtitle: 'Entendiendo las doctrinas fundamentales del cristianismo',
        author: 'Dr. Luis Fernández',
        description: `La teología no es solo para académicos o pastores; es para todo creyente que desea conocer mejor a Dios. Este libro presenta las doctrinas fundamentales del cristianismo de manera accesible y práctica, sin sacrificar la precisión teológica.

Cada capítulo explora una doctrina importante, desde la Trinidad hasta la escatología, explicando no solo qué creemos sino por qué lo creemos. El autor utiliza analogías y ejemplos de la vida cotidiana para hacer que conceptos complejos sean comprensibles.

El libro está diseñado para ser estudiado individualmente o en grupos, con preguntas de discusión al final de cada capítulo. Incluye referencias bíblicas extensas y recomendaciones para estudio adicional.

Este recurso ha ayudado a miles de creyentes a desarrollar una comprensión más profunda de su fe. Es especialmente útil para líderes de grupos pequeños, maestros de escuela dominical, y cualquier persona que desee crecer en su conocimiento de Dios.`,
        category: 'teología básica',
        audience: 'adultos',
        isFree: false,
        featured: true,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Vida Cristiana Práctica',
        subtitle: 'Aplicando la fe en el día a día',
        author: 'Pastora Elena Vargas',
        description: `La fe cristiana no es solo una creencia intelectual; es una forma de vida que debe manifestarse en nuestras acciones diarias. Este libro explora cómo vivir como cristiano en el trabajo, en el hogar, en las relaciones, y en todas las áreas de la vida.

A través de principios bíblicos y ejemplos prácticos, descubrirás cómo tomar decisiones que honren a Dios, cómo manejar el estrés y las dificultades desde una perspectiva de fe, y cómo ser una luz en tu comunidad. El libro aborda temas como la integridad, la mayordomía, y el servicio a otros.

Cada capítulo incluye ejercicios prácticos y desafíos que te ayudarán a aplicar lo aprendido. El autor comparte historias reales de personas que han experimentado transformación al vivir su fe de manera práctica.

Este recurso es ideal para creyentes que desean que su fe haga una diferencia real en su vida cotidiana. Es especialmente útil para estudios bíblicos en grupos pequeños y discipulado personal.`,
        category: 'vida cristiana',
        audience: 'adultos',
        isFree: true,
        featured: false,
        price: 0
    },
    {
        title: 'La Familia que Ora Junta',
        subtitle: 'Construyendo unidad espiritual en el hogar',
        author: 'Lic. Carlos y María Herrera',
        description: `La oración familiar es una de las prácticas más poderosas para fortalecer los lazos espirituales en el hogar. Este libro guía a las familias a través del proceso de establecer y mantener una vida de oración juntos.

Los autores, una pareja con más de veinte años de experiencia en ministerio familiar, comparten principios prácticos y estrategias probadas para hacer de la oración una parte natural de la vida familiar. Aprenderás cómo adaptar los tiempos de oración a diferentes edades y personalidades.

El libro incluye modelos de oración para diferentes situaciones, desde tiempos de celebración hasta momentos de crisis. También aborda cómo manejar las resistencias naturales y cómo hacer que la oración sea significativa para todos los miembros de la familia.

Este recurso ha transformado la vida espiritual de cientos de familias. Es especialmente valioso para padres que desean crear un legado de fe para sus hijos y para familias que están comenzando su caminar juntos con Cristo.`,
        category: 'familias',
        audience: 'familias',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Identidad en Cristo',
        subtitle: 'Descubriendo quién eres en Él',
        author: 'Pastor Miguel Torres',
        description: `Muchos jóvenes luchan con problemas de identidad, autoestima y propósito. Este libro ayuda a los jóvenes a encontrar su verdadera identidad en Cristo, no en las opiniones de otros, las redes sociales, o los logros personales.

A través de un estudio profundo de las Escrituras y ejemplos relevantes, los lectores descubrirán su valor inherente como hijos de Dios. El libro aborda temas como la comparación, la presión social, y cómo desarrollar una autoimagen saludable basada en la verdad bíblica.

Cada capítulo incluye ejercicios de reflexión personal y actividades prácticas que ayudan a los jóvenes a aplicar lo aprendido. El autor utiliza un lenguaje directo y honesto que resuena con las experiencias de los jóvenes de hoy.

Este recurso ha sido transformador para muchos jóvenes que han luchado con su identidad. Es ideal para estudios bíblicos juveniles, retiros, y lectura personal.`,
        category: 'jóvenes',
        audience: 'jóvenes',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'El Maestro Fiel',
        subtitle: 'Principios de enseñanza bíblica',
        author: 'Prof. Jorge Mendoza',
        description: `La enseñanza bíblica es un llamado sagrado que requiere preparación, dedicación y dependencia del Espíritu Santo. Este libro equipa a maestros con los fundamentos necesarios para enseñar la Palabra de Dios con fidelidad y efectividad.

Aprenderás cómo preparar lecciones que sean bíblicamente sólidas y pedagógicamente efectivas. El libro cubre desde la exégesis básica hasta técnicas de enseñanza que mantienen a los estudiantes comprometidos. Incluye ejemplos prácticos de diferentes tipos de lecciones.

El autor, con décadas de experiencia en educación cristiana, comparte errores comunes que los maestros deben evitar y mejores prácticas que han probado ser efectivas. También aborda la importancia del carácter del maestro y cómo modelar una vida de fe.

Este recurso es esencial para cualquier persona involucrada en la enseñanza bíblica, ya sea en escuela dominical, grupos pequeños, o discipulado. Incluye recursos adicionales y plantillas descargables.`,
        category: 'maestros',
        audience: 'adultos',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Aventuras con Jesús',
        subtitle: 'Historias bíblicas para niños curiosos',
        author: 'Sra. Patricia Morales',
        description: `Este libro lleva a los niños en un viaje emocionante a través de las historias más importantes de la Biblia. Cada historia está diseñada para capturar la imaginación de los niños mientras les enseña verdades eternas de manera memorable.

Las historias están escritas con lenguaje simple y vívido, haciendo que los personajes bíblicos cobren vida. Cada relato incluye lecciones prácticas que los niños pueden entender y aplicar, ayudándoles a ver cómo Dios trabaja en la vida de las personas.

El libro está bellamente ilustrado y diseñado para mantener la atención de los niños. Incluye actividades interactivas, preguntas de reflexión apropiadas para la edad, y oportunidades para que los niños expresen lo que han aprendido.

Este recurso es perfecto para la lectura en familia, clases de escuela dominical, o para que los niños mayores lean independientemente. Ha sido diseñado para crear amor por la Palabra de Dios desde una edad temprana.`,
        category: 'niños',
        audience: 'niños',
        isFree: true,
        featured: false,
        price: 0
    },
    {
        title: 'El Arte de la Predicación Expositiva',
        subtitle: 'Comunicando la verdad bíblica con claridad',
        author: 'Dr. Fernando Castro',
        description: `La predicación expositiva es un método que permite que el texto bíblico hable por sí mismo, guiando tanto al predicador como a la congregación a una comprensión más profunda de la Palabra de Dios. Este libro enseña cómo preparar y entregar sermones expositivos efectivos.

Aprenderás el proceso completo, desde la selección del texto hasta la aplicación práctica. El libro incluye técnicas de interpretación bíblica, métodos de organización del material, y estrategias para hacer que el mensaje sea relevante y aplicable a la vida moderna.

El autor comparte ejemplos de sermones completos, mostrando cómo diferentes textos pueden ser abordados de manera expositiva. También aborda cómo manejar diferentes tipos de literatura bíblica, desde narrativa hasta poesía y profecía.

Este recurso es valioso para predicadores de todos los niveles de experiencia. Es especialmente útil para aquellos que desean profundizar en su estudio bíblico y mejorar su capacidad de comunicar la verdad de manera clara y poderosa.`,
        category: 'predicaciones',
        audience: 'adultos',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Devocional Diario: Un Año con Dios',
        subtitle: '365 días de reflexión y crecimiento espiritual',
        author: 'Equipo Editorial De Gloria en Gloria',
        description: `Este devocional de un año está diseñado para acompañarte en tu caminar diario con Dios. Cada día incluye un versículo bíblico, una reflexión práctica, y una oración que te ayudará a aplicar la Palabra de Dios a tu vida.

Los temas cubren una amplia gama de aspectos de la vida cristiana, desde la adoración y la oración hasta las relaciones y el servicio. Cada devoción está escrita para ser leída en pocos minutos, pero con suficiente profundidad para provocar reflexión significativa.

El formato es accesible y fácil de seguir, haciendo que sea simple mantener una rutina diaria de devoción. Las reflexiones están conectadas con la vida real y abordan desafíos comunes que enfrentan los creyentes.

Este recurso ha ayudado a miles de personas a desarrollar una disciplina consistente de tiempo con Dios. Es ideal tanto para creyentes nuevos como para aquellos que han caminado con Cristo por años.`,
        category: 'devocionales',
        audience: 'adultos',
        isFree: false,
        featured: true,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Los Fundamentos de la Salvación',
        subtitle: 'Entendiendo el plan de redención de Dios',
        author: 'Dr. Ricardo Morales',
        description: `La salvación es el tema central del cristianismo, y entender sus fundamentos es esencial para todo creyente. Este libro explora de manera profunda pero accesible los aspectos clave de la salvación: la necesidad, el plan, y la aplicación.

A través de un estudio cuidadoso de las Escrituras, descubrirás cómo funciona la gracia de Dios, el papel de la fe, y la importancia de la obra de Cristo en la cruz. El autor explica conceptos teológicos complejos de manera clara, usando ejemplos y analogías que facilitan la comprensión.

El libro aborda preguntas comunes sobre la salvación, como la seguridad eterna, la predestinación, y cómo la salvación se relaciona con las buenas obras. Cada tema está respaldado por referencias bíblicas extensas y explicaciones cuidadosas.

Este recurso es esencial para cualquier persona que desee tener una comprensión sólida de la base de su fe. Es especialmente útil para nuevos creyentes, líderes en formación, y aquellos que desean poder explicar el evangelio a otros con claridad.`,
        category: 'fundamentos de la fe',
        audience: 'todos',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Creciendo en Gracia',
        subtitle: 'El proceso de santificación en la vida cristiana',
        author: 'Pastora Laura Sánchez',
        description: `La santificación es el proceso continuo de crecer en semejanza a Cristo. Este libro explora cómo los creyentes pueden cooperar con el Espíritu Santo para experimentar transformación genuina en sus vidas.

A través de principios bíblicos y ejemplos prácticos, descubrirás cómo identificar áreas que necesitan crecimiento, cómo superar patrones de pecado, y cómo desarrollar el fruto del Espíritu. El libro aborda tanto el aspecto divino como el humano de la santificación.

Cada capítulo incluye ejercicios de reflexión personal y estrategias prácticas para el crecimiento espiritual. El autor comparte su propia jornada de santificación, haciendo que el libro sea tanto inspirador como práctico.

Este recurso es valioso para creyentes en cualquier etapa de su caminar con Cristo. Es especialmente útil para aquellos que se sienten estancados en su crecimiento espiritual o que desean profundizar en su relación con Dios.`,
        category: 'vida cristiana',
        audience: 'adultos',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Jóvenes Valientes',
        subtitle: 'Tomando decisiones sabias en un mundo confuso',
        author: 'Pastor Andrés Ramírez',
        description: `Los jóvenes de hoy enfrentan decisiones complejas sobre relaciones, carrera, valores y propósito. Este libro proporciona principios bíblicos y sabiduría práctica para ayudar a los jóvenes a tomar decisiones que honren a Dios y los lleven a una vida plena.

A través de estudios bíblicos relevantes y ejemplos de la vida real, los lectores aprenderán a discernir la voluntad de Dios, a evaluar opciones desde una perspectiva bíblica, y a tener el valor de tomar decisiones impopulares cuando sea necesario.

El libro aborda temas específicos que los jóvenes enfrentan, como la presión de grupo, las relaciones románticas, las decisiones académicas y profesionales, y cómo usar los dones y talentos para la gloria de Dios. Cada capítulo incluye preguntas de reflexión y desafíos prácticos.

Este recurso ha sido transformador para muchos jóvenes que buscan dirección en sus vidas. Es ideal para estudios bíblicos juveniles, retiros, y lectura personal.`,
        category: 'jóvenes',
        audience: 'jóvenes',
        isFree: true,
        featured: false,
        price: 0
    },
    {
        title: 'La Palabra Viva',
        subtitle: 'Estudios bíblicos para grupos pequeños',
        author: 'Pastor Daniel Herrera',
        description: `Este libro contiene una colección de estudios bíblicos diseñados específicamente para grupos pequeños. Cada estudio está estructurado para facilitar la discusión, promover la aplicación práctica, y fomentar el crecimiento espiritual en comunidad.

Los estudios cubren una variedad de temas y libros bíblicos, desde estudios temáticos hasta estudios de libros completos. Cada sesión incluye preguntas de apertura, estudio del texto bíblico, preguntas de discusión, y aplicación práctica.

El formato es flexible, permitiendo que los grupos adapten los estudios a sus necesidades específicas. Los estudios están diseñados para durar aproximadamente una hora, pero pueden ser extendidos o acortados según sea necesario.

Este recurso ha sido utilizado exitosamente en cientos de grupos pequeños en diferentes contextos. Es ideal para líderes de grupos pequeños, pastores que desean proporcionar material de estudio, y grupos que desean crecer juntos en su comprensión de la Palabra de Dios.`,
        category: 'devocionales',
        audience: 'adultos',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Construyendo Matrimonios Sólidos',
        subtitle: 'Principios bíblicos para una relación duradera',
        author: 'Dr. Roberto y Dra. Carmen Vega',
        description: `El matrimonio es una de las relaciones más importantes que Dios ha diseñado, y requiere intencionalidad y sabiduría para prosperar. Este libro proporciona principios bíblicos y herramientas prácticas para construir un matrimonio que honre a Dios y traiga gozo a ambas partes.

Los autores, una pareja con décadas de experiencia en consejería matrimonial, abordan temas esenciales como la comunicación efectiva, la resolución de conflictos, la intimidad emocional y física, y cómo mantener el romance a lo largo de los años.

Cada capítulo incluye ejercicios prácticos que las parejas pueden hacer juntas, preguntas de reflexión, y estrategias para aplicar los principios aprendidos. El libro está escrito desde una perspectiva bíblica sólida pero con sensibilidad a las realidades del matrimonio moderno.

Este recurso ha ayudado a cientos de parejas a fortalecer su relación. Es ideal para parejas recién casadas, parejas que enfrentan desafíos, y parejas que desean profundizar en su relación.`,
        category: 'familias',
        audience: 'familias',
        isFree: false,
        featured: true,
        price: randomPrice(15000, 45000)
    },
    {
        title: 'Pequeños Héroes de la Fe',
        subtitle: 'Historias de valentía para niños',
        author: 'Sra. Isabel Martínez',
        description: `Este libro presenta a los niños historias inspiradoras de personajes bíblicos que mostraron valentía y fe. Desde David enfrentando a Goliat hasta Daniel en el foso de los leones, cada historia está adaptada para capturar la imaginación de los niños mientras les enseña lecciones importantes.

Las historias están escritas con lenguaje simple y emocionante, haciendo que los niños se sientan parte de la aventura. Cada relato incluye lecciones sobre el coraje, la fe, la obediencia, y cómo Dios usa a personas comunes para hacer cosas extraordinarias.

El libro está bellamente diseñado con ilustraciones coloridas que complementan las historias. Incluye preguntas de reflexión apropiadas para la edad y actividades que ayudan a los niños a recordar y aplicar lo que han aprendido.

Este recurso es perfecto para la lectura en familia, especialmente antes de dormir, o para clases de escuela dominical. Ha sido diseñado para inspirar a los niños a ser valientes en su fe y a confiar en Dios en todas las circunstancias.`,
        category: 'niños',
        audience: 'niños',
        isFree: false,
        featured: false,
        price: randomPrice(15000, 45000)
    }
];

async function importBooks() {
    try {
        console.log('🔥 Iniciando importación de libros a Firestore...\n');

        // Verificar conexión
        console.log('📡 Verificando conexión con Firestore...');
        await db.collection('test').doc('connection').set({ test: true });
        await db.collection('test').doc('connection').delete();
        console.log('✅ Conexión con Firestore establecida\n');

        // Asegurar que la colección books existe
        const booksRef = db.collection('books');
        console.log('📚 Preparando colección "books"...\n');

        // Importar cada libro
        const results = [];
        for (let i = 0; i < books.length; i++) {
            const book = books[i];
            const bookData = {
                ...book,
                formats: ['PDF', 'EPUB'],
                status: 'published',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                coverUrl: 'https://placehold.co/400x600?text=Portada',
                isActive: true
            };

            try {
                const docRef = await booksRef.add(bookData);
                results.push({
                    id: docRef.id,
                    title: book.title,
                    category: book.category,
                    isFree: book.isFree,
                    price: book.price
                });
                console.log(`✅ [${i + 1}/${books.length}] "${book.title}" importado (ID: ${docRef.id})`);
            } catch (error) {
                console.error(`❌ Error al importar "${book.title}":`, error.message);
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('📊 RESUMEN DE IMPORTACIÓN');
        console.log('='.repeat(60));
        console.log(`\n✅ Total de libros importados: ${results.length}/${books.length}`);
        console.log(`📚 Colección: books`);
        console.log(`\n📋 LISTA DE LIBROS CREADOS:\n`);

        results.forEach((book, index) => {
            const precio = book.isFree ? 'GRATIS' : `$${book.price.toLocaleString('es-CO')} COP`;
            const destacado = books[index].featured ? ' ⭐ DESTACADO' : '';
            console.log(`${index + 1}. [${book.id}]`);
            console.log(`   Título: ${book.title}`);
            console.log(`   Categoría: ${book.category}`);
            console.log(`   Precio: ${precio}${destacado}`);
            console.log('');
        });

        // Estadísticas
        const gratis = results.filter(b => b.isFree).length;
        const pagos = results.filter(b => !b.isFree).length;
        const destacados = books.filter(b => b.featured).length;

        console.log('📊 ESTADÍSTICAS:');
        console.log(`   - Libros gratuitos: ${gratis}`);
        console.log(`   - Libros de pago: ${pagos}`);
        console.log(`   - Libros destacados: ${destacados}`);
        console.log(`\n✅ Importación completada exitosamente!`);
        console.log('✅ La página /libreria puede ahora leer estos libros desde Firestore\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error durante la importación:', error);
        process.exit(1);
    }
}

// Ejecutar importación
importBooks();

