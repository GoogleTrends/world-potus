import React from 'react'

export default function QuoteBaloon({ quoteData, expanded }) {
  const quote = expanded ? quoteData.quote : (quoteData.shortQuote || quoteData.quote)
  const bold = quoteData.bold || ""
  const start = quote.search(bold)
  const end = start + bold.length

  return (
    <span>
      {
        <div style={{display: 'block'}}>
          <span>&ldquo;</span>
          {
            [quote.slice(0, start),
            <b key='bold'>{quote.slice(start, end)}</b>,
            quote.slice(end, quote.length)]
          }
          <span>&rdquo;</span>
        </div>
      }
    </span>
  )
}

QuoteBaloon.propTypes = {
  quoteData: React.PropTypes.object,
  expanded: React.PropTypes.bool,
}
