import { showNotification } from "@mantine/notifications";

type RemoveEmptyValueOptions = {
  includeString?: boolean;
  includeNumber?: boolean;
};

const defaultOptions: RemoveEmptyValueOptions = {
  includeNumber: false,
  includeString: false,
};

export const removeEmptyValue = <
  T extends Object = {},
  R extends Partial<T> = Partial<T>
>(
  data: T,
  options: RemoveEmptyValueOptions = defaultOptions
) => {
  const removedData = { ...data } as unknown as R;

  return Object.fromEntries(
    Object.entries(removedData).filter(([_, v]) => {
      const isNullOrUndefined = v !== null && typeof v !== "undefined";

      if (options.includeNumber && options.includeString) {
        return Boolean(v);
      }

      if (options.includeNumber) {
        return isNullOrUndefined || v !== 0;
      }

      if (options.includeString) {
        return isNullOrUndefined || v !== "";
      }

      return isNullOrUndefined;
    })
  ) as R;
};

export const displayFileSize = (size: number) => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    Number((size / Math.pow(1024, i)).toFixed(2)) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

export const getPathFilename = (path: string) => {
  const arrayFilePath = path.split("/");
  const fileName = arrayFilePath[arrayFilePath.length - 1];
  return fileName;
};

export const saveFile = async (fileUrl: string, fileName: string) => {
  try {
    const fileRes = await fetch(fileUrl);
    if (fileRes.ok) {
      const blob = await fileRes.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
    } else {
      throw new Error("File gagal dimuat");
    }
  } catch (error) {
    showNotification({
      title: "Error",
      message: "File gagal dimuat",
      autoClose: 5000,
      color: "red",
    });
  }
};
