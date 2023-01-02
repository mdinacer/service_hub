export function getFileExtension(fileName: string) {
  const parts = fileName.split('.');

  if (parts.length < 2) {
    return null;
  }

  return parts[parts.length - 1].toLowerCase();
}

export function getFileName(fileName: string) {
  const parts = fileName.split('.');

  if (parts.length < 2) {
    return null;
  }

  return parts[0].toLowerCase();
}

export function getFileSize(fileSizeInBytes: number): string {
  const kilobytes = fileSizeInBytes / 1024;
  const megabytes = kilobytes / 1024;
  const gigabytes = megabytes / 1024;

  if (gigabytes > 1) {
    return `${gigabytes.toFixed(2)} Gb`;
  } else if (megabytes > 1) {
    return `${megabytes.toFixed(2)} Mb`;
  } else {
    return `${kilobytes.toFixed(2)} Kb`;
  }
}
