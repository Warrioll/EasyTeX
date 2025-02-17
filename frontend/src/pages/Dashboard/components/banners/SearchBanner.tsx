import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import {
  Box,
  Button,
  Combobox,
  Flex,
  Group,
  Input,
  InputBase,
  Text,
  TextInput,
  Title,
  useCombobox,
} from '@mantine/core';
import classes from './banners.module.css';

type searchBannerPropsType = {
  createDocumentModal: any;
  inputState: [string, React.Dispatch<React.SetStateAction<string>>];
  comboboxState: [string, React.Dispatch<React.SetStateAction<string>>];
};

export default function SearchBanner({
  createDocumentModal,
  inputState,
  comboboxState,
}: searchBannerPropsType) {
  const [comboboxValue, setComboboxValue] = comboboxState;
  const [inputValue, setInputValue] = inputState;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const toTabLabelConverterCombobox = (): any => {
    switch (comboboxValue) {
      case 'all':
        return 'All';
      case 'article':
        return 'Article';
      case 'report':
        return 'Report';
      case 'book':
        return 'Book';
      case 'letter':
        return 'Letter';
      case 'beamer':
        return 'Presentation';
      case 'slides':
        return 'Slide';
      default:
        return '';
    }
  };

  const chooseColor = (): string => {
    switch (comboboxValue) {
      case 'all':
        return 'cyan';
      case 'article':
        return 'blue';
      case 'report':
        return 'grape';
      case 'book':
        return 'teal';
      case 'letter':
        return 'lime';
      case 'beamer':
        return 'orange';
      case 'slides':
        return 'pink';
      default:
        return '';
    }
  };

  return (
    <Group
      p="xl"
      className={classes.banner}
      w="90%"
      style={{
        background: `linear-gradient(to right,var(--mantine-color-${chooseColor()}-7),var(--mantine-color-${chooseColor()}-3)`,
      }}
      c="var(--mantine-color-white)"
      justify="flex-start"
    >
      <Text fz="4.5rem" mr="md" ml="sm" mb="-13px">
        <FaSearch />
      </Text>
      <Box w="90%" mb="0.4rem">
        <Flex align="center" gap="md">
          <Text mb="0.5rem" fz="1.7rem">
            <b>Welcome to EasyTeX! </b>
          </Text>
          <Text mt="3px">Search for your documents.</Text>
        </Flex>

        <Group justify="space-between">
          <Flex
            bg="var(--mantine-color-white)"
            p="0.02rem"
            pl="lg"
            pr="0.1rem"
            className={classes.searchBar}
            gap="sm"
          >
            <Group>
              <Text fz="0.9rem" mb="1px" c="var(--mantine-color-gray-6)">
                Name:
              </Text>

              <TextInput
                variant="unstyled"
                placeholder=""
                w="40rem"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <Button
                variant="transparent"
                p="0px"
                m="0px"
                fz="1.5rem"
                c="var(--mantine-color-gray-6)"
                onClick={() => setInputValue('')}
              >
                <IoIosClose />
              </Button>
            </Group>
            <Group gap="md">
              <Text fz="0.9rem" mb="4px" c="var(--mantine-color-gray-6)">
                Type:
              </Text>

              <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                  setComboboxValue(val);
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    variant="unstyled"
                    w="10rem"
                  >
                    {toTabLabelConverterCombobox() || (
                      <Input.Placeholder>Pick value</Input.Placeholder>
                    )}
                  </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                  <Combobox.Options>
                    <Combobox.Option value="all" key="all">
                      All
                    </Combobox.Option>
                    <Combobox.Option value="article" key="article">
                      Article
                    </Combobox.Option>
                    <Combobox.Option value="report" key="report">
                      Report
                    </Combobox.Option>
                    <Combobox.Option value="book" key="book">
                      Book
                    </Combobox.Option>
                    <Combobox.Option value="letter" key="letter">
                      Letter
                    </Combobox.Option>
                    <Combobox.Option value="beamer" key="beamer">
                      Presentation
                    </Combobox.Option>
                    <Combobox.Option value="slides" key="slides">
                      Slides
                    </Combobox.Option>
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
            </Group>
          </Flex>

          <Button
            bg="var(--mantine-color-white)"
            c={`var(--mantine-color-${chooseColor()}-7)`}
            onClick={() => createDocumentModal.modalHandlers.open()}
          >
            Create new Document
          </Button>
        </Group>
      </Box>
    </Group>
  );
}
