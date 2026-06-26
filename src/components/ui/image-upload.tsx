"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  maxFiles?: number;
}

export function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
  maxFiles = 1,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(true);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-xl border border-border shadow-sm"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="h-8 w-8 shadow-sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
              sizes="200px"
            />
          </div>
        ))}
      </div>
      
      {value.length < maxFiles && (
        <CldUploadWidget 
          onSuccess={onUpload} 
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ipmil-uploads"}
          options={{ maxFiles: maxFiles - value.length }}
        >
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <Button
                type="button"
                disabled={disabled}
                variant="outline"
                onClick={onClick}
                className="w-full sm:w-auto flex items-center gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <ImagePlus className="h-4 w-4" />
                Upload Gambar
              </Button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
