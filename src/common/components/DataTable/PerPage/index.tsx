import React, { useMemo } from "react";
import { Group, Select, Text } from "@mantine/core";

export type DataTablePerPageProps = {
  options?: number[];
  perPage: number;
  onChange: (value: number) => void;
};

const DataTablePerPage: React.FC<DataTablePerPageProps> = ({
  options,
  perPage,
  onChange,
}) => {
  const perPageOpts = useMemo(() => {
    return (options || [10, 20, 30, 40, 50]).map((el) => `${el}`);
  }, [options]);

  return (
    <Group spacing="xs">
      <Text size="sm" color="dimmed">
        Tampilkan
      </Text>
      <Select
        searchable={false}
        size="sm"
        data-styles="default"
        styles={{
          input: {
            width: 70,
          },
        }}
        value={`${perPage}`}
        onChange={(val) => onChange(Number(val))}
        data={perPageOpts}
        placeholder="10"
      />{" "}
      <Text size="sm" color="dimmed">
        Data
      </Text>
    </Group>
  );
};

export default DataTablePerPage;
