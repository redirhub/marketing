"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";

const languages = [
  { code: "de", label: "Deutsch", flagUrl: "https://flagcdn.com/w40/de.png" },
  { code: "es", label: "Español", flagUrl: "https://flagcdn.com/w40/es.png" },
  { code: "fr", label: "Français", flagUrl: "https://flagcdn.com/w40/fr.png" },
  { code: "it", label: "Italiano", flagUrl: "https://flagcdn.com/w40/it.png" },
  { code: "pt", label: "Português", flagUrl: "https://flagcdn.com/w40/pt.png" },
  { code: "ja", label: "日本語", flagUrl: "https://flagcdn.com/w40/jp.png" },
  {
    code: "zh",
    label: "中文 (简体)",
    flagUrl: "https://flagcdn.com/w40/cn.png",
  },
  { code: "ko", label: "한국어", flagUrl: "https://flagcdn.com/w40/kr.png" },
  { code: "en", label: "English", flagUrl: "https://flagcdn.com/w40/gb.png" },
];

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
  openDirection?: "top" | "bottom";
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  openDirection = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedLanguage = languages.find(
    (lang) => lang.code === currentLanguage
  );

  // Fallback to English if language not found
  const displayLanguage =
    selectedLanguage || languages.find((lang) => lang.code === "en");

  const handleLanguageChange = (code: string) => {
    onLanguageChange(code);
    setIsOpen(false);
  };

  return (
    <Box position="relative" display="inline-block" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        bg="white"
        border="1px solid"
        borderColor="#e0e0e0"
        px={2}
        py={2}
        minW="170px"
        w="170px"
        _hover={{ bg: "gray.50" }}
        h="auto"
        borderRadius={0}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} gap="2">
          <Image
            src={displayLanguage?.flagUrl}
            alt={displayLanguage?.label}
            w={"30px"}
            h={"20px"}
          />
          <Text fontSize="13px" fontWeight="normal" color="#333">
            {displayLanguage?.label}
          </Text>{" "}
        </Box>
        <Box>
          <ChevronDownIcon
            boxSize={4}
            color="gray.500"
            transform={isOpen ? "rotate(180deg)" : "rotate(270deg)"}
            transition="transform 0.2s"
          />
        </Box>
      </Button>

      {isOpen && (
        <Box
          position="absolute"
          {...(openDirection === "top"
            ? { bottom: "calc(100% + 8px)" }
            : { top: "calc(100% + 8px)" })}
          left={0}
          w="200px"
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
          overflow="hidden"
          zIndex={1000}
        >
          <Box maxH="300px" overflowY="auto">
            {languages.map((language) => (
              <Button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                w="100%"
                justifyContent="flex-start"
                variant="ghost"
                px={4}
                py={3}
                borderRadius={0}
                bg={currentLanguage === language.code ? "blue.50" : "white"}
                _hover={{ bg: "gray.50" }}
                transition="background 0.2s"
              >
                <Flex align="center" gap={3} w="100%">
                  <Image
                    src={language.flagUrl}
                    alt={language.label}
                    w={"30px"}
                    h={"20px"}
                  />
                  <Text
                    fontSize="sm"
                    color={
                      currentLanguage === language.code
                        ? "blue.600"
                        : "gray.700"
                    }
                    fontWeight={
                      currentLanguage === language.code ? "medium" : "normal"
                    }
                  >
                    {language.label}
                  </Text>
                  {currentLanguage === language.code && (
                    <CheckIcon ml="auto" color="blue.600" boxSize={3} />
                  )}
                </Flex>
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LanguageSelector;
