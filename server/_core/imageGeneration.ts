/**
 * Image generation helper using internal ImageService
 *
 * Example usage:
 *   const { url: imageUrl } = await generateImage({
 *     prompt: "A serene landscape with mountains"
 *   });
 *
 * For editing:
 *   const { url: imageUrl } = await generateImage({
 *     prompt: "Add a rainbow to this landscape",
 *     originalImages: [{
 *       url: "https://example.com/original.jpg",
 *       mimeType: "image/jpeg"
 *     }]
 *   });
 */
import { storagePut } from "server/storage";
import { ENV } from "./env";

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
};

export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  // DEV MODE: Return placeholder if API credentials are not configured
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn(
      '⚠️  DEV MODE: BUILT_IN_FORGE_API_URL ou BUILT_IN_FORGE_API_KEY não configurados. Retornando placeholder.'
    );
    return {
      url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" fill="%23999"%3EImagem Gerada (Placeholder)%3C/text%3E%3C/svg%3E',
    };
  }

  try {
    // Build the full URL by appending the service path to the base URL
    const baseUrl = ENV.forgeApiUrl.endsWith("/")
      ? ENV.forgeApiUrl
      : `${ENV.forgeApiUrl}/`;
    const fullUrl = new URL(
      "images.v1.ImageService/GenerateImage",
      baseUrl
    ).toString();

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "connect-protocol-version": "1",
        authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        prompt: options.prompt,
        original_images: options.originalImages || [],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `Image generation request failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
    }

    const result = (await response.json()) as {
      image: {
        b64Json: string;
        mimeType: string;
      };
    };
    const base64Data = result.image.b64Json;
    const buffer = Buffer.from(base64Data, "base64");

    // Save to S3
    const { url } = await storagePut(
      `generated/${Date.now()}.png`,
      buffer,
      result.image.mimeType
    );
    return {
      url,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('⚠️  Erro ao gerar imagem:', errorMessage);
    // Return placeholder on error
    return {
      url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" fill="%23999"%3EImagem Gerada (Erro)%3C/text%3E%3C/svg%3E',
    };
  }
}
