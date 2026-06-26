import { getOrganizationProfile, getVisionMission } from "@/actions/organization";
import { ProfilForm } from "./profil-form";
import { VisiMisiForm } from "./visi-misi-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Profil Organisasi | Dashboard",
};

export default async function ProfilOrganisasiPage() {
  const [profile, visionMission] = await Promise.all([
    getOrganizationProfile(),
    getVisionMission(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Profil Organisasi</h1>
        <p className="text-muted-foreground">
          Kelola informasi dasar, identitas, dan visi misi organisasi.
        </p>
      </div>

      <Tabs defaultValue="profil" className="space-y-6">
        <TabsList className="bg-background border">
          <TabsTrigger value="profil">Profil Dasar</TabsTrigger>
          <TabsTrigger value="visimisi">Visi & Misi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profil" className="space-y-4">
          <ProfilForm initialData={profile} />
        </TabsContent>
        
        <TabsContent value="visimisi" className="space-y-4">
          <VisiMisiForm initialData={visionMission} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
