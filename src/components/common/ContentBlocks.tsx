import React, { useState } from 'react'
import { Check, ImageIcon, MessageCircle } from 'lucide-react'
import { cldPhoto } from '@/lib/cloudinary'
import type { ArticleBlock } from '@/data/news.data'

const ImageTile: React.FC<{ src: string; caption?: string; ratio?: string }> = ({
  src,
  caption,
  ratio = '3:2',
}) => {
  const [failed, setFailed] = useState(false)
  const url = cldPhoto(src, { width: 1000, ratio })
  const showImage = url && !failed

  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-xl bg-[#e6e1dc]"
        style={{ aspectRatio: ratio.replace(':', ' / ') }}
      >
        {showImage ? (
          <img
            src={url}
            alt={caption ?? ''}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
            <ImageIcon className="h-5 w-5" />
            {caption && <span className="text-[11px]">{caption}</span>}
          </div>
        )}
      </div>
      {showImage && caption && (
        <figcaption className="mt-2 text-center text-xs text-gray-500">{caption}</figcaption>
      )}
    </figure>
  )
}

export const ContentBlocks: React.FC<{ blocks: ArticleBlock[] }> = ({ blocks }) => (
  <div className="space-y-6">
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'h2':
          return (
            <h2 key={i} className="pt-3 text-xl font-bold text-gray-900 sm:text-2xl">
              {block.text}
            </h2>
          )

        case 'quote':
          return (
            <blockquote
              key={i}
              className="rounded-xl border-l-4 border-[#02BB22] bg-accent/5 px-6 py-5"
            >
              <MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />
              <p className="mt-3 font-serif text-lg italic leading-relaxed text-gray-800 sm:text-xl">
                “{block.text}”
              </p>
              {block.cite && (
                <footer className="mt-3 text-xs font-medium text-accent">— {block.cite}</footer>
              )}
            </blockquote>
          )

        case 'image':
          return <ImageTile key={i} src={block.src} caption={block.caption} ratio="16:9" />

        case 'images':
          return (
            <div key={i} className="grid gap-4 sm:grid-cols-2">
              {block.items.map((img, j) => (
                <ImageTile key={j} src={img.src} caption={img.caption} />
              ))}
            </div>
          )

        case 'list':
          return (
            <ul key={i} className="space-y-3">
              {block.items.map((text) => (
                <li key={text} className="flex items-start gap-3 text-[15px] text-gray-800">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent text-accent">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          )

        default:
          return (
            <p key={i} className="text-[15px] leading-[1.85] text-gray-700">
              {block.text}
            </p>
          )
      }
    })}
  </div>
)

export default ContentBlocks