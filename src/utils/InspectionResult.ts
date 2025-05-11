export interface IdentityDetails {
  inspector: string;
  customer: string;
  cabangInspeksi: string;
  tanggalInspeksi: string;
}

export interface VehicleData {
  merk: string;
  tipe: string;
  tahun: string;
  warna: string;
  odometer: string;
  kepemilikan: string;
  platNomor: string;
  pajak1tahun: string;
  pajak5tahun: string;
  biayaPajak: string;
}

export interface EquipmentChecklist {
  bukuServis: boolean;
  kunciSerep: boolean;
  bukuManual: boolean;
  banSerep: boolean;
  dongkrak: boolean;
  toolkit: boolean;
  noRangka: boolean;
  noMesin: boolean;
}

interface Estimasi {
  nama: string;
  harga: number;
}

export interface InspectionSummary {
  interior: number;
  keteranganInterior: string;
  exterior: number;
  keteranganExterior: string;
  kakiKaki: number;
  keteranganKakiKaki: string;
  mesin: number;
  keteranganMesin: string;
  keseluruhan: number;
  deskripsiKeseluruhan: string[];
  // indikasi
  bekasTabrakan: boolean;
  bekasBanjir: boolean;
  odometerReset: boolean;

  //data ban
  merkBanDepan: string;
  tipeVelgDepan: string;
  ketebalanBanDepan: string;
  merkBanBelakang: string;
  tipeVelgBelakang: string;
  ketebalanBanBelakang: string;

  estimasiPerbaikan: Estimasi[];
}

interface PenilaianFitur {
  airbag: number;
  sistemAudio: number;
  powerWindow: number;
  sistemAC: number;
  centralLock: number;
  remABS: number;
  electricMiror: number;
}

interface PenilaianMesin {
  getaranMesin: number;
  suaraMesin: number;
  transmisi: number;
  pompaPowerSteering: number;
  coverTimmingChain: number;
  oliPowerSteering: number;
  accu: number;
  kompressorAC: number;
  fan: number;
  selang: number;
  karterOli: number;
  oliRem: number;
  kabel: number;
  kondensor: number;
  radiator: number;
  cylinderHead: number;
  oliMesin: number;
  airRadiator: number;
  coverKlep: number;
  alternator: number;
  waterPump: number;
  belt: number;
  oliTransmisi: number;
  cylinderBlock: number;
  bushingBesar: boolean; // true jika "Ada", false jika tidak dicentang
  bushingKecil: number; // nilai skala
  tutupRadiator: number;
  catatan?: string;
}

interface PenilaianInterior {
  stir: number;
  remTangan: number;
  pedal: number;
  switchWiper: number;
  lampuHazard: number;
  panelDashboard: number;
  pembukaKapMesin: number;
  pembukaBagasi: number;
  jokDepan: number;
  aromaInterior: number;
  handlePintu: number;
  consoleBox: number;
  spionTengah: number;
  tuasPersneling: number;
  jokBelakang: number;
  panelIndikator: number;
  switchLampu: number;
  karpetDasar: number;
  klakson: number;
  sunVisor: number;
  tuasTangkiBensin: number;
  sabukPengaman: number;
  trimInterior: number;
  plafon: number;
  catatan?: string; // Optional notes
}

interface PenilaianEksterior {
  bumperDepan: number;
  kapMesin: number;
  lampuUtama: number;
  panelAtap: number;
  grill: number;
  lampuFoglamp: number;
  kacaBening: number;
  wiperBelakang: number;
  bumperBelakang: number;
  lampuBelakang: number;
  trunklid: number;
  kacaDepan: number;
  fenderKanan: number;
  quarterPanelKanan: number;
  pintuBelakangKanan: number;
  spionKanan: number;
  lisplangKanan: number;
  sideSkirtKanan: number;
  daunWiper: number;
  pintuBelakang: number;
  fenderKiri: number;
  quarterPanelKiri: number;
  pintuDepan: number;
  kacaJendelaKanan: number;
  pintuBelakangKiri: number;
  spionKiri: number;
  pintuDepanKiri: number;
  kacaJendelaKiri: number;
  lisplangKiri: number;
  sideSkirtKiri: number;
  catatan?: string; // Optional notes
}
interface PenilaianBanKaki {
  banDepan: number;
  velgDepan: number;
  discBrake: number;
  masterRem: number;
  tieRod: number;
  gardan: number;
  banBelakang: number;
  velgBelakang: number;
  brakePad: number;
  crossmember: number;
  knalpot: number;
  balljoint: number;
  rocksteer: number;
  karetBoot: number;
  upperLowerArm: number;
  shockBreaker: number;
  linkStabilizer: number;
  catatan?: string; // Optional notes
}

interface PenilaianTestDrive {
  bunyiGetaran: number;
  performaStir: number;
  perpindahanTransmisi: number;
  stirBalance: number;
  performaSuspensi: number;
  performaKopling: number;
  rpm: number;
  catatan?: string; // Optional notes
}

interface PenilaianToolsTest {
  tebalCatBodyDepan: number;
  tebalCatBodyKiri: number;
  temperatureACMobil: number;
  tebalCatBodyKanan: number;
  tebalCatBodyBelakang: number;
  obdScanner: number;
  tebalCatBodyAtap: number;
  testAccu: number;
  catatan?: string; // Optional notes
}

export interface DetailAssessment {
  fitur: PenilaianFitur;
  hasilInspeksiMesin: PenilaianMesin;
  hasilInspeksiInterior: PenilaianInterior;
  hasilInspeksiExterior: PenilaianEksterior;
  banDanKakiKaki: PenilaianBanKaki;
  testDrive: PenilaianTestDrive;
  toolsTest: PenilaianToolsTest;
}

export interface InspectionResult {
  id?: string;
  vehiclePlateNumber?: string;
  inspectionDate?: string;
  overallRating?: string;

  identityDetails?: IdentityDetails;
  detailAssessment?: DetailAssessment;
  vehicleData?: VehicleData;
  equipmentChecklist?: EquipmentChecklist;
  inspectionSummary?: InspectionSummary;

  createdAt?: string;
  updatedAt?: string;

  photoPath?: string[];
}
