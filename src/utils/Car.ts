export interface VehicleData {
  plat: string;
  brand: string;
  model: string;
  tahun: string;
  odometer: string;
  warna: string;
  kepemilikan: string;
  transmisi: string;
  pajak1tahun: string;
  pajak5tahun: string;
  biayapajak: string;
  gambar: string[];
}

interface Indikasi {
  bekastabrakan: boolean;
  bekasbanjir: boolean;
  odometerreset: boolean;
}

interface Penilaian {
  interior: string;
  exterior: string;
  mesin: string;
  kakiKaki: string;
  keseluruhan: string;
}

export interface Hasil {
  indikasi: Indikasi;
  penilaian: Penilaian;
}
