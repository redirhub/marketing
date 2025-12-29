import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/client'
import { processTranslationJob } from '../translate-post/route'

const MAX_JOBS_PER_RUN = 10

export async function GET(req: NextRequest) {
  return handleProcessTranslations(req)
}

export async function POST(req: NextRequest) {
  return handleProcessTranslations(req)
}

async function handleProcessTranslations(req: NextRequest) {
  const ranAt = new Date().toISOString()

  try {
    // Get docId from either query params or request body
    const searchParams = req.nextUrl.searchParams
    let docId = searchParams.get('docId')

    if (!docId && req.method === 'POST') {
      try {
        const body = await req.json()
        docId = body.docId
      } catch (e) {
        // Body might be empty, that's okay
      }
    }

    let postsToProcess: Array<{ _id: string; title: string }> = []

    if (docId) {
      // Trigger translation for a single document
      const post = await writeClient.fetch(
        `*[_id == $id][0]{ _id, title }`,
        { id: docId }
      )
      if (!post) {
        return NextResponse.json(
          { ok: false, error: 'Document not found' },
          { status: 404 }
        )
      }
      postsToProcess.push(post)
    } else {
      // Trigger translation for multiple posts needing translation
      postsToProcess = await writeClient.fetch(
        `*[_type == "post" && locale == "en" && needsTranslation == true][0...${MAX_JOBS_PER_RUN}]{
          _id,
          title
        }`
      )
    }

    let processed = 0
    const results = []

    for (const post of postsToProcess) {
      try {
        console.log(
          `[API] Processing translation for: ${post.title} (${post._id})`
        )

        const result = await processTranslationJob(post._id)

        processed += 1
        results.push({
          documentId: post._id,
          title: post.title,
          status: 'success',
          result,
        })

        console.log(`[Process] ✓ Completed translation for: ${post.title}`)
      } catch (error) {
        console.error(`[Process] Failed to translate ${post._id}:`, error)
        results.push({
          documentId: post._id,
          title: post.title,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      ok: true,
      ranAt,
      processed,
      message: `Processed ${processed} translation jobs`,
      results,
    })
  } catch (error) {
    console.error('[Process] Job failed', error)
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
