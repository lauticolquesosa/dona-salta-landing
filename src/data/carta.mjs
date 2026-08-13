/**
 * La carta completa. Un solo lugar para cambiar precios.
 * precio: número en pesos. detalle: variantes o aclaraciones de ese ítem.
 */

export const cubierto = 2000;

export const carta = [
  {
    id: "empanadas",
    titulo: "Empanadas",
    entrada: "Al horno de barro, con repulgue a mano. Se venden por unidad y por docena, para comer acá o para llevar.",
    grupos: [
      {
        titulo: "Al horno de barro",
        items: [
          { nombre: "Empanada", detalle: "Carne a cuchillo, charqui, queso o pollo", precio: 2000 },
          { nombre: "Docena", precio: 24000 },
        ],
      },
    ],
  },
  {
    id: "regionales",
    titulo: "Platos regionales",
    entrada: "La cocina del norte, de olla y de cuchara. Es lo que más sale en invierno y lo que buscan los que vienen de afuera.",
    grupos: [
      {
        titulo: "De olla",
        items: [
          { nombre: "Locro", precio: 25000 },
          { nombre: "Huaschalocro", precio: 25000 },
          { nombre: "Lentejas", precio: 25000 },
          { nombre: "Carbonada", precio: 25000 },
          { nombre: "Mondongo", precio: 25000 },
        ],
      },
      {
        titulo: "De maíz",
        items: [
          { nombre: "Humitas", precio: 8000 },
          { nombre: "Tamales", precio: 8000 },
        ],
      },
    ],
  },
  {
    id: "casa",
    titulo: "Platos de la casa",
    entrada: "Las cazuelas y la parrilla. El cabrito y el conejo son los platos grandes de la carta.",
    grupos: [
      {
        titulo: "Cazuelas",
        items: [
          { nombre: "Cazuela de conejo", precio: 35000 },
          { nombre: "Cazuela de cabrito", precio: 38000 },
          { nombre: "Cabrito a la provenzal", detalle: "Con papas españolas", precio: 50000 },
        ],
      },
      {
        titulo: "De la parrilla",
        items: [
          { nombre: "Bife de chorizo", precio: 30000 },
          { nombre: "Matambre", precio: 25000 },
          { nombre: "Cuarto de pollo deshuesado", precio: 25000 },
        ],
      },
    ],
  },
  {
    id: "pastas",
    titulo: "Pastas",
    entrada: "Pastas con tuco de la casa. Se pueden pedir solas o con la salsa que quieras.",
    grupos: [
      {
        titulo: "Con tuco",
        items: [
          { nombre: "Tallarines", precio: 23000 },
          { nombre: "Ñoquis", precio: 23000 },
          { nombre: "Ravioles", precio: 23000 },
          { nombre: "Sorrentinos", precio: 28000 },
        ],
      },
      {
        titulo: "Solas y agregados",
        items: [
          { nombre: "Pasta sola", precio: 20000 },
          { nombre: "Sorrentinos solos", precio: 25000 },
          { nombre: "Extra de peceto o pollo", precio: 6000 },
          { nombre: "Extra de salsa blanca o bolognesa", precio: 6000 },
        ],
      },
    ],
  },
  {
    id: "minutas",
    titulo: "Minutas y pizza",
    entrada: "Para el que no quiere plato regional. Milanesas grandes y pizza a la piedra.",
    grupos: [
      {
        titulo: "Minutas",
        items: [
          { nombre: "Milanesa con fritas y huevo", precio: 25000 },
          { nombre: "Suprema con fritas y huevo", precio: 25000 },
          { nombre: "Napolitana con fritas", precio: 28000 },
          { nombre: "Suprema napolitana con fritas", precio: 28000 },
        ],
      },
      {
        titulo: "Pizza a la piedra",
        items: [
          { nombre: "Muzzarella", precio: 30000 },
          { nombre: "Napolitana", precio: 30000 },
          { nombre: "Jamón", precio: 35000 },
        ],
      },
    ],
  },
  {
    id: "guarniciones",
    titulo: "Guarniciones",
    entrada: "Para acompañar la parrilla o las minutas. Todas alcanzan para compartir de a dos.",
    grupos: [
      {
        titulo: "Papas y purés",
        items: [
          { nombre: "Puré", precio: 8500 },
          { nombre: "Papas fritas", precio: 8500 },
          { nombre: "Papas fritas a la provenzal", precio: 10000 },
        ],
      },
      {
        titulo: "Verduras",
        items: [
          { nombre: "Ensalada mixta", precio: 8500 },
          { nombre: "Ensalada mixta especial", precio: 10000 },
          { nombre: "Panaché de verduras", precio: 8500 },
        ],
      },
    ],
  },
  {
    id: "postres",
    titulo: "Postres",
    entrada: "El quesillo con miel y el turrón salteño son los postres del norte. También hay helados y flan.",
    grupos: [
      {
        titulo: "Regionales",
        items: [
          { nombre: "Quesillo con miel", precio: 6000 },
          { nombre: "Quesillo con cuaresmillo o con cayote y nueces", precio: 8500 },
          { nombre: "Quesillo mixto completo", precio: 12000 },
          { nombre: "Cayote o cuaresmillo", precio: 6000 },
          { nombre: "Turrón salteño", precio: 6500 },
          { nombre: "Postre Doña Salta", precio: 9500 },
        ],
      },
      {
        titulo: "Dulces y helados",
        items: [
          { nombre: "Helado", detalle: "Dos bochas 7.000, tres bochas 10.000", precio: 5000 },
          { nombre: "Almendrado, suizo o escocés", precio: 8000 },
          { nombre: "Copa Don Pedro", precio: 11000 },
          { nombre: "Flan o budín de pan", precio: 6500 },
          { nombre: "Ensalada de frutas", precio: 6500 },
          { nombre: "Extra de dulce o crema", precio: 3500 },
        ],
      },
    ],
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    entrada: "Carta corta de vinos salteños, con Torrontés y Malbec de altura. También hay cerveza Salta tirada en jarra.",
    grupos: [
      {
        titulo: "Sin alcohol",
        items: [
          { nombre: "Gaseosa de 1 litro", precio: 11000 },
          { nombre: "Gaseosa de 330 cc", precio: 4500 },
          { nombre: "Schweppes lata de 500 cc", precio: 5500 },
          { nombre: "Agua mineral con gas o sin gas", precio: 5000 },
          { nombre: "Agua con gas limonada de 1 litro", detalle: "De 500 cc, 5.500", precio: 10000 },
          { nombre: "Agua saborizada de 500 cc", precio: 5500 },
        ],
      },
      {
        titulo: "Cervezas y tragos",
        items: [
          { nombre: "Cerveza Salta blanca, negra o roja", detalle: "De 500 cc, 8.000", precio: 12000 },
          { nombre: "Heineken de 1 litro", detalle: "De 500 cc, 10.000", precio: 15000 },
          { nombre: "Fernet con coca", precio: 12000 },
          { nombre: "Fernet solo", precio: 7500 },
          { nombre: "Sangría en jarra de medio litro", detalle: "De 1 litro, 15.000", precio: 9000 },
        ],
      },
      {
        titulo: "Vino de la casa",
        items: [
          { nombre: "Copa", precio: 4500 },
          { nombre: "Jarra de un cuarto", precio: 6000 },
          { nombre: "Jarra de medio litro", precio: 8000 },
          { nombre: "Jarra de 1 litro", precio: 12000 },
        ],
      },
      {
        titulo: "Vinos salteños",
        items: [
          { nombre: "Origen Regional tinto", precio: 14000 },
          { nombre: "Origen Malbec o Torrontés", precio: 15000 },
          { nombre: "Puna Helios Malbec", precio: 16000 },
          { nombre: "Etchart Malbec de Cafayate o Privado Torrontés", precio: 17000 },
          { nombre: "Puna 2600 Torrontés o Torrontés dulce", precio: 18000 },
          { nombre: "Domingo Hnos. Expresión de Altura", detalle: "Tinto, blanco o dulce", precio: 20000 },
          { nombre: "Occidente Malbec", precio: 20000 },
          { nombre: "Familia Gascón Malbec", precio: 20000 },
          { nombre: "Nani Malbec, Tannat, Cabernet Sauvignon o Torrontés", detalle: "Botella de 3/8, 15.000", precio: 22000 },
          { nombre: "Don David Malbec, Cabernet Sauvignon o Torrontés", precio: 22000 },
          { nombre: "Vasija Secreta Malbec o Cabernet", precio: 15000 },
          { nombre: "Mayuco Malbec o Mayuco Torrontés", precio: 30000 },
          { nombre: "Puna 2600 Malbec Reserva", detalle: "Malbec 25.000, botella de 3/8 15.000", precio: 33000 },
          { nombre: "Finca Las Nubes Malbec", detalle: "Torrontés 23.000", precio: 33000 },
          { nombre: "Domingo Molina Malbec o Cabernet Sauvignon", precio: 43000 },
        ],
      },
      {
        titulo: "Vinos mendocinos y espumantes",
        items: [
          { nombre: "San Felipe", detalle: "Botella de 3/8, 10.000", precio: 15000 },
          { nombre: "López Malbec", detalle: "Botella de 3/8, 12.000", precio: 18000 },
          { nombre: "Dilema dulce", detalle: "Dilema espumante 16.000", precio: 13000 },
          { nombre: "Chandon Extra Brut", precio: 38000 },
        ],
      },
    ],
  },
];
