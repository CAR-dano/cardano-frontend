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
  photos: string[];
}

export interface Hasil {
  interior: string;
  exterior: string;
  mesin: string;
  kakiKaki: string;
  keseluruhan: string;
  bekastabrakan: boolean;
  bekasbanjir: boolean;
  odometerreset: boolean;
}
