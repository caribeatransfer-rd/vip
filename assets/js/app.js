/* ============================================================
   Lógica de la web: idioma, precios y reserva por WhatsApp
   ============================================================ */
(function () {
  const C = window.CONFIG;

  const T = {
    es: {
      brand: "Caribe Transfer RD",
      topbar_route: "Aeropuerto · Hotel · Punta Cana & RD",
      topbar_clock: "Hora local RD",
      nav_home: "Inicio",
      nav_services: "Servicios",
      nav_fleet: "Flota",
      nav_zones: "Zonas",
      nav_rates: "Tarifas",
      nav_how: "Cómo funciona",
      nav_faq: "Preguntas",
      nav_book: "Reservar",
      hero_eyebrow: "Traslados privados 24/7",
      hero_title: "Tu llegada empieza sin estrés",
      hero_lead: "Te recogemos donde estés —aeropuerto, hotel, Airbnb o casa particular— y te llevamos a tu destino con conductor profesional, vehículo con aire acondicionado y precio cerrado.",
      hero_check1: "Sin sorpresas: precio confirmado antes de viajar",
      hero_check2: "Seguimiento de vuelo incluido",
      hero_check3: "Pago al conductor o por adelantado",
      hero_whatsapp: "Escríbenos por WhatsApp",
      hero_photo_caption: "Punta Cana · Bávaro · Cap Cana",
      badge1: "Recogidas nocturnas",
      badge2: "Choferes verificados",
      badge3: "Atención bilingüe",
      form_title: "Reserva tu traslado",
      form_kicker: "Recogida → Destino",
      label_direction: "Tipo de traslado",
      dir_other: "Otro",
      label_pickup_q: "¿Dónde te recogemos?",
      pickup_placeholder: "Aeropuerto, hotel, Airbnb, dirección…",
      label_drop_q: "¿A qué hotel o dirección vas?",
      drop_placeholder: "Hotel, Airbnb, aeropuerto, dirección…",
      label_flight_full: "Número de vuelo y aerolínea",
      flight_placeholder: "Ej. AA1234 · American Airlines",
      label_date: "Fecha",
      label_time: "Hora",
      label_pax: "Pasajeros",
      label_luggage: "Piezas de equipaje",
      label_vehicle: "Tipo de vehículo",
      label_pay: "Forma de pago",
      pay_cash: "Efectivo (USD o RD$)",
      pay_card: "Tarjeta",
      pay_transfer: "Transferencia / depósito",
      pay_hotel: "Pago en el hotel",
      pay_hint: "El pago en línea (PayPal / TPV) se activará próximamente. Hoy confirmamos por WhatsApp.",
      label_phone: "Teléfono / WhatsApp",
      label_minors: "Menores (0–12 años)",
      label_childseats: "Sillas para niños / bebé",
      label_name: "Nombre",
      label_notes: "Notas (opcional)",
      notes_short: "Silla para bebé (edad)…",
      label_flight: "Número de vuelo",
      label_adults: "Adultos",
      label_roundtrip: "Ida y vuelta",
      trip_oneway: "Solo ida",
      trip_round: "Redondo",
      label_return_date: "Fecha de regreso",
      label_return_time: "Hora de regreso",
      price_label: "Precio estimado",
      form_submit: "Enviar reserva por WhatsApp",
      form_note: "Al enviar, se abrirá WhatsApp con tu reserva ya redactada para confirmar con un agente.",
      services_title: "Servicios",
      services_sub: "Un solo número de WhatsApp para moverte por toda la isla.",
      srv1_title: "Aeropuerto → Hotel",
      srv1_text: "Monitoreamos tu vuelo y ajustamos la recogida si llega antes o con retraso.",
      srv2_title: "Hotel → Aeropuerto",
      srv2_text: "Salida calculada con margen para chequeo y seguridad, sin apuros de último minuto.",
      srv3_title: "Alquiler de vehículos",
      srv3_text: "Sedán, SUV o van por día o por semana, con o sin chofer.",
      srv4_title: "Punto a punto",
      srv4_text: "Excursiones, puertos y traslados entre ciudades y zonas turísticas.",
      fleet_title: "Flota",
      fleet_sub: "Un vehículo para cada grupo.",
      fleet1_title: "Sedán · 1–3 pasajeros",
      fleet1_text: "Ideal para parejas o viajeros solos. Hasta 3 piezas de equipaje, A/C y agua de cortesía.",
      fleet2_title: "SUV / Camioneta · 4–6 pasajeros",
      fleet2_text: "Familias y grupos pequeños. Espacio ampliado y sillas para bebé bajo solicitud.",
      fleet3_title: "Van / Minibús · 7–14 pasajeros",
      fleet3_text: "Grupos, bodas y eventos. Ideal para excursiones, chofer bilingüe disponible.",
      zones_title: "Zonas donde operamos",
      zones_sub: "Cobertura en toda la República Dominicana.",
      zones_cta: "Reservar directo por WhatsApp",
      strip1_title: "Precio cerrado",
      strip1_text: "Sin cargos ocultos al llegar",
      strip2_title: "Conductores locales",
      strip2_text: "Conocen cada hotel y acceso",
      strip3_title: "Atención 24/7",
      strip3_text: "Respondemos por WhatsApp",
      rates_title: "Tarifas por destino",
      rates_sub: "Precios de ida en USD desde el aeropuerto seleccionado. Ida y vuelta tiene descuento.",
      rates_destination: "Destino",
      rates_sedan: "Sedán",
      rates_van: "Van",
      rates_minibus: "Minibús",
      rates_note: "Tarifas de referencia. La reserva se confirma por WhatsApp según fecha, hotel y número de pasajeros.",
      how_title: "Cómo funciona",
      how1_title: "Elige tu ruta",
      how1_text: "Aeropuerto, destino, fecha y número de pasajeros.",
      how2_title: "Confirma por WhatsApp",
      how2_text: "Te respondemos con el precio final y los datos del conductor.",
      how3_title: "Llega y viaja",
      how3_text: "El conductor te espera con tu nombre en la salida del aeropuerto.",
      faq_title: "Preguntas frecuentes",
      faq1_q: "¿Qué pasa si mi vuelo se retrasa?",
      faq1_a: "Seguimos el número de vuelo y ajustamos la hora de recogida sin costo.",
      faq2_q: "¿Cómo pago?",
      faq2_a: "Puedes pagar al conductor en efectivo o por adelantado; lo acordamos por WhatsApp.",
      faq3_q: "¿Incluye sillas para niños?",
      faq3_a: "Sí, indícalo en las notas de la reserva y llevamos silla sin costo.",
      faq4_q: "¿Puedo cancelar?",
      faq4_a: "Cancelación sin cargo avisando con al menos 24 horas de anticipación.",
      footer_text: "Traslados privados en República Dominicana.",
      footer_whatsapp: "WhatsApp",
      footer_email: "Correo",
      wa_generic: "Hola, quiero información sobre un traslado.",
      msg_title: "Hola, quiero reservar un traslado:",
      msg_trip: "Viaje",
      msg_route: "Ruta",
      msg_date: "Fecha",
      msg_flight: "Vuelo",
      msg_pax: "Pasajeros",
      msg_luggage: "Equipaje",
      msg_vehicle: "Vehículo",
      msg_pay: "Pago",
      msg_return: "Regreso",
      msg_adults: "Adultos",
      msg_minors: "Menores",
      msg_childseats: "Sillas para niños/bebé",
      msg_luggage: "Maletas",
      msg_vehicle: "Vehículo",
      msg_roundtrip: "Ida y vuelta",
      msg_return: "Regreso",
      msg_name: "Nombre",
      msg_phone: "Teléfono",
      msg_price: "Precio estimado",
      msg_notes: "Notas",
      yes: "Sí",
      no: "No",
      required: "Completa los campos obligatorios.",
      capacity_error: "El vehículo no alcanza para {n} pasajeros (capacidad {cap}). Elige van o minibús.",
      capacity_hint: "Capacidad del vehículo: {cap} · Ocupados: {n}"
    },
    en: {
      brand: "Caribe Transfer RD",
      topbar_route: "Airport · Hotel · Punta Cana & DR",
      topbar_clock: "DR local time",
      nav_home: "Home",
      nav_services: "Services",
      nav_fleet: "Fleet",
      nav_zones: "Areas",
      nav_rates: "Rates",
      nav_how: "How it works",
      nav_faq: "FAQ",
      nav_book: "Book now",
      hero_eyebrow: "Private transfers 24/7",
      hero_title: "Arrive without the stress",
      hero_lead: "We pick you up wherever you are —airport, hotel, Airbnb or private home— and take you to your destination with a professional driver, air-conditioned vehicle and a fixed price.",
      hero_check1: "No surprises: price confirmed before you travel",
      hero_check2: "Flight tracking included",
      hero_check3: "Pay the driver or pay in advance",
      hero_whatsapp: "Message us on WhatsApp",
      hero_photo_caption: "Punta Cana · Bavaro · Cap Cana",
      badge1: "Late-night pickups",
      badge2: "Verified drivers",
      badge3: "Bilingual support",
      form_title: "Book your transfer",
      form_kicker: "Pickup → Drop-off",
      label_direction: "Transfer type",
      dir_other: "Other",
      label_pickup_q: "Where do we pick you up?",
      pickup_placeholder: "Airport, hotel, Airbnb, address…",
      label_drop_q: "Which hotel or address are you going to?",
      drop_placeholder: "Hotel, Airbnb, airport, address…",
      label_flight_full: "Flight number and airline",
      flight_placeholder: "E.g. AA1234 · American Airlines",
      label_date: "Date",
      label_time: "Time",
      label_pax: "Passengers",
      label_luggage: "Pieces of luggage",
      label_vehicle: "Vehicle type",
      label_pay: "Payment method",
      pay_cash: "Cash (USD or RD$)",
      pay_card: "Card",
      pay_transfer: "Transfer / deposit",
      pay_hotel: "Pay at the hotel",
      pay_hint: "Online payment (PayPal / terminal) coming soon. Today we confirm on WhatsApp.",
      label_phone: "Phone / WhatsApp",
      label_minors: "Children (0–12 years)",
      label_childseats: "Child / baby seats",
      label_name: "Name",
      label_notes: "Notes (optional)",
      notes_short: "Baby seat (age)…",
      label_flight: "Flight number",
      label_adults: "Adults",
      label_roundtrip: "Round trip",
      trip_oneway: "One way",
      trip_round: "Round trip",
      label_return_date: "Return date",
      label_return_time: "Return time",
      price_label: "Estimated price",
      form_submit: "Send booking via WhatsApp",
      form_note: "On submit, WhatsApp opens with your booking ready to confirm with an agent.",
      services_title: "Services",
      services_sub: "One WhatsApp number to move across the whole island.",
      srv1_title: "Airport → Hotel",
      srv1_text: "We track your flight and adjust pickup if it arrives early or late.",
      srv2_title: "Hotel → Airport",
      srv2_text: "Departure planned with time for check-in and security, no last-minute rush.",
      srv3_title: "Vehicle rental",
      srv3_text: "Sedan, SUV or van by day or week, with or without driver.",
      srv4_title: "Point to point",
      srv4_text: "Tours, ports and transfers between cities and tourist areas.",
      fleet_title: "Fleet",
      fleet_sub: "A vehicle for every group.",
      fleet1_title: "Sedan · 1–3 passengers",
      fleet1_text: "Ideal for couples or solo travelers. Up to 3 bags, A/C and courtesy water.",
      fleet2_title: "SUV · 4–6 passengers",
      fleet2_text: "Families and small groups. Extra luggage space and baby seats on request.",
      fleet3_title: "Van / Minibus · 7–14 passengers",
      fleet3_text: "Groups, weddings and events. Great for tours, bilingual driver available.",
      zones_title: "Areas we serve",
      zones_sub: "Coverage across the Dominican Republic.",
      zones_cta: "Book directly on WhatsApp",
      strip1_title: "Fixed price",
      strip1_text: "No hidden charges on arrival",
      strip2_title: "Local drivers",
      strip2_text: "They know every hotel and entrance",
      strip3_title: "24/7 support",
      strip3_text: "We reply on WhatsApp",
      rates_title: "Rates by destination",
      rates_sub: "One-way prices in USD from the selected airport. Round trips are discounted.",
      rates_destination: "Destination",
      rates_sedan: "Sedan",
      rates_van: "Van",
      rates_minibus: "Minibus",
      rates_note: "Reference rates. The booking is confirmed on WhatsApp based on date, hotel and number of passengers.",
      how_title: "How it works",
      how1_title: "Choose your route",
      how1_text: "Airport, destination, date and number of passengers.",
      how2_title: "Confirm on WhatsApp",
      how2_text: "We reply with the final price and driver details.",
      how3_title: "Arrive and ride",
      how3_text: "The driver waits for you with your name at the airport exit.",
      faq_title: "Frequently asked questions",
      faq1_q: "What if my flight is delayed?",
      faq1_a: "We track your flight number and adjust the pickup time at no cost.",
      faq2_q: "How do I pay?",
      faq2_a: "You can pay the driver in cash or pay in advance; we arrange it on WhatsApp.",
      faq3_q: "Are child seats available?",
      faq3_a: "Yes, mention it in the booking notes and we bring one at no cost.",
      faq4_q: "Can I cancel?",
      faq4_a: "Free cancellation with at least 24 hours notice.",
      footer_text: "Private transfers in the Dominican Republic.",
      footer_whatsapp: "WhatsApp",
      footer_email: "Email",
      wa_generic: "Hi, I would like information about a transfer.",
      msg_title: "Hi, I would like to book a transfer:",
      msg_trip: "Trip",
      msg_route: "Route",
      msg_date: "Date",
      msg_flight: "Flight",
      msg_pax: "Passengers",
      msg_luggage: "Luggage",
      msg_vehicle: "Vehicle",
      msg_pay: "Payment",
      msg_return: "Return",
      msg_adults: "Adults",
      msg_minors: "Children",
      msg_childseats: "Child/baby seats",
      msg_luggage: "Luggage",
      msg_vehicle: "Vehicle",
      msg_roundtrip: "Round trip",
      msg_return: "Return",
      msg_name: "Name",
      msg_phone: "Phone",
      msg_price: "Estimated price",
      msg_notes: "Notes",
      yes: "Yes",
      no: "No",
      required: "Please fill in the required fields.",
      capacity_error: "The selected vehicle does not fit {n} passengers (capacity {cap}). Please choose a van or minibus.",
      capacity_hint: "Vehicle capacity: {cap} · Occupied: {n}"
    }
  };

  let lang = localStorage.getItem("lang") || C.defaultLang;
  if (!T[lang]) lang = "es";

  const $ = (sel) => document.querySelector(sel);
  const money = (n) => "$" + Math.round(n) + " " + C.currency;
  const phone = C.whatsapp.replace(/\D/g, "");

  function tr(key) {
    return (T[lang] && T[lang][key]) || key;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = tr(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = tr(el.getAttribute("data-i18n-placeholder"));
    });
    $("#langToggle").textContent = lang === "es" ? "EN" : "ES";
    document.title = lang === "es"
      ? "Caribe Transfer RD — Traslados aeropuerto–hotel en República Dominicana"
      : "Caribe Transfer RD — Airport to hotel transfers in the Dominican Republic";
    fillSelects();
    renderRates();
    updatePrice();
  }

  function option(value, label) {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
  }

  function fillSelects() {
    const vehicle = $("#vehicle");
    const pay = $("#payMethod");
    const vVal = vehicle ? vehicle.value : "";
    const pVal = pay ? pay.value : "";

    if (vehicle) {
      vehicle.innerHTML = "";
      C.vehicles.forEach((v) => vehicle.appendChild(option(v.id, v[lang] || v.es)));
      if (vVal) vehicle.value = vVal;
    }

    if (pay) {
      pay.innerHTML = "";
      (C.payMethods || [
        { id: "cash", es: "Efectivo (USD o RD$)", en: "Cash (USD or RD$)" },
        { id: "card", es: "Tarjeta", en: "Card" },
        { id: "transfer", es: "Transferencia / depósito", en: "Transfer / deposit" },
        { id: "hotel", es: "Pago en el hotel", en: "Pay at the hotel" }
      ]).forEach((m) => pay.appendChild(option(m.id, m[lang] || m.es)));
      if (pVal) pay.value = pVal;
    }

    fillPlaces();
  }

  function norm(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function fillPlaces() {
    // El predictivo ahora es un combo propio (ver initCombos); no hay datalist que llenar.
    // Se conserva la función para no romper applyLang().
  }

  // Resuelve un texto libre a zona de precio: match exacto, parcial o fallback
  function resolvePlace(text) {
    const t = norm(text).trim();
    if (!t) return null;
    const places = C.places || [];
    let hit = places.find((p) => norm(p.label) === t);
    if (!hit) hit = places.find((p) => norm(p.label).includes(t) || t.includes(norm(p.label)));
    if (!hit) {
      const zHit = C.zones.find((z) => t.includes(norm(z.es)) || t.includes(norm(z.en || "")));
      if (zHit) return { label: text.trim(), zone: zHit };
    } else {
      return { label: hit.label, zone: C.zones.find((z) => z.id === hit.zone) || C.zones[0] };
    }
    return { label: text.trim(), zone: null }; // dirección libre: precio a confirmar
  }

  // Predictivo propio: filtra la lista al escribir, deja elegir con mouse/teclado,
  // y si no hay coincidencia guarda el texto libre tal cual.
  function scorePlace(label, query) {
    const l = norm(label), q = norm(query).trim();
    if (!q) return -1;
    if (l === q) return 100;
    if (l.startsWith(q)) return 80;
    const words = q.split(/\s+/);
    if (words.every((w) => l.includes(w))) return 60;
    if (l.includes(q)) return 40;
    // siglas: "hrpc" ~ hard rock punta cana
    const initials = l.split(/[^a-z0-9]+/).map((w) => w[0] || "").join("");
    if (q.length >= 2 && initials.startsWith(q)) return 30;
    return -1;
  }

  function suggestPlaces(query, limit) {
    const q = (query || "").trim();
    if (q.length < 2) return [];
    return (C.places || [])
      .map((p) => ({ p, s: scorePlace(p.label, q) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s || a.p.label.localeCompare(b.p.label))
      .slice(0, limit || 8)
      .map((x) => x.p);
  }

  function initCombo(inputSel, menuSel) {
    const input = $(inputSel);
    const menu = $(menuSel);
    if (!input || !menu) return;
    let active = -1;
    let items = [];

    function close() {
      menu.hidden = true;
      input.setAttribute("aria-expanded", "false");
      active = -1;
    }
    function open() {
      if (!items.length) { close(); return; }
      menu.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }
    function render() {
      menu.innerHTML = "";
      items.forEach((p, i) => {
        const li = document.createElement("li");
        li.id = menu.id + "-opt-" + i;
        li.setAttribute("role", "option");
        li.className = "combo-item" + (i === active ? " active" : "");
        li.setAttribute("aria-selected", i === active ? "true" : "false");
        const zone = C.zones.find((z) => z.id === p.zone);
        li.innerHTML = "";
        const name = document.createElement("span");
        name.className = "combo-name";
        name.textContent = p.label;
        const tag = document.createElement("span");
        tag.className = "combo-zone";
        tag.textContent = zone ? (zone[lang] || zone.es) : "";
        li.append(name, tag);
        li.addEventListener("mousedown", (e) => {
          e.preventDefault();
          input.value = p.label;
          close();
          updatePrice();
        });
        menu.appendChild(li);
      });
      open();
    }
    input.addEventListener("input", () => {
      items = suggestPlaces(input.value, 8);
      active = items.length ? 0 : -1;
      render();
      updatePrice();
    });
    input.addEventListener("focus", () => {
      items = suggestPlaces(input.value, 8);
      active = items.length ? 0 : -1;
      render();
    });
    input.addEventListener("keydown", (e) => {
      if (menu.hidden) return;
      if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % items.length; render(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + items.length) % items.length; render(); }
      else if (e.key === "Enter" && active >= 0) { e.preventDefault(); input.value = items[active].label; close(); updatePrice(); }
      else if (e.key === "Escape") { close(); }
    });
    input.addEventListener("blur", () => setTimeout(close, 150));
  }

  function initCombos() {
    initCombo("#pickup", "#pickupMenu");
    initCombo("#drop", "#dropMenu");
  }

  function isRound() {
    const el = document.querySelector('input[name="trip"]:checked');
    return !!el && el.value === "round";
  }

  const val = (sel) => { const el = $(sel); return el ? el.value : ""; };
  const num = (sel) => Number(val(sel)) || 0;

  function toggleReturn() {
    const box = $("#returnFields");
    if (!box) return;
    const round = isRound();
    box.hidden = !round;
    const d = $("#returnDate");
    const t = $("#returnTime");
    if (d) {
      d.required = round;
      d.min = val("#date") || todayISO();
      if (round && val("#date") && d.value && d.value < val("#date")) d.value = val("#date");
      if (!round) d.value = "";
    }
    if (t) {
      t.required = round;
      if (!round) t.value = "";
    }
  }

  function calc() {
    const v = C.vehicles.find((x) => x.id === val("#vehicle")) || C.vehicles[0];
    const factor = (isRound() ? C.roundTripFactor : 1);
    // Precio según destino; si el destino es dirección libre, se confirma por WhatsApp (base Bávaro)
    const drop = resolvePlace(val("#drop"));
    const base = drop && drop.zone ? drop.zone.price : (C.zones.find((z) => z.id === "bavaro") || C.zones[0]).price;
    return base * v.factor * factor;
  }

  function updatePrice() {
    const el = $("#price");
    if (!el) return;
    const dropRaw = val("#drop");
    const drop = resolvePlace(dropRaw);
    if (dropRaw.trim() && !(drop && drop.zone)) {
      el.textContent = lang === "es" ? "A confirmar" : "To confirm";
    } else {
      el.textContent = money(calc());
    }
    updateHint();
  }

  function updateHint() {
    const el = $("#capacityHint");
    if (!el) return;
    const v = C.vehicles.find((x) => x.id === val("#vehicle"));
    if (!v) return;
    const total = num("#adults") + num("#minors");
    el.textContent = tr("capacity_hint").replace("{cap}", v.capacity).replace("{n}", total);
    el.classList.toggle("warn", total > v.capacity);
  }

  function renderRates() {
    const tbody = $("#ratesTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    C.zones.forEach((z) => {
      const tr = document.createElement("tr");
      const name = document.createElement("td");
      name.textContent = z[lang] || z.es;
      tr.appendChild(name);
      C.vehicles.forEach((v) => {
        const td = document.createElement("td");
        td.textContent = money(z.price * v.factor);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  function waLink(text) {
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
  }

  function setGenericLinks() {
    const link = waLink(tr("wa_generic"));
    ["#heroWhatsapp", "#floatWhatsapp", "#footerWhatsapp", "#zonesWhatsapp"].forEach((sel) => {
      const el = $(sel);
      if (el) el.href = link;
    });
    const mail = $("#footerEmail");
    if (mail) mail.href = "mailto:" + C.email;
  }

  function tickClock() {
    const el = $("#localClock");
    if (!el) return;
    try {
      el.textContent = new Intl.DateTimeFormat(lang === "es" ? "es-DO" : "en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
        timeZone: "America/Santo_Domingo"
      }).format(new Date());
    } catch (e) {
      el.textContent = new Date().toLocaleTimeString();
    }
  }

  function payLabel() {
    const methods = C.payMethods || [];
    const m = methods.find((x) => x.id === val("#payMethod"));
    return m ? (m[lang] || m.es) : val("#payMethod");
  }

  function buildMessage() {
    const pickup = val("#pickup").trim();
    const drop = val("#drop").trim();
    const v = C.vehicles.find((x) => x.id === val("#vehicle")) || C.vehicles[0];
    const date = val("#date");
    const time = val("#time");
    const round = isRound();

    const lines = [tr("msg_title")];
    lines.push("• " + tr("msg_trip") + ": " + (round ? tr("trip_round") : tr("trip_oneway")));
    lines.push("• " + tr("msg_route") + ": " + pickup + " → " + drop);
    lines.push("• " + tr("msg_date") + ": " + date + " " + time);
    if (round) {
      lines.push("• " + tr("msg_return") + ": " + val("#returnDate") + " " + val("#returnTime"));
    }
    if (val("#flight").trim()) lines.push("• " + tr("msg_flight") + ": " + val("#flight").trim());
    lines.push("• " + tr("msg_pax") + ": " + (val("#adults") || "2"));
    lines.push("• " + tr("msg_luggage") + ": " + (val("#luggage") || "0"));
    lines.push("• " + tr("msg_vehicle") + ": " + (v[lang] || v.es));
    lines.push("• " + tr("msg_pay") + ": " + payLabel());
    lines.push("• " + tr("msg_phone") + ": " + val("#phone").trim());
    if (num("#minors") > 0) {
      lines.push("• " + tr("msg_minors") + ": " + val("#minors"));
    }
    if (num("#childSeats") > 0) {
      lines.push("• " + tr("msg_childseats") + ": " + val("#childSeats"));
    }
    if (val("#name").trim()) lines.push("• " + tr("msg_name") + ": " + val("#name").trim());
    if (val("#notes").trim()) lines.push("• " + tr("msg_notes") + ": " + val("#notes").trim());
    lines.push("");
    const dropResolved = resolvePlace(drop);
    const priceText = (dropResolved && dropResolved.zone)
      ? money(calc())
      : (lang === "es" ? "A confirmar por WhatsApp" : "To confirm on WhatsApp");
    lines.push(tr("msg_price") + ": " + priceText);
    return lines.join("\n");
  }

  function checkCapacity() {
    const total = num("#adults") + num("#minors");
    const v = C.vehicles.find((x) => x.id === val("#vehicle"));
    if (v && total > v.capacity) {
      return { ok: false, total, cap: v.capacity };
    }
    return { ok: true, total };
  }

  function todayISO() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function init() {
    fillSelects();
    initCombos();

    const dateInput = $("#date");
    if (dateInput) {
      dateInput.min = todayISO();
      dateInput.addEventListener("change", toggleReturn);
    }
    tickClock();
    setInterval(tickClock, 1000);

    ["#vehicle", "#adults", "#minors"].forEach((sel) => {
      const el = $(sel);
      if (el) el.addEventListener("change", updatePrice);
    });

    ["#pickup", "#drop"].forEach((sel) => {
      const el = $(sel);
      if (el) el.addEventListener("input", updatePrice);
    });

    document.querySelectorAll('input[name="trip"]').forEach((el) => {
      el.addEventListener("change", () => {
        toggleReturn();
        updatePrice();
      });
    });

    toggleReturn();

    const nav = $("#mainNav");
    const menuToggle = $("#menuToggle");
    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        const abierto = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(abierto));
        menuToggle.textContent = abierto ? "✕" : "☰";
      });
      nav.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          nav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.textContent = "☰";
        });
      });
    }

    const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
    const secciones = navLinks
      .map((a) => ({ a, sec: document.querySelector(a.getAttribute("href")) }))
      .filter((x) => x.sec);
    if (secciones.length && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          navLinks.forEach((l) => l.classList.remove("active"));
          const item = secciones.find((s) => s.sec === en.target);
          if (item) item.a.classList.add("active");
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      secciones.forEach((s) => obs.observe(s.sec));
    }

    $("#langToggle").addEventListener("click", () => {
      lang = lang === "es" ? "en" : "es";
      localStorage.setItem("lang", lang);
      applyLang();
      setGenericLinks();
      tickClock();
    });

    $("#bookingForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      if (!form.checkValidity()) {
        alert(tr("required"));
        form.reportValidity();
        return;
      }
      const cap = checkCapacity();
      if (!cap.ok) {
        alert(tr("capacity_error").replace("{n}", cap.total).replace("{cap}", cap.cap));
        return;
      }
      window.open(waLink(buildMessage()), "_blank", "noopener");
    });

    $("#year").textContent = new Date().getFullYear();

    // Flecha volver a la reserva: aparece al bajar, lleva al formulario
    const toTop = $("#toTop");
    if (toTop) {
      const onScroll = () => toTop.classList.toggle("show", window.scrollY > 600);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Carrito sobre la línea con transform (rAF) — reemplaza animateMotion/SMIL
    (function carRunner() {
      const car = $("#carRunner");
      const line = $("#carLine");
      if (!car || !line || !line.getTotalLength) return;
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        car.style.display = "none";
        return;
      }
      const DUR = 52000;
      let start = null;
      function frame(now) {
        if (start === null) start = now;
        const t = ((now - start) % DUR) / DUR;
        const len = line.getTotalLength();
        const p0 = line.getPointAtLength(t * len);
        const p1 = line.getPointAtLength(Math.min(len, t * len + 1));
        const svg = line.ownerSVGElement;
        const box = svg.getBoundingClientRect();
        const vb = svg.viewBox.baseVal;
        const sx = box.width / vb.width;
        const sy = box.height / vb.height;
        // slice: cubre y recorta; se usa la escala mayor y se centra
        const s = Math.max(sx, sy);
        const ox = (box.width - vb.width * s) / 2;
        const oy = (box.height - vb.height * s) / 2;
        const x = ox + (p0.x - vb.x) * s;
        const y = oy + (p0.y - vb.y) * s;
        const ang = Math.atan2((p1.y - p0.y) * s, (p1.x - p0.x) * s) * 180 / Math.PI;
        car.style.transform = "translate(" + (x - 19) + "px," + (y - 13) + "px) rotate(" + ang + "deg)";
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    })();

    applyLang();
    setGenericLinks();
    updatePrice();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
