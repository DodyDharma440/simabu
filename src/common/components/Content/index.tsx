import { Box, Title } from "@mantine/core";
import React from "react";

type ContentProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children, title }) => {
  return (
    <Box px="md">
      <Title my="lg" order={2}>
        {title}
      </Title>
      {children}
    </Box>
  );
};

export default Content;
