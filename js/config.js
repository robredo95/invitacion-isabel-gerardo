/* ============================================================
   DATOS DE LA BODA: edita este archivo para cambiar nombres,
   fecha, lugares, padrinos, menú, hoteles, regalos, WhatsApp,
   fotos, canción e invitados con pase personalizado.
   ============================================================ */
const CONFIG = {
  novia: "Isabel", novio: "Gerardo", iniciales: "I&G",
  fecha: "2027-04-17T16:00:00-06:00",   // 4:00 p. m., hora de Honduras
  fechaCorta: "17 · 04 · 2027",
  bienvenida: { es: "Después de tantos momentos juntos, llegó el día de decir que sí. Nos haría muy felices que nos acompañes a celebrarlo.", en: "After so many moments together, the day to say yes has come. It would make us so happy to celebrate it with you." },
  fechaTexto: { es: "Sábado 17 de abril de 2027", en: "Saturday, April 17, 2027" },
  frase: { es: "“Y sobre todas estas cosas, vístanse de amor, que es el vínculo perfecto.” — Colosenses 3:14",
           en: "“And over all these virtues put on love, which binds them all together in perfect unity.” — Colossians 3:14" },
  nombramientos: [
    { rol: { es: "Padres de la novia", en: "Parents of the bride" }, nombres: ["Giovanni González", "Ingrid Morales"] },
    { rol: { es: "Madre del novio", en: "Mother of the groom" }, nombres: ["Esthela Barrera"] }
  ],
  lugares: [
    { tipo: { es: "Ceremonia religiosa", en: "Ceremony" }, icono: "ring", nombre: "Iglesia Fundación Mhotivo", dir: "Sector Calpules, cerca de la UPNFM, San Pedro Sula", hora: "4:00 p. m.", mapa: "https://www.google.com/maps/search/?api=1&query=Fundaci%C3%B3n+Mhotivo+Calpules+San+Pedro+Sula" },
    { tipo: { es: "Recepción", en: "Reception" }, icono: "glass", nombre: "Club Hondureño Árabe · Salón Jordán", dir: "Bulevar Los Próceres, Col. Moderna, San Pedro Sula", hora: "6:00 p. m.", mapa: "https://www.google.com/maps/search/?api=1&query=Club+Hondure%C3%B1o+%C3%81rabe+Bulevar+Los+Pr%C3%B3ceres+San+Pedro+Sula" }
  ],
  itinerario: [
    { icono: "ring", hora: "4:00", t: { es: "Ceremonia", en: "Ceremony" }, d: { es: "Iglesia Fundación Mhotivo", en: "Iglesia Fundación Mhotivo" } },
    { icono: "glass", hora: "6:00", t: { es: "Cóctel de bienvenida", en: "Welcome cocktail" }, d: { es: "Club Hondureño Árabe", en: "Club Hondureño Árabe" } },
    { icono: "plate", hora: "7:30", t: { es: "Cena", en: "Dinner" }, d: { es: "Menú de tres tiempos", en: "Three-course menu" } },
    { icono: "music", hora: "9:00", t: { es: "Primer baile y fiesta", en: "First dance & party" }, d: { es: "¡A bailar!", en: "Let's dance!" } },
    { icono: "cake", hora: "11:30", t: { es: "Pastel y brindis", en: "Cake & toast" }, d: { es: "Con todos ustedes", en: "With all of you" } },
    { icono: "moon", hora: "1:00", t: { es: "Despedida", en: "Farewell" }, d: { es: "Gracias por acompañarnos", en: "Thank you for joining us" } }
  ],
  info: [
    { icono: "clock", t: { es: "Puntualidad", en: "Be on time" }, d: { es: "La ceremonia inicia puntual. Te sugerimos llegar 20 minutos antes.", en: "The ceremony starts on time. Please arrive 20 minutes early." } },
    { icono: "car", t: { es: "Estacionamiento", en: "Parking" }, d: { es: "El salón cuenta con estacionamiento gratuito y servicio de valet.", en: "The venue offers free parking and valet service." } },
    { icono: "sun", t: { es: "Clima", en: "Weather" }, d: { es: "Abril en San Pedro Sula es caluroso: te sugerimos telas ligeras y frescas.", en: "April in San Pedro Sula is hot: light, breathable fabrics are a good idea." } }
  ],
  vestimenta: { titulo: { es: "Formal · Etiqueta", en: "Formal attire" },
    nota: { es: "Te sugerimos tonos tierra y neutros. Te pedimos reservar el color blanco para la novia.", en: "Earthy and neutral tones are welcome. Please reserve white for the bride." },
    colores: ["#4a2c1d", "#9a8170", "#c9b9a3", "#9aa596"] },
  menu: [
    { tiempo: { es: "Entrada", en: "Starter" }, plato: { es: "Crema de ayote con pan artesanal", en: "Squash soup with artisan bread" } },
    { tiempo: { es: "Plato fuerte", en: "Main course" }, plato: { es: "Lomo de res en salsa de vino tinto, puré de papa y vegetales asados", en: "Beef tenderloin in red wine sauce, mashed potatoes and roasted vegetables" } },
    { tiempo: { es: "Postre", en: "Dessert" }, plato: { es: "Tres leches con frutos rojos", en: "Tres leches cake with berries" } },
    { tiempo: { es: "Para la madrugada", en: "Late-night snack" }, plato: { es: "Baleadas", en: "Baleadas (Honduran tortillas)" } }
  ],
  hospedaje: {
    nota: { es: "Para nuestros invitados que vienen de fuera, recomendamos:", en: "For our out-of-town guests, we recommend:" },
    hoteles: [
      { nombre: "Hotel Los Pinos", dist: { es: "A 5 minutos del salón", en: "5 minutes from the venue" }, codigo: "BODAIYG2027", nota: { es: "Tarifa preferencial reservando antes del 17 de marzo", en: "Special rate if booked by March 17" }, reservar: "https://www.example.com", mapa: "https://www.google.com/maps/search/?api=1&query=hotel+cerca+Club+Hondure%C3%B1o+%C3%81rabe+San+Pedro+Sula" },
      { nombre: "Hotel Colonial", dist: { es: "A 10 minutos del salón", en: "10 minutes from the venue" }, codigo: "", nota: "", reservar: "https://www.example.com", mapa: "https://www.google.com/maps/search/?api=1&query=hotel+San+Pedro+Sula" }
    ]
  },
  regalos: {
    nota: { es: "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros:", en: "Your presence is our greatest gift. If you'd like to give us something:" },
    sobres: { es: "El día de la boda habrá una caja en la recepción para que dejes tu sobre.", en: "On the wedding day there will be a box at the reception for envelopes." },
    enlaces: [ { nombre: { es: "Ver lista de regalos", en: "View gift registry" }, url: "https://www.example.com" } ],
    banco: { banco: "Banco de ejemplo", titular: "Isabel", cuenta: "000-000000-0" }
  },
  // Fotos por momento (archivos publicados junto a la invitación). Deja "" para ocultar esa foto.
  fotos: {
    portada: "fotos/portada.jpg",        // abrazo de cuerpo entero
    frase: "fotos/frase.jpg",            // espalda con espalda: fondo de la cuenta regresiva
    itinerario: "fotos/itinerario.jpg",  // el paso de baile con su perrito
    vestimenta: "fotos/vestimenta.jpg",  // él de traje, ella al fondo
    rsvp: "fotos/rsvp.jpg",              // ella lo lleva de la mano
    cierre: "fotos/cierre.jpg",          // retrato de los dos
    bienvenida: ["fotos/historia-1.jpg", "fotos/historia-2.jpg", "fotos/historia-3.jpg"],  // las tres fotos impresas de la bienvenida
    // Galería "Nuestros momentos": hasta 14 fotos; entran alternando desde la izquierda y la derecha
    galeria: ["fotos/portada.jpg", "fotos/historia-2.jpg", "fotos/frase.jpg", "fotos/historia-1.jpg", "fotos/vestimenta.jpg",
              "fotos/itinerario.jpg", "fotos/historia-3.jpg", "fotos/rsvp.jpg", "fotos/cierre.jpg"]
  },
  whatsapp: "50499999999",                     // recibe confirmaciones y sugerencias de canciones (código de país, sin +)
  confirmarAntes: { es: "17 de marzo de 2027", en: "March 17, 2027" },
  hashtag: "#IsabelYGerardo2027",
  grupoFotos: "https://chat.whatsapp.com/",    // enlace de invitación al grupo o álbum de fotos
  invitados: {                                 // enlace personalizado: …#familia-lopez
    "familia-lopez": { nombre: "Familia López Martínez", pases: 4, mesa: 7 },
    "carlos-ana":    { nombre: "Carlos y Ana", pases: 2, mesa: 3 }
  },
  pasesPorDefecto: 2,
  soloAdultos: true,   // true = no se permiten niños (se oculta el campo "Niños" y se muestra el aviso)
  // Secciones opcionales: true = se muestra, false = se oculta (los datos se conservan)
  mostrar: { menu: false, hospedaje: false, listaRegalos: false },
  musica: "musica/cancion.mp3"
};
