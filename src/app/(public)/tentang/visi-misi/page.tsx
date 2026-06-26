import { getVisionMission } from "@/actions/organization";
import { Target, Lightbulb, Compass, Award } from "lucide-react";

export const metadata = {
  title: "Visi & Misi | Tentang",
};

export default async function VisiMisiPage() {
  const vm = await getVisionMission();

  return (
    <div className="pt-24 pb-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-heading">Visi & Misi</h1>
            <p className="text-xl text-muted-foreground">
              Arah dan tujuan utama organisasi dalam menjalankan setiap aktivitasnya.
            </p>
          </div>

          {/* Visi */}
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 shadow-xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className="h-20 w-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold font-heading">Visi Organisasi</h2>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/90">
                "{vm?.vision || "Visi organisasi belum ditambahkan."}"
              </p>
            </div>
          </div>

          {/* Misi */}
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-4 text-center">
              <Compass className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold font-heading">Misi Organisasi</h2>
              <Compass className="h-8 w-8 text-primary" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {vm?.missions && vm.missions.length > 0 ? (
                vm.missions.map((mission, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all group"
                  >
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {index + 1}
                    </div>
                    <p className="text-lg text-muted-foreground pt-2 font-medium">
                      {mission}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground p-12 border border-dashed rounded-xl">
                  Misi organisasi belum ditambahkan.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
