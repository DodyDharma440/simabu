import React from "react";
import { Box, Grid } from "@mantine/core";
import { LoginForm } from "..";

const AuthContainer = () => {
  return (
    <Grid sx={{ height: "100vh" }}>
      <Grid.Col span={12} md={5}>
        <LoginForm />
      </Grid.Col>
      <Grid.Col span={12} md={7}>
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            backgroundImage: theme.fn.linearGradient(
              45,
              theme.colors.orange[6],
              theme.colors.orange[4]
            ),
          })}
        />
      </Grid.Col>
    </Grid>
  );
};

export default AuthContainer;
