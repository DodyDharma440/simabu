import { showNotification } from "@mantine/notifications";
import { NextApiResponse } from "next";

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

export type Formatter<T extends object = any> = {
  label: keyof T | ((item: T) => string);
  value: keyof T | ((item: T) => string);
};

export type SelectOption = {
  label: string;
  value: string;
};

export const generateOptions = <T extends object = {}>(
  values: T[],
  format: Formatter<T>
) => {
  return values.map((item) => {
    const label = (
      format.label instanceof Function
        ? format.label(item)
        : (item[format.label] as any)
    ).toString();
    const value = (
      format.value instanceof Function
        ? format.value(item)
        : (item[format.value] as any)
    ).toString();
    return {
      label,
      value,
    } as SelectOption;
  });
};

export const getRandomStr = () => {
  const length = 6;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";

  for (let i = 0, n = charset.length; i < length; ++i) {
    randomStr += charset.charAt(Math.floor(Math.random() * n));
  }

  return randomStr;
};

export const makeFileName = (file: any, res: NextApiResponse) => {
  const fileUploaded = file;
  const arrayFileName = fileUploaded.originalname.split(".");
  const fileExt = arrayFileName[arrayFileName.length - 1]
    .split(" ")
    .join("")
    .toLowerCase();

  if (fileExt !== "jpg" && fileExt !== "png" && fileExt !== "jpeg") {
    return res.status(409).json({
      message: `Hanya file jpg, jpeg atau png yang diijinkan. Ekstensi file anda .${fileExt}`,
    });
  }

  arrayFileName[0] = `${getRandomStr()}-${new Date().getTime()}`;
  const newImageName = arrayFileName.join(".");

  return newImageName;
};
