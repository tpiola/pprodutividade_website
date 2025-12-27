// Preconfigured storage helpers for Manus WebDev templates
// Uses the Biz-provided storage proxy (Authorization: Bearer <token>)

import { ENV } from './_core/env';

type StorageConfig = { baseUrl: string; apiKey: string };

function getStorageConfig(): StorageConfig {
  const baseUrl = ENV.forgeApiUrl;
  const apiKey = ENV.forgeApiKey;

  if (!baseUrl || !apiKey) {
    // DEV MODE: Return mock config to avoid breaking the app
    console.warn(
      "⚠️  DEV MODE: Storage proxy credentials missing. Using mock storage."
    );
    return { 
      baseUrl: "https://mock-storage.example.com", 
      apiKey: "mock-key" 
    };
  }

  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}

function buildUploadUrl(baseUrl: string, relKey: string): URL {
  const url = new URL("v1/storage/upload", ensureTrailingSlash(baseUrl));
  url.searchParams.set("path", normalizeKey(relKey));
  return url;
}

async function buildDownloadUrl(
  baseUrl: string,
  relKey: string,
  apiKey: string
): Promise<string> {
  const downloadApiUrl = new URL(
    "v1/storage/downloadUrl",
    ensureTrailingSlash(baseUrl)
  );
  downloadApiUrl.searchParams.set("path", normalizeKey(relKey));
  const response = await fetch(downloadApiUrl, {
    method: "GET",
    headers: buildAuthHeaders(apiKey),
  });
  return (await response.json()).url;
}

function ensureTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

function toFormData(
  data: Buffer | Uint8Array | string,
  contentType: string,
  fileName: string
): FormData {
  const blob =
    typeof data === "string"
      ? new Blob([data], { type: contentType })
      : new Blob([data as any], { type: contentType });
  const form = new FormData();
  form.append("file", blob, fileName || "file");
  return form;
}

function buildAuthHeaders(apiKey: string): HeadersInit {
  return { Authorization: `Bearer ${apiKey}` };
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const { baseUrl, apiKey } = getStorageConfig();
  
  // DEV MODE: Return placeholder URL if using mock config
  if (baseUrl === "https://mock-storage.example.com") {
    console.warn('⚠️  DEV MODE: Using mock storage. File not actually uploaded.');
    const key = normalizeKey(relKey);
    return { 
      key, 
      url: `data:text/plain;base64,${Buffer.from('Mock file: ' + key).toString('base64')}`
    };
  }
  
  try {
    const key = normalizeKey(relKey);
    const uploadUrl = buildUploadUrl(baseUrl, key);
    const formData = toFormData(data, contentType, key.split("/").pop() ?? key);
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: buildAuthHeaders(apiKey),
      body: formData,
    });

    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText);
      throw new Error(
        `Storage upload failed (${response.status} ${response.statusText}): ${message}`
      );
    }
    const url = (await response.json()).url;
    return { key, url };
  } catch (err) {
    console.error('⚠️  Erro ao fazer upload para storage:', err.message);
    const key = normalizeKey(relKey);
    return { 
      key, 
      url: `data:text/plain;base64,${Buffer.from('Error uploading: ' + key).toString('base64')}`
    };
  }
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string; }> {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  
  // DEV MODE: Return placeholder URL if using mock config
  if (baseUrl === "https://mock-storage.example.com") {
    console.warn('⚠️  DEV MODE: Using mock storage. File not actually retrieved.');
    return {
      key,
      url: `data:text/plain;base64,${Buffer.from('Mock file: ' + key).toString('base64')}`,
    };
  }
  
  try {
    return {
      key,
      url: await buildDownloadUrl(baseUrl, key, apiKey),
    };
  } catch (err) {
    console.error('⚠️  Erro ao obter URL de download:', err.message);
    return {
      key,
      url: `data:text/plain;base64,${Buffer.from('Error downloading: ' + key).toString('base64')}`,
    };
  }
}
