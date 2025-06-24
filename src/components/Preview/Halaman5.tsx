import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PenilaianHasil from "./PenilaianHasil";

interface Halaman5Props {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
}

const Halaman5: React.FC<Halaman5Props> = ({
  data,
  editable,
  onClick = () => {},
}) => {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  const handleClick = (data: any) => {
    if (onClick) {
      onClick(data);
    }
  };

  const capitalizeFirstLetterOfSentences = (text: string) => {
    const cleanedText = text.replace(/^•\s*/, "");
    if (!cleanedText) return "";
    return cleanedText.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  return (
    <div className="px-[30px] font-poppins text-black">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-8">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2  border-black">
              Hasil Inspeksi
            </p>
          </div>
        </div>

        <div className="w-full border-b-2 border-black py-2">
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {eksteriorKendaraan.map((item, index) => (
              <PenilaianHasil
                edit={editable}
                onClick={handleClick}
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                subSubFieldName={item.part}
                beban={item.beban.toString()}
                subFieldName="hasilInspeksiEksterior"
                nilai={
                  data.hasilInspeksiEksterior[item.part] != undefined
                    ? data.hasilInspeksiEksterior[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>

          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Catatan Eksterior Kendaraan`,
                fieldName: `detailedAssessment`,
                subsubfieldname: "catatan",
                oldValue: data.hasilInspeksiEksterior.catatan,
                subFieldName: "hasilInspeksiEksterior",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`text-[12px] px-1 mt-1 font-semibold flex min-h-[70px] ${
              editable ? "cursor-pointer group hover:bg-[#F4622F]" : ""
            }`}
          >
            *Catatan:
            {data.hasilInspeksiEksterior.catatan &&
            data.hasilInspeksiEksterior.catatan.length > 0 ? (
              <div
                className={`text-[12px] font-semibold flex ${
                  data.hasilInspeksiEksterior.catatan.length >= 4
                    ? "flex-row flex-wrap"
                    : "flex-col justify-center items-center"
                } ${editable ? "group-hover:text-white" : ""}`}
              >
                <ol
                  className={`list-disc pl-5 ${
                    data.hasilInspeksiEksterior.catatan.length >= 4
                      ? "w-1/2"
                      : "w-full"
                  }`}
                >
                  {data.hasilInspeksiEksterior.catatan
                    .slice(
                      0,
                      data.hasilInspeksiEksterior.catatan.length >= 4
                        ? Math.ceil(
                            data.hasilInspeksiEksterior.catatan.length / 2
                          )
                        : data.hasilInspeksiEksterior.catatan.length
                    )
                    .map((item: any, index: any) => (
                      <li key={index} className="text-[12px]">
                        {capitalizeFirstLetterOfSentences(item)}
                      </li>
                    ))}
                </ol>
                {data.hasilInspeksiEksterior.catatan.length >= 4 && (
                  <ol className="list-disc pl-5 w-1/2">
                    {data.hasilInspeksiEksterior.catatan
                      .slice(
                        Math.ceil(
                          data.hasilInspeksiEksterior.catatan.length / 2
                        )
                      )
                      .map((item: any, index: any) => (
                        <li key={index} className="text-[12px]">
                          {capitalizeFirstLetterOfSentences(item)}
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            ) : (
              <div className="text-[12px] font-semibold py-4">-</div>
            )}
          </div>
        </div>

        <div className="w-full border-b-2 border-black py-2">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              4
            </p>
            <p className="">Ban dan Kaki-Kaki</p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {banDanKakiKaki.map((item, index) => (
              <PenilaianHasil
                edit={editable}
                onClick={handleClick}
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                subSubFieldName={item.part}
                beban={item.beban.toString()}
                subFieldName="banDanKakiKaki"
                nilai={
                  data.banDanKakiKaki[item.part] != undefined
                    ? data.banDanKakiKaki[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>

          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Catatan Ban dan Kaki-Kaki`,
                fieldName: `detailedAssessment`,
                oldValue: data.banDanKakiKaki.catatan,
                subFieldName: "banDanKakiKaki",
                subsubfieldname: "catatan",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`text-[12px] px-1 mt-1 font-semibold flex min-h-[70px] ${
              editable ? "cursor-pointer group hover:bg-[#F4622F]" : ""
            }`}
          >
            *Catatan:
            {data.banDanKakiKaki.catatan &&
            data.banDanKakiKaki.catatan.length > 0 ? (
              <div
                className={`text-[12px] font-semibold flex ${
                  data.banDanKakiKaki.catatan.length >= 4
                    ? "flex-row flex-wrap"
                    : "flex-col justify-center items-center"
                } ${editable ? "group-hover:text-white" : ""}`}
              >
                <ol
                  className={`list-disc pl-5 ${
                    data.banDanKakiKaki.catatan.length >= 4 ? "w-1/2" : "w-full"
                  }`}
                >
                  {data.banDanKakiKaki.catatan
                    .slice(
                      0,
                      data.banDanKakiKaki.catatan.length >= 4
                        ? Math.ceil(data.banDanKakiKaki.catatan.length / 2)
                        : data.banDanKakiKaki.catatan.length
                    )
                    .map((item: any, index: any) => (
                      <li key={index} className="text-[12px]">
                        {capitalizeFirstLetterOfSentences(item)}
                      </li>
                    ))}
                </ol>
                {data.banDanKakiKaki.catatan.length >= 4 && (
                  <ol className="list-disc pl-5 w-1/2">
                    {data.banDanKakiKaki.catatan
                      .slice(Math.ceil(data.banDanKakiKaki.catatan.length / 2))
                      .map((item: any, index: any) => (
                        <li key={index} className="text-[12px]">
                          {capitalizeFirstLetterOfSentences(item)}
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            ) : (
              <div className="text-[12px] font-semibold py-4">-</div>
            )}
          </div>
        </div>

        <div className="w-full  py-2 mb-2 ">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              5
            </p>
            <p className="">Test Drive</p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {testDrive.map((item, index) => (
              <PenilaianHasil
                edit={editable}
                onClick={handleClick}
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                subSubFieldName={item.part}
                beban={item.beban.toString()}
                subFieldName="testDrive"
                nilai={
                  data.testDrive[item.part] != undefined
                    ? data.testDrive[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>

          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Catatan Test Drive`,
                fieldName: `detailedAssessment`,
                oldValue: data.testDrive.catatan,
                subFieldName: "testDrive",
                subsubfieldname: "catatan",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`text-[12px] px-1 mt-1 font-semibold flex min-h-[70px] ${
              editable ? "cursor-pointer group hover:bg-[#F4622F]" : ""
            }`}
          >
            *Catatan:
            {data.testDrive.catatan && data.testDrive.catatan.length > 0 ? (
              <div
                className={`text-[12px] font-semibold flex ${
                  data.testDrive.catatan.length >= 4
                    ? "flex-row flex-wrap"
                    : "flex-col justify-center items-center"
                } ${editable ? "group-hover:text-white" : ""}`}
              >
                <ol
                  className={`list-disc pl-5 ${
                    data.testDrive.catatan.length >= 4 ? "w-1/2" : "w-full"
                  }`}
                >
                  {data.testDrive.catatan
                    .slice(
                      0,
                      data.testDrive.catatan.length >= 4
                        ? Math.ceil(data.testDrive.catatan.length / 2)
                        : data.testDrive.catatan.length
                    )
                    .map((item: any, index: any) => (
                      <li key={index} className="text-[12px]">
                        {capitalizeFirstLetterOfSentences(item)}
                      </li>
                    ))}
                </ol>
                {data.testDrive.catatan.length >= 4 && (
                  <ol className="list-disc pl-5 w-1/2">
                    {data.testDrive.catatan
                      .slice(Math.ceil(data.testDrive.catatan.length / 2))
                      .map((item: any, index: any) => (
                        <li key={index} className="text-[12px]">
                          {capitalizeFirstLetterOfSentences(item)}
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            ) : (
              <div className="text-[12px] font-semibold py-4">-</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Halaman5;

const eksteriorKendaraan = [
  { namaPart: "Daun Wiper", beban: 1, part: "daunWiper" },
  { namaPart: "Pintu Depan Kanan", beban: 2, part: "pintuDepan" },
  { namaPart: "Pintu Depan Kiri", beban: 2, part: "pintuDepanKiri" },
  { namaPart: "Pintu Belakang", beban: 2, part: "pintuBelakang" },
  { namaPart: "Kaca Jendela Kanan", beban: 1, part: "kacaJendelaKanan" },
  { namaPart: "Kaca Jendela Kiri", beban: 1, part: "kacaJendelaKiri" },
  { namaPart: "Fender kiri", beban: 1, part: "fenderKiri" },
  { namaPart: "Pintu Belakang Kiri", beban: 1, part: "pintuBelakangKiri" },
  { namaPart: "Lisplang Kiri", beban: 1, part: "lisplangKiri" },
  { namaPart: "Quarter Panel Kiri", beban: 1, part: "quarterPanelKiri" },
  { namaPart: "Spion Kiri", beban: 2, part: "spionKiri" },
  { namaPart: "Side Skirt Kiri", beban: 1, part: "sideSkirtKiri" },
];

const banDanKakiKaki = [
  { namaPart: "Ban Depan", beban: 2, part: "banDepan" },
  { namaPart: "Ban Belakang", beban: 2, part: "banBelakang" },
  { namaPart: "Racksteer", beban: 3, part: "racksteer" },
  { namaPart: "Velg Depan", beban: 2, part: "velgDepan" },
  { namaPart: "Velg Belakang", beban: 2, part: "velgBelakang" },
  { namaPart: "Karet Boot", beban: 2, part: "karetBoot" },
  { namaPart: "Disc Brake", beban: 3, part: "discBrake" },
  { namaPart: "Brake Pad", beban: 3, part: "brakePad" },
  { namaPart: "Upper-Lower Arm", beban: 3, part: "upperLowerArm" },
  { namaPart: "Master Rem", beban: 3, part: "masterRem" },
  { namaPart: "Crossmember", beban: 2, part: "crossmember" },
  { namaPart: "Shock Breaker", beban: 3, part: "shockBreaker" },
  { namaPart: "Tie Rod", beban: 3, part: "tieRod" },
  { namaPart: "Knalpot", beban: 1, part: "knalpot" },
  { namaPart: "Link Stabilizer", beban: 3, part: "linkStabilizer" },
  { namaPart: "Gardan", beban: 3, part: "gardan" },
  { namaPart: "Balljoint", beban: 3, part: "balljoint" },
];

const testDrive = [
  { namaPart: "Bunyi/Getaran", beban: 3, part: "bunyiGetaran" },
  { namaPart: "Stir Balance", beban: 2, part: "stirBalance" },
  { namaPart: "Performa Kopling", beban: 3, part: "performaKopling" },
  { namaPart: "Performa Stir", beban: 2, part: "performaStir" },
  { namaPart: "Performa Suspensi", beban: 3, part: "performaSuspensi" },
  { namaPart: "RPM", beban: 3, part: "rpm" },
  { namaPart: "Perpindahan Transmisi", beban: 3, part: "perpindahanTransmisi" },
];
