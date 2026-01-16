'use client'

import { Box, Heading, Link } from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react'

interface Heading {
  text: string
  id: string
  level: number
}

interface TableOfContentsProps {
  content: any[]
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Extract headings from content
    if (!Array.isArray(content)) return

    const extractedHeadings = content
      .filter((block) => block._type === 'block' && block.style?.match(/^h[2-3]$/))
      .map((block, index) => {
        const text = block.children?.map((child: any) => child.text).join('') || ''
        const id = `heading-${index}`
        const level = parseInt(block.style.replace('h', ''))
        return { text, id, level }
      })

    setHeadings(extractedHeadings)
  }, [content])

  useEffect(() => {
    if (headings.length === 0) return

    // Disconnect existing observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.5,
      }
    )

  // Schedule observation after render
  const timeout = setTimeout(() => {
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })
  }, 0)

  return () => {
    clearTimeout(timeout)
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
  }
  }, [headings])

  if (headings.length === 0) return null

  return (
    <Box
      as="aside"
      position="sticky"
      top="80px"
      height="fit-content"
      maxH="calc(100vh - 80px)"
      overflowY="auto"
      p={6}
      bg="warning.100"
      borderRadius="12px"
      border="none"
      boxShadow="none"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'warning.100',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'warning.100',
        },
      }}
    >
      <Heading
        as="h3"
        fontSize="18px"
        fontWeight="600"
        textTransform="capitalize"
        letterSpacing="0px"
        color="gray.darkGray"
        mb={4}
      >
        Table of Contents
      </Heading>

      <Box display="flex" flexDirection="column" gap={2}>
        {headings.map(({ text, id, level }) => (
          <Link
            key={id}
            href={`#${id}`}
            fontSize="sm"
            color={activeId === id ? '#7D65DB' : 'gray.600'}
            fontWeight={activeId === id ? '600' : '400'}
            pl={level === 3 ? 4 : 0}
            py={1}
            _hover={{
              color: '#7D65DB',
              textDecoration: 'none',
            }}
            css={{ transition: 'all 0.2s' }}
            lineHeight="1.5"
            display="flex"
            alignItems="flex-start"
          >
            {text}
          </Link>
        ))}
      </Box>
    </Box>
  )
}
