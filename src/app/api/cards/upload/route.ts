import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import sharp from "sharp"

export const runtime = "nodejs" // sharp requires Node.js runtime

const IMAGE_SIZES = {
  micro: 80,
  thumb: 150,
  card: 400,
  full: 0, // 0 = original size
}

const BUCKET = "cards"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const slug = formData.get("slug") as string | null
    const folder = (formData.get("folder") as string | null) || "base-game"

    if (!file || !slug) {
      return NextResponse.json(
        { error: "Missing file or slug" },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const supabase = createAdminClient()
    const imagePaths: Record<string, string> = {}

    for (const [sizeName, width] of Object.entries(IMAGE_SIZES)) {
      let resizedBuffer: Buffer
      if (width === 0) {
        // Full size - convert to webp
        resizedBuffer = await sharp(buffer).webp({ quality: 90 }).toBuffer()
      } else {
        resizedBuffer = await sharp(buffer)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 90 })
          .toBuffer()
      }

      const storagePath = `${folder}/${sizeName}/${slug}.webp`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, resizedBuffer, {
          contentType: "image/webp",
          upsert: true,
        })

      if (uploadError) {
        console.error(`Upload error for ${sizeName}:`, uploadError.message)
        return NextResponse.json(
          { error: `Storage upload failed: ${uploadError.message}` },
          { status: 500 }
        )
      }

      imagePaths[sizeName] = storagePath
    }

    return NextResponse.json({ success: true, paths: imagePaths })
  } catch (error: any) {
    console.error("API Upload error:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
