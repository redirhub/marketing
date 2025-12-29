import { useState, useCallback } from 'react'
import {
  Box,
  Button,
  Card,
  Flex,
  Stack,
  Text,
  TextArea,
  Spinner,
  Label,
  Heading,
  Badge,
} from '@sanity/ui'
import { SparklesIcon, DocumentTextIcon, CheckmarkIcon } from '@sanity/icons'
import { useDocumentOperation } from 'sanity'
import type { DocumentActionProps } from 'sanity'

interface GeneratedPost {
  title?: string
  excerpt?: string
  tags?: string[]
  content?: any[]
  faqs?: Array<{ question: string; answer: string }>
}

interface Suggestions {
  title?: string
  excerpt?: string
  tags?: string[]
  faqs?: Array<{ question: string; answer: string }>
}

export function AIAssistantAction(props: DocumentActionProps) {
  const { draft, published, id, onComplete } = props
  const { patch } = useDocumentOperation(id, 'post')
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(
    null
  )
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null)
  const [appliedFields, setAppliedFields] = useState<Record<string, boolean>>(
    {}
  )
  const [error, setError] = useState<string | null>(null)

  // Determine mode based on content (check both draft and published)
  const currentDoc = draft || published
  const hasContent = currentDoc?.content && Array.isArray(currentDoc.content) && currentDoc.content.length > 0
  const mode = hasContent ? 'suggestions' : 'generate'

  // Generate full post from prompt
  const handleGeneratePost = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setError(null)
    setGeneratedPost(null)

    try {
      const response = await fetch('/api/sanity/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          locale: currentDoc?.locale || 'en',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate post')
      }

      const data = await response.json()
      setGeneratedPost(data)
    } catch (err) {
      console.error('Error generating post:', err)
      setError(
        (err as Error).message || 'Failed to generate post content'
      )
    } finally {
      setIsGenerating(false)
    }
  }, [prompt, currentDoc])

  // Generate field suggestions
  const handleGenerateSuggestions = useCallback(async () => {
    if (!currentDoc?.content || !Array.isArray(currentDoc.content) || currentDoc.content.length === 0) {
      setError('Please add content first before generating suggestions')
      return
    }

    setIsGenerating(true)
    setError(null)
    setSuggestions(null)
    setAppliedFields({})

    try {
      const fields = ['title', 'excerpt', 'tags', 'faqs']
      const results: Suggestions = {}

      for (const field of fields) {
        const response = await fetch('/api/sanity/generate-field', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            field,
            content: currentDoc.content,
            locale: currentDoc?.locale || 'en',
          }),
        })

        if (response.ok) {
          const data = await response.json()
          results[field as keyof Suggestions] = data.value
        }
      }

      setSuggestions(results)
    } catch (err) {
      console.error('Error generating suggestions:', err)
      setError((err as Error).message || 'Failed to generate suggestions')
    } finally {
      setIsGenerating(false)
    }
  }, [currentDoc])

  // Insert full generated post
  const handleInsertPost = useCallback(() => {
    if (!generatedPost) return

    const patchData: any = {}

    if (generatedPost.title) patchData.title = generatedPost.title
    if (generatedPost.excerpt) patchData.excerpt = generatedPost.excerpt
    if (generatedPost.tags?.length) patchData.tags = generatedPost.tags
    if (generatedPost.content) patchData.content = generatedPost.content
    if (generatedPost.faqs?.length) patchData.faqs = generatedPost.faqs

    // Auto-complete publishedAt if not set
    if (!currentDoc?.publishedAt) {
      patchData.publishedAt = new Date().toISOString()
    }

    // Auto-complete locale if not set
    if (!currentDoc?.locale) {
      patchData.locale = 'en'
    }

    patch.execute([{ set: patchData }])

    onComplete()
    setIsOpen(false)
    setPrompt('')
    setGeneratedPost(null)
  }, [generatedPost, currentDoc, patch, onComplete])

  // Apply individual field suggestion
  const handleApplyField = useCallback(
    (fieldName: string, value: any) => {
      let formattedValue = value

      if (fieldName === 'faqs' && Array.isArray(value)) {
        formattedValue = value.map((faq) => ({
          _type: 'object',
          _key: Math.random().toString(36).substring(2, 11),
          question: faq.question || '',
          answer: faq.answer || '',
        }))
      }

      patch.execute([{ set: { [fieldName]: formattedValue } }])
      setAppliedFields((prev) => ({ ...prev, [fieldName]: true }))
    },
    [patch]
  )

  const handleClose = () => {
    setIsOpen(false)
    setError(null)
    setPrompt('')
    setGeneratedPost(null)
    setSuggestions(null)
    setAppliedFields({})
  }

  return {
    label: 'AI Assistant',
    icon: SparklesIcon,
    onHandle: () => setIsOpen(true),
    dialog: isOpen && {
      type: 'dialog',
      onClose: handleClose,
      header:
        mode === 'generate'
          ? 'Generate Blog Post with AI'
          : 'AI Field Suggestions',
      content: (
        <Card padding={4}>
          <Stack space={4}>
            {/* GENERATE MODE - No content exists */}
            {mode === 'generate' && !generatedPost && (
              <>
                <Text size={1} muted>
                  Describe the blog post you want to create. AI will generate
                  the title, excerpt, tags, content, and FAQs based on your
                  prompt.
                </Text>

                <Stack space={3}>
                  <Label size={1}>Prompt</Label>
                  <TextArea
                    placeholder="Example: Write a blog post about 'The benefits of URL shortening for social media marketing'. Include tips for tracking clicks and improving engagement."
                    value={prompt}
                    onChange={(e) =>
                      setPrompt((e.target as HTMLTextAreaElement).value)
                    }
                    rows={6}
                    disabled={isGenerating}
                  />
                </Stack>

                {error && (
                  <Card tone="critical" padding={3} radius={2}>
                    <Text size={1}>{error}</Text>
                  </Card>
                )}

                {isGenerating && (
                  <Card padding={4} tone="primary">
                    <Flex align="center" gap={3}>
                      <Spinner />
                      <Text>Generating complete blog post...</Text>
                    </Flex>
                  </Card>
                )}

                <Flex gap={3} justify="flex-end">
                  <Button
                    text="Cancel"
                    mode="ghost"
                    onClick={handleClose}
                    disabled={isGenerating}
                  />
                  <Button
                    text="Generate"
                    tone="primary"
                    onClick={handleGeneratePost}
                    disabled={isGenerating || !prompt.trim()}
                    icon={SparklesIcon}
                  />
                </Flex>
              </>
            )}

            {/* GENERATE MODE - Preview generated post */}
            {mode === 'generate' && generatedPost && (
              <>
                <Text size={1} muted>
                  Review the generated content below. Click `Insert Post` to
                  add it to your document.
                </Text>

                <Stack space={4}>
                  {generatedPost.title && (
                    <Card padding={3} border radius={2}>
                      <Stack space={2}>
                        <Heading size={1}>Title</Heading>
                        <Text size={1} weight="semibold">
                          {generatedPost.title}
                        </Text>
                      </Stack>
                    </Card>
                  )}

                  {generatedPost.excerpt && (
                    <Card padding={3} border radius={2}>
                      <Stack space={2}>
                        <Heading size={1}>Excerpt</Heading>
                        <Text size={1}>{generatedPost.excerpt}</Text>
                      </Stack>
                    </Card>
                  )}

                  {generatedPost.tags && generatedPost.tags.length > 0 && (
                    <Card padding={3} border radius={2}>
                      <Stack space={2}>
                        <Heading size={1}>Tags</Heading>
                        <Flex gap={2} wrap="wrap">
                          {generatedPost.tags.map((tag, i) => (
                            <Badge key={i} tone="primary">
                              {tag}
                            </Badge>
                          ))}
                        </Flex>
                      </Stack>
                    </Card>
                  )}

                  {generatedPost.content && (
                    <Card padding={3} border radius={2}>
                      <Stack space={2}>
                        <Heading size={1}>
                          Content ({generatedPost.content.length} blocks)
                        </Heading>
                        <Text size={1} muted>
                          {
                            generatedPost.content.filter(
                              (b: any) => b._type === 'block'
                            ).length
                          }{' '}
                          paragraphs/headings
                        </Text>
                      </Stack>
                    </Card>
                  )}

                  {generatedPost.faqs && generatedPost.faqs.length > 0 && (
                    <Card padding={3} border radius={2}>
                      <Stack space={3}>
                        <Heading size={1}>
                          FAQs ({generatedPost.faqs.length})
                        </Heading>
                        <Stack space={2}>
                          {generatedPost.faqs.map((faq, i) => (
                            <Card
                              key={i}
                              padding={2}
                              tone="transparent"
                              border
                            >
                              <Stack space={2}>
                                <Text size={1} weight="semibold">
                                  {faq.question}
                                </Text>
                                <Text size={1} muted>
                                  {faq.answer}
                                </Text>
                              </Stack>
                            </Card>
                          ))}
                        </Stack>
                      </Stack>
                    </Card>
                  )}
                </Stack>

                <Card tone="caution" padding={3} radius={2}>
                  <Text size={1}>
                    ⚠️ This will replace all existing content in this document.
                  </Text>
                </Card>

                <Flex gap={3} justify="space-between">
                  <Button
                    text="Generate New"
                    mode="ghost"
                    onClick={() => setGeneratedPost(null)}
                  />
                  <Flex gap={3}>
                    <Button
                      text="Cancel"
                      mode="ghost"
                      onClick={handleClose}
                    />
                    <Button
                      text="Insert Post"
                      tone="primary"
                      icon={DocumentTextIcon}
                      onClick={handleInsertPost}
                    />
                  </Flex>
                </Flex>
              </>
            )}

            {/* SUGGESTIONS MODE - Content exists */}
            {mode === 'suggestions' && !suggestions && (
              <>
                <Text size={1} muted>
                  Generate suggestions for title, excerpt, tags, and FAQs based
                  on your content. Click on any suggestion to apply it to your
                  document.
                </Text>

                <Button
                  text="Generate Suggestions"
                  tone="primary"
                  icon={SparklesIcon}
                  onClick={handleGenerateSuggestions}
                  disabled={
                    !currentDoc?.content || !Array.isArray(currentDoc.content) || currentDoc.content.length === 0
                  }
                />

                {isGenerating && (
                  <Card padding={4} tone="primary">
                    <Flex align="center" gap={3}>
                      <Spinner />
                      <Text>Generating suggestions...</Text>
                    </Flex>
                  </Card>
                )}

                {error && (
                  <Card tone="critical" padding={3} radius={2}>
                    <Text size={1}>{error}</Text>
                  </Card>
                )}
              </>
            )}

            {/* SUGGESTIONS MODE - Show suggestions */}
            {mode === 'suggestions' && suggestions && (
              <Stack space={4}>
                {suggestions.title && (
                  <Card padding={3} border radius={2}>
                    <Stack space={3}>
                      <Flex justify="space-between" align="center">
                        <Heading size={1}>Title</Heading>
                        {appliedFields.title ? (
                          <Badge tone="positive">
                            ✓ Applied
                          </Badge>
                        ) : (
                          <Button
                            text="Apply"
                            tone="primary"
                            mode="ghost"
                            fontSize={1}
                            onClick={() =>
                              handleApplyField('title', suggestions.title)
                            }
                          />
                        )}
                      </Flex>
                      <Text size={1} weight="semibold">
                        {suggestions.title}
                      </Text>
                      {currentDoc?.title && currentDoc.title !== suggestions.title ? (
                        <Text size={1} muted>
                          Current: {String(currentDoc.title)}
                        </Text>
                      ) : null}
                    </Stack>
                  </Card>
                )}

                {suggestions.excerpt && (
                  <Card padding={3} border radius={2}>
                    <Stack space={3}>
                      <Flex justify="space-between" align="center">
                        <Heading size={1}>Excerpt</Heading>
                        {appliedFields.excerpt ? (
                          <Badge tone="positive">
                            ✓ Applied
                          </Badge>
                        ) : (
                          <Button
                            text="Apply"
                            tone="primary"
                            mode="ghost"
                            fontSize={1}
                            onClick={() =>
                              handleApplyField('excerpt', suggestions.excerpt)
                            }
                          />
                        )}
                      </Flex>
                      <Text size={1}>{suggestions.excerpt}</Text>
                      {currentDoc?.excerpt && currentDoc.excerpt !== suggestions.excerpt ? (
                        <Text size={1} muted>
                          Current: {String(currentDoc.excerpt)}
                        </Text>
                      ) : null}
                    </Stack>
                  </Card>
                )}

                {suggestions.tags && suggestions.tags.length > 0 && (
                  <Card padding={3} border radius={2}>
                    <Stack space={3}>
                      <Flex justify="space-between" align="center">
                        <Heading size={1}>Tags</Heading>
                        {appliedFields.tags ? (
                          <Badge tone="positive">
                            ✓ Applied
                          </Badge>
                        ) : (
                          <Button
                            text="Apply"
                            tone="primary"
                            mode="ghost"
                            fontSize={1}
                            onClick={() =>
                              handleApplyField('tags', suggestions.tags)
                            }
                          />
                        )}
                      </Flex>
                      <Flex gap={2} wrap="wrap">
                        {suggestions.tags.map((tag, i) => (
                          <Badge key={i} tone="primary">
                            {tag}
                          </Badge>
                        ))}
                      </Flex>
                      {currentDoc?.tags && Array.isArray(currentDoc.tags) && currentDoc.tags.length > 0 ? (
                        <Box>
                          <Text size={1} muted>
                            Current:{' '}
                          </Text>
                          <Flex gap={2} wrap="wrap" marginTop={2}>
                            {currentDoc.tags.map((tag: any, i: number) => (
                              <Badge key={i} mode="outline">
                                {String(tag)}
                              </Badge>
                            ))}
                          </Flex>
                        </Box>
                      ) : null}
                    </Stack>
                  </Card>
                )}

                {suggestions.faqs && suggestions.faqs.length > 0 && (
                  <Card padding={3} border radius={2}>
                    <Stack space={3}>
                      <Flex justify="space-between" align="center">
                        <Heading size={1}>
                          FAQs ({suggestions.faqs.length})
                        </Heading>
                        {appliedFields.faqs ? (
                          <Badge tone="positive">
                            ✓ Applied
                          </Badge>
                        ) : (
                          <Button
                            text="Apply"
                            tone="primary"
                            mode="ghost"
                            fontSize={1}
                            onClick={() =>
                              handleApplyField('faqs', suggestions.faqs)
                            }
                          />
                        )}
                      </Flex>
                      <Stack space={2}>
                        {suggestions.faqs.map((faq, i) => (
                          <Card key={i} padding={2} tone="transparent" border>
                            <Stack space={2}>
                              <Text size={1} weight="semibold">
                                {faq.question}
                              </Text>
                              <Text size={1} muted>
                                {faq.answer}
                              </Text>
                            </Stack>
                          </Card>
                        ))}
                      </Stack>
                    </Stack>
                  </Card>
                )}

                <Flex gap={3} justify="flex-end">
                  <Button
                    text="Generate New Suggestions"
                    mode="ghost"
                    onClick={handleGenerateSuggestions}
                    disabled={isGenerating}
                  />
                  <Button text="Close" mode="ghost" onClick={handleClose} />
                </Flex>
              </Stack>
            )}
          </Stack>
        </Card>
      ),
    },
  }
}

export const aiAssistantPlugin = () => {
  return {
    name: 'ai-assistant',
    document: {
      actions: (prev: any[], context: any) => {
        const { schemaType } = context

        // Only add to post documents
        if (schemaType !== 'post') {
          return prev
        }

        // Always put AI Assistant first
        return [AIAssistantAction, ...prev]
      },
    },
  }
}
