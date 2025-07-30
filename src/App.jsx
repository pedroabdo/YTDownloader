import { useState, useEffect } from 'react'
import './css/App.css'
import InputBox  from './components/InputBox'
import SummaryBox from './components/Summary'
import { getTranscript, getSummary } from './utils/generateVideoInfo'
import TranscriptBox from './components/Transcript'
import LoadingModal from './components/loading'


function App() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [visible, setVisible] = useState('Summary');

  const handleTranscriptChange = async (url) => {
    setIsLoading(true);
    try {
      const transcriptData = await getTranscript(url);
      setTranscript(transcriptData.transcript);
    } catch (error) {
      console.error('Error fetching transcript:', error);
      setTranscript(null);
    } finally {
      setIsLoading(false);
    }
    
  }

  const handleSummaryChange = async (url) => {
    setSummary('');
    // Stream summary using callback to update UI with chunks
    setIsStreaming(true);
    await getSummary(url, (chunk) => {
      setSummary(prev => prev + chunk);
    });
    setIsStreaming(false);
  }
  const getUrl = async (url) => {
    setIsLoading(true); // Show loading only for transcript fetch
    try {
      await handleTranscriptChange(url);
    } catch (error) {
      console.error('Error fetching transcript:', error);
    } finally {
      setIsLoading(false); // Hide loading before streaming starts
    }

    handleSummaryChange(url); // Start summary streaming separately
  };

  return (
    <>
      <h1 className="title">YouTube Video Summarizer</h1>
      <p className="description">Enter a YouTube video URL to get a summary.</p>
      <InputBox callBackFunc={getUrl} disable={isLoading || isStreaming} />
      <div className="toggle" style={{ display: transcript === ''? 'none' : 'block' }}>
        <button className='summary' onClick={() => setVisible('Summary')}>Summary</button>
        <button className='Transcript' onClick={()=> setVisible('Transcript')}>Transcript</button>
      </div>
      <div className="summary" style={{ display: visible === 'Summary' && transcript != '' ? 'block' : 'none' }}>
        <SummaryBox summary={summary} className='summary' streaming = {isStreaming}/>
      </div>
      <div className="transcript" style={{ display: visible === 'Transcript' ? 'block' : 'none' }}>
        <TranscriptBox transcript={transcript} className='transcript'/>
      </div>
      {isLoading && <LoadingModal />}
    </>
  );
}


export default App
