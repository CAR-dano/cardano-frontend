import React from "react";
import { Card, CardContent } from "../card";
import { Button } from "../button";
import Image from "next/image";

function CardFindCard() {
  return (
    <Card className="w-full max-w-4xl flex flex-col md:flex-row card-car-shadow p-4 border-0 rounded-3xl">
      {/* Gambar */}
      <Image
        className="rounded-2xl w-full md:w-auto"
        src="https://images.unsplash.com/photo-1549927681-0b673b8243ab?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Gambar mobil Lamborghini Aventador"
        width={450}
        height={300}
      />

      {/* Konten */}
      <CardContent className="w-full md:w-2/3 flex flex-col justify-between p-0 px-2 md:px-6 mt-2 md:mt-0">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#0A242F]">
            AB 1234 CD
          </h2>
          <h3 className="text-lg md:text-2xl font-semibold text-[#E24717]">
            Lamborghini Aventador LP-400
          </h3>
          <p className="text-sm md:text-lg text-neutral-700 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus.
          </p>
        </div>

        {/* Tombol */}
        <Button
          variant="outline"
          disabled={true}
          className="py-4 md:py-5 text-xl md:text-2xl font-semibold mt-4 border-[2.5px] border-[#308FD4] text-[#308FD4] hover:bg-[#308FD4] hover:text-white transition-all"
        >
          Cek Detail
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardFindCard;
