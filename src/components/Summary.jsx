import React from 'react';
import ReactMarkdown from 'react-markdown'
import '../css/summary.css';

const SummaryBox = ({ summary, streaming }) => {
  return (
    <div className="summary-box">
      <h2>Summary</h2>
      <ReactMarkdown>{summary}</ReactMarkdown>
      {streaming && <p className="streaming">Typing...</p>}
    </div>
  );
}

export default SummaryBox;