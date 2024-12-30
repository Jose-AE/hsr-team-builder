import React, { useCallback, type ChangeEvent, type FC } from "react";

import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface CharacterSearchProps {
  onChange?: (value: string) => void;
  onClear?: () => void;
}

export const CharacterSearch: FC<CharacterSearchProps> = ({ onChange, onClear }) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onClear?.();
  }, [onClear]);

  return (
    <>
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch />
          </InputLeftElement>
          <Input
            onChange={handleChange}
            autoComplete="off"
            type="search"
            placeholder=""
          />
        </InputGroup>
      </FormControl>

      <Tooltip label="Clear selected characters">
        <IconButton
          onClick={handleClear}
          aria-label="Clear"
          icon={<FaTimes />}
        />
      </Tooltip>
    </>
  );
};
