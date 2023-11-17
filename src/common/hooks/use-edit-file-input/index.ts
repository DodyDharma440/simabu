import { useCallback, useMemo, useState } from "react";
import { useMantineTheme, CSSObject } from "@mantine/core";
import { getPathFilename } from "@/common/utils/data";
import { isDark } from "../../utils/theme";

export const useEditFileInput = () => {
  const theme = useMantineTheme();
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const onResetFileUrl = useCallback(() => {
    setFileUrl(null);
  }, []);

  const placeholderStyle = useMemo((): CSSObject => {
    return {
      color: fileUrl
        ? `${isDark(theme) ? theme.colors.dark[0] : "#4d4d4d"} !important`
        : undefined,
    };
  }, [fileUrl, theme]);

  const placeholder = useMemo(() => {
    return fileUrl ? getPathFilename(fileUrl) : "Pilih File";
  }, [fileUrl]);

  return {
    fileUrl,
    setFileUrl,
    onResetFileUrl,
    placeholderStyle,
    placeholder,
  };
};
