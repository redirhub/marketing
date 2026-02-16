import { client } from '@/sanity/lib/client'
import { TestimonialDocument } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/image'

/**
 * Fetch active testimonials for a specific locale
 * Sorted by order field
 */
export async function getTestimonials(
  locale: string = 'en'
): Promise<TestimonialDocument[]> {
  const query = `*[_type == "testimonial" && locale == $locale && isActive == true] | order(order asc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    quote,
    author,
    role,
    company,
    avatar,
    order,
    isActive,
    locale
  }`

  const testimonials = await client.fetch<TestimonialDocument[]>(query, {
    locale,
  })

  return testimonials
}

/**
 * Convert Sanity testimonial to legacy format for component compatibility
 */
export function formatTestimonialForSlider(testimonial: TestimonialDocument) {
  return {
    id: testimonial._id,
    quote: testimonial.quote,
    name: testimonial.author,
    role: testimonial.role || '',
    avatar: testimonial.avatar
      ? urlFor(testimonial.avatar).width(200).height(200).url()
      : '/assets/images/placeholder-avatar.png',
  }
}
