const capitalizeWords = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const SortingGeneralData = [
  "Tampak Depan",
  "Tampak Belakang",
  "Tampak Samping Kanan",
  "Tampak Samping Kiri",
].map(capitalizeWords);

export const SortingExteriorData = [
  "Cat Samping Kanan dan Kiri (Pintu Mobil)",
  "Pilar Pintu Depan",
  "Pilar pintu tengah depan",
  "Pilar pintu tengah belakang",
  "Karet pada pilar",
  "Celah bagasi",
  "Sealer bagasi",
  "Pilar bagasi",
  "Karet bagasi",
  "Bau bagasi",
  "Kolong Bagasi",
  "Asap kendaraan (jika ngobos)",
  "Bumper",
  "Fender",
  "Handle pintu",
  "Quarter",
  "Lisplang",
  "Lampu",
  "Foglamp",
].map(capitalizeWords);

export const SortingInteriorData = [
  "Transmisi",
  "Pedal",
  "Dashboard Mobil",
  "Stir",
  "Jok",
  "Doortrim",
  "Karpet",
  "Plafon",
  "Tuas Wiper",
  "Tuas Lampu",
  "Safety Belt",
  "Lantai Mobil",
].map(capitalizeWords);

export const SortingMesinData = [
  "Sealer kap mesin",
  "Support bumper",
  "Celah kap mesin",
  "Baut kap mesin",
  "Rangka mesin mobil",
  "Las titik",
  "Bulatan pad rangka",
  "Radiator (penyok/tidak)",
  "Dipstick oli mesin",
  "Kondisi oli dari tutup",
  "Cover valve",
  "Cover timing chain",
  "Seal crankshaft depan",
  "Seal crankshaft belakang",
  "Carter",
  "V Belt",
  "Turbo",
  "Selang-selang",
  "Kipas radiator",
  "Motor fan",
  "Minyak rem",
  "Support shock",
  "Engine mounting",
  "Aki",
  "Alternator",
  "Tutup radiator dibuka",
  "Sambungan Radiator (assembly)",
  "Reservoir radiator",
  "Compressor AC",
].map(capitalizeWords);

export const SortingKakiKakiData = [
  "Cakram",
  "Kampas rem",
  "Celah antara roda dan fender",
  "Ulir ban",
  "Usia ban",
  "Tie rod",
  "Link stabilizer",
  "Balljoint",
  "Shock breaker",
  "As roda depan",
  "Kabel ties",
  "Lower arm",
  "Crossmember",
  "Chassis",
].map(capitalizeWords);

export const SortingAlatAlatData = [
  "OBD Scanner",
  "Sinar UV",
  "Paint Thickness",
  "Cek Aki",
  "Tire Thickness",
  "Endoscope (Jika perlu)",
].map(capitalizeWords);
