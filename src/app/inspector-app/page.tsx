// app/download/page.tsx
import Image from "next/image";
import PrimaryButton from "@/components/Button/PrimaryButton";

export default function DownloadPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Download InspectorApp
        </h1>
        <p className="text-gray-600 mb-6">
          InspectorApp membantu Anda dalam proses inspeksi dengan efisien dan
          cepat. Tersedia untuk perangkat desktop.
        </p>

        <div className="mb-6">
          <Image
            src="/app-preview.png"
            alt="Inspector App Preview"
            width={400}
            height={300}
            className="mx-auto rounded-md shadow-sm"
          />
        </div>

        <a href="/InspectorApp.zip" download>
          <PrimaryButton>Download Aplikasi</PrimaryButton>
        </a>
      </div>
    </main>
  );
}
