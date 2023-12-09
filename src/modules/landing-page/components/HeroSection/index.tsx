import React from "react";
import { Box, Text, Title } from "@mantine/core";
import { isDark, opacityColor } from "@/common/utils/theme";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Box
      h="400px"
      sx={(theme) => ({
        position: "relative",
        overflow: "hidden",
        background:
          theme.colors[isDark(theme) ? "dark" : "gray"][isDark(theme) ? 7 : 1],
      })}
    >
      <Box
        sx={(theme) => ({
          borderRadius: "50%",
          backgroundColor: opacityColor(theme.colors.orange[5], 30),
          width: 500,
          height: 500,
          position: "absolute",
          bottom: -200,
          right: -200,
        })}
      />
      <Box
        sx={(theme) => ({
          borderRadius: "50%",
          backgroundColor: opacityColor(theme.colors.orange[5], 10),
          width: 600,
          height: 600,
          position: "absolute",
          top: -200,
          right: -200,
        })}
      />
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "0",
          right: "0",
          bottom: "0",
        }}
      >
        <Image
          src="/images/svg/hero.svg"
          alt="Hero Image"
          fill
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Box
        sx={(theme) => ({
          position: "absolute",
          width: 60,
          height: 60,
          top: theme.spacing.md,
          left: theme.spacing.md,
        })}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/images/png/logo.png"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box p="lg">
          <Text size="xs" color="dimmed">
            Selamat Datang
          </Text>
          <Title
            order={2}
            sx={(theme) => ({
              color: theme.colors.orange[5],
            })}
          >
            SIMABU
          </Title>
          <Text>Sistem Informasi Peminjaman Buku</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
