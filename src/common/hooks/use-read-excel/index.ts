import React, { useState, useCallback, useMemo } from "react";
import { excelDateFormat } from "../../utils/dates";

export type ConverterImportExcel<K = string> = {
  key: K;
  formatter?: (value: string | number) => any;
  isDate?: boolean;
  dateFormat?: string;
  defaultValue?: any;
};

export type ImportExcelValidator<K = string> = {
  key: K;
  message: string;
  enums?: any[];
  isEnum?: boolean;
  isRequired?: boolean;
  isEmail?: boolean;
};

export type ErrorImportExcel = {
  index: number;
  errors: string[];
};

export type UseReadExcelContext<T, D = T> = {
  previewOpener?: () => void;
  converters?: (
    row: T
  ) => ConverterImportExcel<keyof T>[] | ConverterImportExcel<keyof T>[];
  validators?: ImportExcelValidator<keyof D>[];
  onBeforePreview?: (rows: {
    convertedRows: D[];
    setConvertedRows: React.Dispatch<React.SetStateAction<D[]>>;
  }) => Promise<void>;
};

export const useReadExcel = <T extends Record<string, any>, D extends T = T>({
  previewOpener,
  converters,
  validators,
  onBeforePreview,
}: UseReadExcelContext<T, D>) => {
  const [errorsImport, setErrorsImport] = useState<ErrorImportExcel[]>([]);
  const [convertedRows, setConvertedRows] = useState<D[]>([]);
  const [fileName, setFileName] = useState("");
  const isError = useMemo(() => {
    return errorsImport.length > 0;
  }, [errorsImport]);

  const convertRows = useCallback(
    (data: T[]) => {
      return data.map((row) => {
        const data: Partial<T> = { ...row };

        const generateValue = (k: ConverterImportExcel<keyof T>) => {
          if (k instanceof Object) {
            const { isDate, defaultValue, formatter, key, dateFormat } = k;

            if (row[key]) {
              if (isDate) {
                data[key] = excelDateFormat(
                  row[key.toString()],
                  dateFormat || "YYYY-MM-DD"
                ) as T[keyof T];
                return;
              }

              if (defaultValue) {
                data[key] = defaultValue;
                return;
              }

              if (formatter && formatter instanceof Function) {
                data[key] = formatter(row[key.toString()]);
                return;
              }

              data[key] = row[key];
            }
          }
        };

        if (converters) {
          if (converters instanceof Array) {
            converters.forEach(generateValue);
          }

          if (converters instanceof Function) {
            converters(row).forEach(generateValue);
          }
        }

        return data as D;
      });
    },
    [converters]
  );

  const validateRows = useCallback(
    (rows: ReturnType<typeof convertRows> = []) => {
      const _errors: typeof errorsImport = [];

      if (validators) {
        rows.forEach((row, index) => {
          const _error: ErrorImportExcel["errors"] = [];

          validators.forEach(
            ({ key, message, enums, isEnum, isRequired, isEmail }) => {
              const value = row[key];

              if (isRequired) {
                !value && _error.push(message);
              }

              if (isEnum && enums) {
                const stringifyEnums = enums.map((en) => en.toString());

                !stringifyEnums.includes(value?.toString()) &&
                  _error.push(message);
              }

              if (isEmail) {
                !/\S+@\S+\.\S+/.test(value) && _error.push(message);
              }
            }
          );

          if (_error.length > 0) {
            _errors.push({
              index,
              errors: _error,
            });
          }
        });
      }
      setErrorsImport(_errors);
    },
    [validators]
  );

  const onReadFile = useCallback(
    async (data: T[], filename?: string) => {
      const _convertedRows = convertRows(data);
      setFileName(filename || "");
      validators && validateRows(_convertedRows);
      if (onBeforePreview) {
        await onBeforePreview({
          convertedRows: _convertedRows,
          setConvertedRows,
        });
        previewOpener && previewOpener();
      } else {
        setConvertedRows(_convertedRows);
        previewOpener && previewOpener();
      }
    },
    [convertRows, validators, validateRows, onBeforePreview, previewOpener]
  );

  return {
    onReadFile,
    convertedRows,
    isError,
    fileName,
    errorsImport,
    clearErrors: () => setErrorsImport([]),
  };
};

export default useReadExcel;
