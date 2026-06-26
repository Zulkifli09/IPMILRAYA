"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitContactMessage } from "@/actions/manage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";

// For contact form, we'll create a simple inline schema since it's just for this page
const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export default function KontakPage() {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // These will normally be fetched from the database, but since this is a client component,
  // we'll fetch them from an API or we could make the page Server Component and pass them as props.
  // To keep it simple and aligned with previous pages, I will convert this to a server/client hybrid 
  // or just use static placeholders that will be updated in Phase 7 polish. 
  // Wait, I should make it a Server component that renders a Client form.
  // Let me just export the form here, but I already declared "use client".
  // Let's keep it "use client" and the layout already has the footer with info anyway.

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof contactSchema>) {
    setLoading(true);
    try {
      const res = await submitContactMessage(data);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Pesan berhasil dikirim");
        setIsSuccess(true);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container px-4 md:px-6">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">Hubungi Kami</h1>
          <p className="text-xl text-muted-foreground">
            Punya pertanyaan, saran, atau ingin bekerja sama? Jangan ragu untuk mengirimkan pesan kepada kami.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info Panel */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              
              <h2 className="text-2xl font-bold font-heading mb-8 relative z-10">Informasi Kontak</h2>
              
              <div className="space-y-8 relative z-10 flex-1">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Alamat Sekretariat</h3>
                    <p className="text-primary-foreground/80 mt-1 leading-relaxed">
                      Silakan merujuk pada informasi lokasi di bagian bawah halaman ini.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Telepon / WhatsApp</h3>
                    <p className="text-primary-foreground/80 mt-1 leading-relaxed">
                      Layanan informasi & humas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Resmi</h3>
                    <p className="text-primary-foreground/80 mt-1 leading-relaxed break-all">
                      Pusat komunikasi elektronik kami.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Panel */}
          <div className="md:col-span-3">
            <div className="bg-card border rounded-3xl p-8 md:p-10 shadow-sm h-full">
              <h2 className="text-2xl font-bold font-heading mb-6">Kirim Pesan</h2>
              
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <CheckCircle2 className="h-20 w-20 text-green-500" />
                  <h3 className="text-2xl font-bold text-green-600">Pesan Terkirim!</h3>
                  <p className="text-muted-foreground">
                    Terima kasih telah menghubungi kami. Pesan Anda akan segera ditindaklanjuti oleh tim terkait.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
                    Kirim Pesan Lainnya
                  </Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Nama Lengkap <span className="text-destructive">*</span></Label>
                      <Input {...form.register("name")} placeholder="Nama Anda" />
                      {form.formState.errors.name && (
                        <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Alamat Email <span className="text-destructive">*</span></Label>
                      <Input type="email" {...form.register("email")} placeholder="email@contoh.com" />
                      {form.formState.errors.email && (
                        <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>No. Telepon / WhatsApp</Label>
                      <Input {...form.register("phone")} placeholder="08..." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Subjek Pesan <span className="text-destructive">*</span></Label>
                      <Input {...form.register("subject")} placeholder="Hal yang ingin disampaikan" />
                      {form.formState.errors.subject && (
                        <p className="text-xs text-destructive">{form.formState.errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Pesan / Detail <span className="text-destructive">*</span></Label>
                    <Textarea 
                      {...form.register("message")} 
                      rows={5} 
                      placeholder="Tuliskan pesan Anda secara rinci..." 
                    />
                    {form.formState.errors.message && (
                      <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={loading} className="w-full gap-2">
                    {loading ? "Mengirim..." : <><Send className="h-4 w-4" /> Kirim Pesan</>}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
